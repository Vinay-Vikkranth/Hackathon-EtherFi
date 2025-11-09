// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title StakingLender
 * @notice Educational demo of borrowing against staked assets
 * @dev This is for EDUCATIONAL PURPOSES ONLY - Not for production use
 */
contract StakingLender {
    
    IERC20 public immutable collateralToken; // eETH or weETH
    
    // Loan terms
    uint256 public constant COLLATERAL_RATIO = 150; // 150% collateralization
    uint256 public constant INTEREST_RATE = 500; // 5% annual interest (500/10000)
    
    struct Loan {
        uint256 collateralAmount;
        uint256 borrowedAmount;
        uint256 timestamp;
        bool active;
    }
    
    mapping(address => Loan) public loans;
    
    // Events
    event CollateralDeposited(address indexed user, uint256 amount);
    event Borrowed(address indexed user, uint256 collateral, uint256 borrowed);
    event Repaid(address indexed user, uint256 amount);
    event CollateralWithdrawn(address indexed user, uint256 amount);
    
    constructor(address _collateralToken) {
        collateralToken = IERC20(_collateralToken);
    }
    
    /**
     * @notice Deposit collateral and borrow ETH
     * @param collateralAmount Amount of eETH/weETH to deposit as collateral
     */
    function depositAndBorrow(uint256 collateralAmount) external {
        require(collateralAmount > 0, "Must deposit collateral");
        require(!loans[msg.sender].active, "Existing loan must be repaid first");
        
        // Calculate max borrowable amount (using 150% collateral ratio)
        // If user deposits 1 ETH worth of eETH, they can borrow ~0.66 ETH
        uint256 maxBorrow = (collateralAmount * 100) / COLLATERAL_RATIO;
        
        require(address(this).balance >= maxBorrow, "Insufficient contract balance");
        
        // Transfer collateral from user
        require(
            collateralToken.transferFrom(msg.sender, address(this), collateralAmount),
            "Collateral transfer failed"
        );
        
        // Record loan
        loans[msg.sender] = Loan({
            collateralAmount: collateralAmount,
            borrowedAmount: maxBorrow,
            timestamp: block.timestamp,
            active: true
        });
        
        // Transfer ETH to user
        (bool success, ) = msg.sender.call{value: maxBorrow}("");
        require(success, "ETH transfer failed");
        
        emit CollateralDeposited(msg.sender, collateralAmount);
        emit Borrowed(msg.sender, collateralAmount, maxBorrow);
    }
    
    /**
     * @notice Repay loan and withdraw collateral
     */
    function repayAndWithdraw() external payable {
        Loan storage loan = loans[msg.sender];
        require(loan.active, "No active loan");
        
        uint256 interest = calculateInterest(msg.sender);
        uint256 totalRepayment = loan.borrowedAmount + interest;
        
        require(msg.value >= totalRepayment, "Insufficient repayment amount");
        
        uint256 collateralToReturn = loan.collateralAmount;
        
        // Mark loan as inactive
        loan.active = false;
        loan.collateralAmount = 0;
        loan.borrowedAmount = 0;
        
        // Return collateral
        require(
            collateralToken.transfer(msg.sender, collateralToReturn),
            "Collateral return failed"
        );
        
        // Return excess payment if any
        if (msg.value > totalRepayment) {
            (bool success, ) = msg.sender.call{value: msg.value - totalRepayment}("");
            require(success, "Excess refund failed");
        }
        
        emit Repaid(msg.sender, totalRepayment);
        emit CollateralWithdrawn(msg.sender, collateralToReturn);
    }
    
    /**
     * @notice Calculate interest owed on loan
     * @param user Address of the borrower
     */
    function calculateInterest(address user) public view returns (uint256) {
        Loan memory loan = loans[user];
        if (!loan.active) return 0;
        
        uint256 timeElapsed = block.timestamp - loan.timestamp;
        // Interest = (borrowed * rate * time) / (365 days * 10000)
        uint256 interest = (loan.borrowedAmount * INTEREST_RATE * timeElapsed) / (365 days * 10000);
        
        return interest;
    }
    
    /**
     * @notice Get loan information for a user
     */
    function getLoanInfo(address user) external view returns (
        uint256 collateral,
        uint256 borrowed,
        uint256 interest,
        uint256 totalOwed,
        bool active
    ) {
        Loan memory loan = loans[user];
        uint256 interestAmount = calculateInterest(user);
        
        return (
            loan.collateralAmount,
            loan.borrowedAmount,
            interestAmount,
            loan.borrowedAmount + interestAmount,
            loan.active
        );
    }
    
    /**
     * @notice Calculate max borrowable amount for given collateral
     */
    function calculateMaxBorrow(uint256 collateralAmount) external pure returns (uint256) {
        return (collateralAmount * 100) / COLLATERAL_RATIO;
    }
    
    // Allow contract to receive ETH
    receive() external payable {}
}
