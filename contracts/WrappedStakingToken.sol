// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title WrappedStakingToken
 * @notice Educational demo of wrapped staking token (like weETH)
 * @dev This is for EDUCATIONAL PURPOSES ONLY - Not for production use
 */
contract WrappedStakingToken is ERC20 {
    
    ERC20 public immutable eeth;
    
    // Events
    event Wrapped(address indexed user, uint256 eethAmount, uint256 weethAmount);
    event Unwrapped(address indexed user, uint256 weethAmount, uint256 eethAmount);
    
    constructor(address _eeth) ERC20("Wrapped Liquid Staking ETH", "weETH") {
        eeth = ERC20(_eeth);
    }
    
    /**
     * @notice Wrap eETH to get weETH
     * @param eethAmount Amount of eETH to wrap
     */
    function wrap(uint256 eethAmount) external {
        require(eethAmount > 0, "Must wrap more than 0");
        require(eeth.balanceOf(msg.sender) >= eethAmount, "Insufficient eETH balance");
        
        // Transfer eETH from user to this contract
        require(eeth.transferFrom(msg.sender, address(this), eethAmount), "eETH transfer failed");
        
        // Mint weETH 1:1 (simplified for demo)
        _mint(msg.sender, eethAmount);
        
        emit Wrapped(msg.sender, eethAmount, eethAmount);
    }
    
    /**
     * @notice Unwrap weETH to get eETH back
     * @param weethAmount Amount of weETH to unwrap
     */
    function unwrap(uint256 weethAmount) external {
        require(balanceOf(msg.sender) >= weethAmount, "Insufficient weETH balance");
        
        // Burn weETH
        _burn(msg.sender, weethAmount);
        
        // Transfer eETH back to user
        require(eeth.transfer(msg.sender, weethAmount), "eETH transfer failed");
        
        emit Unwrapped(msg.sender, weethAmount, weethAmount);
    }
    
    /**
     * @notice Get exchange rate (simplified to 1:1 for demo)
     */
    function getExchangeRate() external pure returns (uint256) {
        return 1e18; // 1:1 ratio
    }
}
