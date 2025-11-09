"use client";

import { useQuery } from "@tanstack/react-query";
import { getEtherFiProtocolData } from "@/lib/defillama";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";

export function ProtocolStats() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["etherfi-protocol"],
    queryFn: getEtherFiProtocolData,
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000, // Consider data fresh for 30 seconds
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[#2a2a2a] p-6 rounded-lg border border-[#3a3a3a] animate-pulse"
          >
            <div className="h-4 bg-[#3a3a3a] rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-[#3a3a3a] rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  // Data is always available now (never null)
  if (!data) {
    return (
      <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
        <p className="text-yellow-400 text-sm mb-2">
          ⚠️ Unable to load protocol data. Please refresh the page.
        </p>
      </div>
    );
  }

  const formatCurrency = (value: number | string | undefined) => {
    // Convert to number if it's a string
    const numValue = typeof value === "string" ? parseFloat(value) : value || 0;

    if (isNaN(numValue)) return "$0.00";
    if (numValue >= 1e9) return `$${(numValue / 1e9).toFixed(2)}B`;
    if (numValue >= 1e6) return `$${(numValue / 1e6).toFixed(2)}M`;
    if (numValue >= 1e3) return `$${(numValue / 1e3).toFixed(2)}K`;
    return `$${numValue.toFixed(2)}`;
  };

  // Safely convert values to numbers
  const tvl =
    typeof data.tvl === "string" ? parseFloat(data.tvl) : data.tvl || 0;
  const fees24h =
    typeof data.metrics?.fees24h === "string"
      ? parseFloat(data.metrics.fees24h)
      : data.metrics?.fees24h || 0;
  const revenue24h =
    typeof data.metrics?.revenue24h === "string"
      ? parseFloat(data.metrics.revenue24h)
      : data.metrics?.revenue24h || 0;
  const change1d =
    typeof data.change_1d === "string"
      ? parseFloat(data.change_1d)
      : data.change_1d || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* TVL Card */}
      <div className="bg-[#2a2a2a] p-6 rounded-lg border border-[#3a3a3a] hover:border-purple-500/50 transition-all">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[#a0a0a0] text-sm font-medium">
            Total Value Locked
          </h3>
          <DollarSign className="w-5 h-5 text-purple-400" />
        </div>
        <p className="text-3xl font-bold text-white mb-2">
          {formatCurrency(tvl)}
        </p>
        <div className="flex items-center gap-2">
          {change1d >= 0 ? (
            <TrendingUp className="w-4 h-4 text-green-400" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-400" />
          )}
          <span
            className={`text-sm font-medium ${
              change1d >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {change1d >= 0 ? "+" : ""}
            {change1d.toFixed(2)}% (24h)
          </span>
        </div>
      </div>

      {/* 24h Fees Card */}
      <div className="bg-[#2a2a2a] p-6 rounded-lg border border-[#3a3a3a] hover:border-blue-500/50 transition-all">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[#a0a0a0] text-sm font-medium">24h Fees</h3>
          <Activity className="w-5 h-5 text-blue-400" />
        </div>
        <p className="text-3xl font-bold text-white">
          {formatCurrency(fees24h)}
        </p>
        <p className="text-xs text-[#6b6b6b] mt-1">Platform fees generated</p>
      </div>

      {/* 24h Revenue Card */}
      <div className="bg-[#2a2a2a] p-6 rounded-lg border border-[#3a3a3a] hover:border-purple-500/50 transition-all">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[#a0a0a0] text-sm font-medium">24h Revenue</h3>
          <DollarSign className="w-5 h-5 text-purple-400" />
        </div>
        <p className="text-3xl font-bold text-white">
          {formatCurrency(revenue24h)}
        </p>
        <p className="text-xs text-[#6b6b6b] mt-1">Protocol revenue</p>
      </div>
    </div>
  );
}
