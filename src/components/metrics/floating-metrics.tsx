"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import growthData from "@/data/growth.json";

function calculatePercentChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

function MetricItem({
  label,
  value,
  percentChange,
  rawValue,
  previousValue,
}: {
  label: string;
  value: string | number;
  percentChange: number;
  rawValue: number;
  previousValue: number;
}) {
  const isProfitMetric = label.toLowerCase().includes("profit");
  const isFinancialMetric = isProfitMetric;

  // For profit, compare absolute values - if current profit is higher than previous, it's positive
  const isPositive = isProfitMetric
    ? rawValue > previousValue
    : percentChange > 0;
  const isNeutral = percentChange === 0;

  const formatValue = (val: string | number) => {
    if (isFinancialMetric) {
      const numValue =
        typeof val === "string"
          ? parseFloat(val.replace(/[^0-9.-]+/g, ""))
          : val;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(numValue);
    }
    return typeof val === "number" ? val.toLocaleString() : val;
  };

  return (
    <div className="space-y-0.5">
      <p className="text-sm text-muted-foreground text-left">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-semibold">
          {isFinancialMetric ? formatValue(rawValue) : formatValue(value)}
        </span>
        <span
          className={cn(
            "text-xs",
            isPositive && "text-green-500",
            isNeutral && "text-muted-foreground",
            !isPositive && !isNeutral && "text-red-500"
          )}
        >
          {isPositive ? "+" : ""}
          {percentChange.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

export function FloatingMetrics() {
  const { current, previous } = growthData;

  return (
    <Card className="p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <MetricItem
          label="Last Month's Profit"
          value={current.profit}
          rawValue={current.profit}
          previousValue={previous.profit}
          percentChange={calculatePercentChange(
            current.profit,
            previous.profit
          )}
        />
        <MetricItem
          label="Social Reach"
          value={current.socialReach}
          rawValue={current.socialReach}
          previousValue={previous.socialReach}
          percentChange={calculatePercentChange(
            current.socialReach,
            previous.socialReach
          )}
        />
      </div>
      <Link
        href="/growth"
        className="block text-sm text-center py-2 px-4 bg-muted hover:bg-muted/80 rounded-md transition-colors"
      >
        View All Growth Metrics →
      </Link>
    </Card>
  );
}
