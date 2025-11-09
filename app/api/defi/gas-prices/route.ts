import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 30; // Cache for 30 seconds (gas prices change frequently)

interface GasEstimate {
  eth: number;
  usd: number;
  gwei: number;
}

interface GasData {
  success: boolean;
  gasPrice: {
    slow: number;
    standard: number;
    fast: number;
  };
  estimates: {
    stake: GasEstimate;
    unstake: GasEstimate;
    wrap: GasEstimate;
    claim: GasEstimate;
  };
  ethPrice: number;
  timestamp: string;
}

// Gas limits for different operations (based on typical usage)
const GAS_LIMITS = {
  stake: 150000,    // ETH staking transaction
  unstake: 100000,  // ETH unstaking transaction
  wrap: 80000,      // eETH wrapping to weETH
  claim: 60000,     // Claiming rewards
};

/**
 * Get real-time Ethereum gas prices and calculate transaction costs
 */
export async function GET(request: Request) {
  try {
    // Fetch ETH price first
    const ethPriceResponse = await fetch(
      'https://coins.llama.fi/prices/current/ethereum:0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    );
    
    if (!ethPriceResponse.ok) {
      throw new Error('Failed to fetch ETH price');
    }
    
    const ethPriceData = await ethPriceResponse.json();
    const ethPrice = ethPriceData.coins?.['ethereum:0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2']?.price || 2500;

    // Fetch gas prices from Etherscan-like API (using a fallback for demo)
    let gasPrices = {
      slow: 25,
      standard: 30,
      fast: 40,
    };

    try {
      // Try to fetch real gas prices from alternative source
      const gasResponse = await fetch('https://api.etherscan.io/api?module=gastracker&action=gasoracle', {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (gasResponse.ok) {
        const gasData = await gasResponse.json();
        if (gasData.status === '1' && gasData.result) {
          gasPrices = {
            slow: parseInt(gasData.result.SafeGasPrice) || 25,
            standard: parseInt(gasData.result.ProposeGasPrice) || 30,
            fast: parseInt(gasData.result.FastGasPrice) || 40,
          };
        }
      }
    } catch (error) {
      console.log('Using fallback gas prices');
      // Use fallback prices defined above
    }

    // Calculate costs for each operation using standard gas price
    const standardGasGwei = gasPrices.standard;
    
    const calculateCost = (gasLimit: number, gasPriceGwei: number): GasEstimate => {
      const costInEth = (gasLimit * gasPriceGwei) / 1e9; // Convert Gwei to ETH
      const costInUsd = costInEth * ethPrice;
      
      return {
        eth: parseFloat(costInEth.toFixed(6)),
        usd: parseFloat(costInUsd.toFixed(2)),
        gwei: gasPriceGwei,
      };
    };

    const response: GasData = {
      success: true,
      gasPrice: gasPrices,
      estimates: {
        stake: calculateCost(GAS_LIMITS.stake, standardGasGwei),
        unstake: calculateCost(GAS_LIMITS.unstake, standardGasGwei),
        wrap: calculateCost(GAS_LIMITS.wrap, standardGasGwei),
        claim: calculateCost(GAS_LIMITS.claim, standardGasGwei),
      },
      ethPrice,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error fetching gas prices:', error);
    
    // Return fallback estimates
    const fallbackEthPrice = 2500;
    const fallbackGasPrice = 30;
    
    const calculateFallbackCost = (gasLimit: number): GasEstimate => {
      const costInEth = (gasLimit * fallbackGasPrice) / 1e9;
      const costInUsd = costInEth * fallbackEthPrice;
      
      return {
        eth: parseFloat(costInEth.toFixed(6)),
        usd: parseFloat(costInUsd.toFixed(2)),
        gwei: fallbackGasPrice,
      };
    };
    
    return NextResponse.json({
      success: true,
      gasPrice: {
        slow: 25,
        standard: 30,
        fast: 40,
      },
      estimates: {
        stake: calculateFallbackCost(GAS_LIMITS.stake),
        unstake: calculateFallbackCost(GAS_LIMITS.unstake),
        wrap: calculateFallbackCost(GAS_LIMITS.wrap),
        claim: calculateFallbackCost(GAS_LIMITS.claim),
      },
      ethPrice: fallbackEthPrice,
      timestamp: new Date().toISOString(),
      fallback: true,
    });
  }
}
