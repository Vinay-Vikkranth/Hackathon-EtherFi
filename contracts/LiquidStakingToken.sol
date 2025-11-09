// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title LiquidStakingToken
 * @notice Educational demo of liquid staking token (like eETH)
 * @dev This is for EDUCATIONAL PURPOSES ONLY - Not for production use
 */
contract LiquidStakingToken is ERC20, Ownable {
    
    // Track total ETH staked
    uint256 public totalStaked;
    
    // Exchange rate: 1 ETH = 1 eETH (simplified for demo)
    uint256 public constant EXCHANGE_RATE = 1e18;
    
    // Staking rewards APR (3.5% annually for demo)
    uint256 public aprPercentage = 350; // 3.5% in basis points (350/10000)
    
    // User staking data
    struct StakeInfo {
        uint256 amount;
        uint256 timestamp;
        uint256 rewards;
    }
    
    mapping(address => StakeInfo) public stakes;
    
    // Events
    event Staked(address indexed user, uint256 ethAmount, uint256 eethAmount);
    event Unstaked(address indexed user, uint256 eethAmount, uint256 ethAmount);
    event RewardsClaimed(address indexed user, uint256 amount);
    
    constructor() ERC20("Liquid Staking ETH", "eETH") Ownable(msg.sender) {}
    
    /**
     * @notice Stake ETH and receive eETH tokens
     * @dev In a real implementation, this would interact with beacon chain
     */
    function stake() external payable {
        require(msg.value > 0, "Must stake more than 0 ETH");
        
        uint256 eethAmount = (msg.value * EXCHANGE_RATE) / 1e18;
        
        // Update stake info
        StakeInfo storage userStake = stakes[msg.sender];
        
        // Calculate pending rewards before updating
        if (userStake.amount > 0) {
            userStake.rewards += calculatePendingRewards(msg.sender);
        }
        
        userStake.amount += msg.value;
        userStake.timestamp = block.timestamp;
        totalStaked += msg.value;
        
        // Mint eETH tokens
        _mint(msg.sender, eethAmount);
        
        emit Staked(msg.sender, msg.value, eethAmount);
    }
    
    /**
     * @notice Unstake eETH and receive ETH back
     * @param eethAmount Amount of eETH to burn
     */
    function unstake(uint256 eethAmount) external {
        require(balanceOf(msg.sender) >= eethAmount, "Insufficient eETH balance");
        
        uint256 ethAmount = (eethAmount * 1e18) / EXCHANGE_RATE;
        require(address(this).balance >= ethAmount, "Insufficient contract balance");
        
        StakeInfo storage userStake = stakes[msg.sender];
        
        // Calculate and add pending rewards
        userStake.rewards += calculatePendingRewards(msg.sender);
        
        // Update stake amount
        if (ethAmount >= userStake.amount) {
            userStake.amount = 0;
        } else {
            userStake.amount -= ethAmount;
        }
        userStake.timestamp = block.timestamp;
        totalStaked -= ethAmount;
        
        // Burn eETH tokens
        _burn(msg.sender, eethAmount);
        
        // Transfer ETH back
        (bool success, ) = msg.sender.call{value: ethAmount}("");
        require(success, "ETH transfer failed");
        
        emit Unstaked(msg.sender, eethAmount, ethAmount);
    }
    
    /**
     * @notice Calculate pending staking rewards
     * @param user Address of the user
     * @return Pending rewards in wei
     */
    function calculatePendingRewards(address user) public view returns (uint256) {
        StakeInfo memory userStake = stakes[user];
        if (userStake.amount == 0) return 0;
        
        uint256 timeStaked = block.timestamp - userStake.timestamp;
        // APR calculation: (amount * apr * time) / (365 days * 10000)
        uint256 rewards = (userStake.amount * aprPercentage * timeStaked) / (365 days * 10000);
        
        return rewards;
    }
    
    /**
     * @notice Get total rewards (claimed + pending)
     * @param user Address of the user
     */
    function getTotalRewards(address user) external view returns (uint256) {
        return stakes[user].rewards + calculatePendingRewards(user);
    }
    
    /**
     * @notice Claim accumulated rewards
     */
    function claimRewards() external {
        StakeInfo storage userStake = stakes[msg.sender];
        uint256 pendingRewards = calculatePendingRewards(msg.sender);
        uint256 totalRewards = userStake.rewards + pendingRewards;
        
        require(totalRewards > 0, "No rewards to claim");
        require(address(this).balance >= totalRewards, "Insufficient contract balance");
        
        userStake.rewards = 0;
        userStake.timestamp = block.timestamp;
        
        (bool success, ) = msg.sender.call{value: totalRewards}("");
        require(success, "Reward transfer failed");
        
        emit RewardsClaimed(msg.sender, totalRewards);
    }
    
    /**
     * @notice Get user's stake information
     */
    function getStakeInfo(address user) external view returns (
        uint256 stakedAmount,
        uint256 eethBalance,
        uint256 pendingRewards,
        uint256 totalRewardsEarned
    ) {
        StakeInfo memory userStake = stakes[user];
        return (
            userStake.amount,
            balanceOf(user),
            calculatePendingRewards(user),
            userStake.rewards + calculatePendingRewards(user)
        );
    }
    
    // Allow contract to receive ETH for rewards
    receive() external payable {}
}
