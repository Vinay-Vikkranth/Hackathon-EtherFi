"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected } from "wagmi/connectors";
import { useMemo } from "react";

// Singleton instances - created once and reused
let wagmiConfig: ReturnType<typeof createConfig> | null = null;
let queryClientInstance: QueryClient | null = null;

function getWagmiConfig() {
  if (!wagmiConfig) {
    wagmiConfig = createConfig({
      chains: [mainnet],
      connectors: [
        injected({ shimDisconnect: true }), // Use injected with shimDisconnect to prevent SDK errors
      ],
      transports: {
        [mainnet.id]: http("https://eth.llamarpc.com", {
          batch: true,
          retryCount: 3,
        }),
      },
      // Prevent SSR issues
      ssr: true,
      multiInjectedProviderDiscovery: false,
    });
  }
  return wagmiConfig;
}

function getQueryClient() {
  if (!queryClientInstance) {
    queryClientInstance = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 1,
          staleTime: 30000,
          gcTime: 5 * 60 * 1000, // 5 minutes
        },
      },
    });
  }
  return queryClientInstance;
}

// Providers component that wraps the app
export function Providers({ children }: { children: React.ReactNode }) {
  // Use singleton instances to prevent recreation
  const config = useMemo(() => getWagmiConfig(), []);
  const queryClient = useMemo(() => getQueryClient(), []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
