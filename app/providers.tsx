"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected, metaMask } from "wagmi/connectors";

// Create Wagmi configuration
const config = createConfig({
  chains: [mainnet],
  connectors: [
    metaMask({ dappMetadata: { name: "Ether.fi Dashboard" } }), // MetaMask connector
    injected(), // Fallback for other injected wallets
  ],
  transports: {
    [mainnet.id]: http(), // Use public RPC endpoint
  },
});

// Create React Query client for data fetching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Providers component that wraps the app
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
