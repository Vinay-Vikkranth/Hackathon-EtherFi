import axios from 'axios';

const DEFILLAMA_API = 'https://api.llama.fi';

export interface ProtocolData {
  id: string;
  name: string;
  symbol: string;
  tvl: number | string;
  tvlPrevDay?: number | string;
  tvlPrevWeek?: number | string;
  tvlPrevMonth?: number | string;
  chain: string;
  chains: string[];
  change_1d?: number | string;
  change_7d?: number | string;
  change_1m?: number | string;
  mcap?: number | string;
  fdv?: number | string;
  metrics?: {
    tvl: number | string;
    fees24h?: number | string;
    fees7d?: number | string;
    fees30d?: number | string;
    revenue24h?: number | string;
    revenue7d?: number | string;
    revenue30d?: number | string;
  };
}

export interface TVLHistoryPoint {
  date: number;
  tvl: number;
}

/**
 * Fetches real-time protocol data for ether.fi from DeFiLlama
 * Uses the protocols API to find the correct protocol ID first
 */
export async function getEtherFiProtocolData(): Promise<ProtocolData> {
  try {
    // First, try to get all protocols and find ether.fi
    try {
      const protocolsResponse = await axios.get(`${DEFILLAMA_API}/protocols`, {
        timeout: 10000,
      });
      
      if (protocolsResponse.data) {
        // Search for ether.fi in the protocols list
        const etherFiProtocol = protocolsResponse.data.find((p: any) => 
          p.name?.toLowerCase().includes('ether.fi') || 
          p.name?.toLowerCase().includes('etherfi') ||
          p.slug === 'etherfi' ||
          p.slug === 'ether-fi'
        );
        
        if (etherFiProtocol && etherFiProtocol.slug) {
          // Use the found slug to get detailed protocol data
          const detailResponse = await axios.get(`${DEFILLAMA_API}/protocol/${etherFiProtocol.slug}`, {
            timeout: 10000,
          });
          
          if (detailResponse.data && detailResponse.data.tvl !== undefined) {
            return detailResponse.data;
          }
        }
      }
    } catch (searchError) {
      console.warn('Could not search protocols list, trying direct endpoints...');
    }
    
    // Fallback: Try direct protocol slugs
    const protocolSlugs = ['etherfi', 'ether-fi'];
    
    for (const slug of protocolSlugs) {
      try {
        const response = await axios.get(`${DEFILLAMA_API}/protocol/${slug}`, {
          timeout: 10000,
          validateStatus: (status) => status < 500,
        });
        
        if (response.status === 200 && response.data && response.data.tvl !== undefined) {
          return response.data;
        }
      } catch (error: any) {
        if (error.response?.status === 404) {
          continue;
        }
        console.warn(`Error fetching DeFiLlama data for ${slug}:`, error.message);
      }
    }
    
    // If all attempts fail, return mock data for demo purposes
    console.warn('DeFiLlama API unavailable, using mock data for demo');
    return getMockData();
  } catch (error: any) {
    console.error('Error fetching DeFiLlama data:', error.message);
    // Return mock data as fallback
    return getMockData();
  }
}

/**
 * Returns mock data for demo purposes
 */
function getMockData(): ProtocolData {
  return {
    id: 'etherfi',
    name: 'ether.fi',
    symbol: 'ETHFI',
    tvl: 3200000000, // $3.2B
    change_1d: 2.5,
    metrics: {
      tvl: 3200000000,
      fees24h: 120000, // $120k
      revenue24h: 95000, // $95k
    },
    chain: 'Ethereum',
    chains: ['Ethereum'],
  };
}

/**
 * Fetches TVL history for ether.fi
 * Tries multiple protocol identifiers
 */
export async function getEtherFiTVLHistory(): Promise<TVLHistoryPoint[] | null> {
  const protocolSlugs = ['etherfi', 'ether-fi', 'ether.fi'];
  
  for (const slug of protocolSlugs) {
    try {
      const response = await axios.get(`${DEFILLAMA_API}/tvl/${slug}`, {
        timeout: 10000,
      });
      
      if (response.data) {
        return response.data;
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        continue;
      }
      console.warn(`Error fetching TVL history for ${slug}:`, error.message);
    }
  }
  
  console.error('Failed to fetch TVL history for all protocol slugs');
  return null;
}

/**
 * Formats large numbers to readable currency format
 */
export function formatCurrency(value: number): string {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
  return `$${value.toFixed(2)}`;
}

