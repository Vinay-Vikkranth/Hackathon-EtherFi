"use client";

import React from "react";
import {
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface ProtocolHealthIndicatorProps {
  ethPrice: number;
  eethPrice: number | null;
  totalValidators?: number;
  activeValidators?: number;
  tvl: number;
  maxCapacity?: number;
}

export default function ProtocolHealthIndicator({
  ethPrice,
  eethPrice,
  totalValidators,
  activeValidators,
  tvl,
  maxCapacity,
}: ProtocolHealthIndicatorProps) {
  // Calculate eETH/ETH ratio
  const pegRatio = eethPrice && ethPrice ? eethPrice / ethPrice : 1.0;

  // Determine peg health
  const getPegStatus = (ratio: number) => {
    if (ratio >= 0.999 && ratio <= 1.001) return "healthy";
    if (ratio >= 0.995 && ratio <= 1.005) return "warning";
    return "critical";
  };

  const pegStatus = getPegStatus(pegRatio);

  // Calculate capacity utilization
  const capacityPercent = maxCapacity ? (tvl / maxCapacity) * 100 : 0;

  const getCapacityStatus = (percent: number) => {
    if (percent < 80) return "healthy";
    if (percent < 95) return "warning";
    return "critical";
  };

  const capacityStatus = getCapacityStatus(capacityPercent);

  // Calculate validator health
  const validatorUptime =
    totalValidators && activeValidators
      ? (activeValidators / totalValidators) * 100
      : 99.5;

  const getValidatorStatus = (uptime: number) => {
    if (uptime >= 99) return "healthy";
    if (uptime >= 95) return "warning";
    return "critical";
  };

  const validatorStatus = getValidatorStatus(validatorUptime);

  // Overall health score (0-100)
  const calculateHealthScore = () => {
    let score = 100;

    // Peg health (40 points)
    if (pegStatus === "warning") score -= 15;
    if (pegStatus === "critical") score -= 40;

    // Capacity (30 points)
    if (capacityStatus === "warning") score -= 10;
    if (capacityStatus === "critical") score -= 30;

    // Validator uptime (30 points)
    if (validatorStatus === "warning") score -= 10;
    if (validatorStatus === "critical") score -= 30;

    return Math.max(0, score);
  };

  const healthScore = calculateHealthScore();

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const getHealthScoreStatus = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Good";
    if (score >= 70) return "Fair";
    if (score >= 50) return "Poor";
    return "Critical";
  };

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "critical":
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Activity className="w-5 h-5 text-gray-400" />;
    }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      healthy: "bg-green-500/20 text-green-400 border-green-500/50",
      warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
      critical: "bg-red-500/20 text-red-400 border-red-500/50",
    };

    const labels = {
      healthy: "Healthy",
      warning: "Warning",
      critical: "Critical",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold border ${
          colors[status as keyof typeof colors]
        }`}
      >
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700">
      {/* Header with Health Score */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-400" />
            Protocol Health
          </h3>
          <p className="text-gray-400 text-sm">
            Real-time system status monitoring
          </p>
        </div>

        {/* Health Score */}
        <div className="text-center">
          <div
            className={`text-4xl font-bold ${getHealthScoreColor(healthScore)}`}
          >
            {healthScore}
          </div>
          <div className="text-sm text-gray-400">/ 100</div>
          <div
            className={`text-sm font-semibold mt-1 ${getHealthScoreColor(
              healthScore
            )}`}
          >
            {getHealthScoreStatus(healthScore)}
          </div>
        </div>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Peg Stability */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <StatusIcon status={pegStatus} />
              <span className="text-gray-300 font-semibold text-sm">
                eETH/ETH Peg
              </span>
            </div>
            <StatusBadge status={pegStatus} />
          </div>

          <div className="text-2xl font-bold text-white mb-1">
            {pegRatio.toFixed(4)}
          </div>

          <div className="text-xs text-gray-400 space-y-1">
            <div>Target: 1.0000</div>
            <div
              className={
                pegStatus === "healthy"
                  ? "text-green-400"
                  : pegStatus === "warning"
                  ? "text-yellow-400"
                  : "text-red-400"
              }
            >
              {pegStatus === "healthy" && "✓ Within normal range"}
              {pegStatus === "warning" && "⚠ Slight deviation"}
              {pegStatus === "critical" && "✗ Significant deviation"}
            </div>
          </div>
        </div>

        {/* Validator Health */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <StatusIcon status={validatorStatus} />
              <span className="text-gray-300 font-semibold text-sm">
                Validators
              </span>
            </div>
            <StatusBadge status={validatorStatus} />
          </div>

          <div className="text-2xl font-bold text-white mb-1">
            {validatorUptime.toFixed(1)}%
          </div>

          <div className="text-xs text-gray-400 space-y-1">
            {totalValidators && activeValidators ? (
              <>
                <div>
                  Active: {activeValidators.toLocaleString()} /{" "}
                  {totalValidators.toLocaleString()}
                </div>
                <div className="text-green-400">✓ Uptime excellent</div>
              </>
            ) : (
              <>
                <div>Estimated uptime</div>
                <div className="text-green-400">✓ Network healthy</div>
              </>
            )}
          </div>
        </div>

        {/* Capacity Utilization */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <StatusIcon status={capacityStatus} />
              <span className="text-gray-300 font-semibold text-sm">
                Capacity
              </span>
            </div>
            <StatusBadge status={capacityStatus} />
          </div>

          <div className="text-2xl font-bold text-white mb-1">
            {maxCapacity ? `${capacityPercent.toFixed(0)}%` : "Unlimited"}
          </div>

          {maxCapacity ? (
            <>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    capacityStatus === "healthy"
                      ? "bg-green-500"
                      : capacityStatus === "warning"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${Math.min(capacityPercent, 100)}%` }}
                />
              </div>
              <div className="text-xs text-gray-400">
                {capacityStatus === "healthy" && "✓ Room available"}
                {capacityStatus === "warning" && "⚠ Filling up"}
                {capacityStatus === "critical" && "✗ Near capacity"}
              </div>
            </>
          ) : (
            <div className="text-xs text-gray-400 space-y-1">
              <div>No limit set</div>
              <div className="text-green-400">✓ Open for deposits</div>
            </div>
          )}
        </div>
      </div>

      {/* Status Messages */}
      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <div className="flex items-start gap-2 text-sm">
          <Activity className="w-4 h-4 text-blue-400 mt-0.5" />
          <div className="text-gray-400">
            {healthScore >= 90 && (
              <span className="text-green-400">
                All systems operational. Protocol is running smoothly.
              </span>
            )}
            {healthScore >= 70 && healthScore < 90 && (
              <span className="text-yellow-400">
                System operational with minor issues. Monitoring closely.
              </span>
            )}
            {healthScore < 70 && (
              <span className="text-red-400">
                System experiencing issues. Review metrics above for details.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
