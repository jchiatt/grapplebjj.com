"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import growthData from "@/data/growth.json";

interface MetricCardProps {
  title: string;
  value: string | number;
  previousValue: string | number;
  percentChange: number;
  className?: string;
}

interface VideoCardProps {
  title: string;
  description: string;
  videoId: string;
  date: string;
}

function VideoCard({ title, description, videoId, date }: VideoCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
        <time className="text-sm text-muted-foreground">{date}</time>
      </div>
    </Card>
  );
}

function MetricCard({
  title,
  value,
  previousValue,
  percentChange,
  className,
}: MetricCardProps) {
  const isExpenseMetric = title.toLowerCase().includes("expense");
  const isProfitMetric = title.toLowerCase().includes("profit");
  const isFinancialMetric =
    typeof value === "number" &&
    (title.toLowerCase().includes("income") ||
      isExpenseMetric ||
      isProfitMetric);

  // For expenses, an increase is bad (should be red)
  // For profit, we compare absolute values
  const isPositive = isExpenseMetric
    ? percentChange < 0 // Expenses decreasing is good
    : isProfitMetric
    ? value > previousValue // Higher profit is good
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
    <Card className={cn("p-6", className)}>
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold">{formatValue(value)}</span>
        <span
          className={cn(
            "text-sm",
            isPositive && "text-green-500",
            isNeutral && "text-muted-foreground",
            !isPositive && !isNeutral && "text-red-500"
          )}
        >
          {isPositive ? "+" : ""}
          {percentChange.toFixed(1)}% MoM
        </span>
        <span className="text-sm text-muted-foreground">
          from {formatValue(previousValue)}
        </span>
      </div>
    </Card>
  );
}

function calculatePercentChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

export default function GrowthPage() {
  const { current, previous } = growthData;

  // Example growth videos data - replace with real data
  const growthVideos = [
    {
      title:
        "From losing $600/mo to turning a profit - A 'blue belt' jiu jitsu gym owner's journey",
      description:
        "Our journey begins! Here's how we got our first 10 members.",
      videoId: "-V-tMH_R6bI",
      date: "September 2024",
    },
    {
      title: "How a 'blue belt' became a gym owner",
      description: `I'm on a journey of learning how to get a gym profitable, become a better jiu jitsu practitioner, and become a better a coach.`,
      videoId: "eVIxj2IQ-iU",
      date: "October 2024",
    },
    {
      title: "Bringing back the belt system at my gym...",
      description: "How we're using social media to grow our gym.",
      videoId: "LpOxsxO6nao",
      date: "December 2024",
    },
    {
      title: "Belts and gym drama",
      description:
        "Less than 3 days after bringing back the belts... This is why we can't have nice things.",
      videoId: "mo9oQp-x4VM",
      date: "January 2025",
    },
    {
      title: "Finances and Growth Update - January 2025",
      description: "We finished 2024 must stronger than we began it!",
      videoId: "V151uuhc2WM",
      date: "January 2025",
    },
  ];

  return (
    <div className="container py-24 space-y-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Growth Dashboard
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Follow along as we build Grapple in public. We share our metrics,
              learnings, and journey to help others who might want to start
              their own martial arts gym.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              title="Monthly Income"
              value={current.income}
              previousValue={previous.income}
              percentChange={calculatePercentChange(
                current.income,
                previous.income
              )}
            />
            <MetricCard
              title="Monthly Expenses"
              value={current.expenses}
              previousValue={previous.expenses}
              percentChange={calculatePercentChange(
                current.expenses,
                previous.expenses
              )}
            />
            <MetricCard
              title="Monthly Profit"
              value={current.profit}
              previousValue={previous.profit}
              percentChange={calculatePercentChange(
                current.profit,
                previous.profit
              )}
            />
            <MetricCard
              title="Active Members"
              value={current.members}
              previousValue={previous.members}
              percentChange={calculatePercentChange(
                current.members,
                previous.members
              )}
            />
            <MetricCard
              title="Social Reach"
              value={current.socialReach}
              previousValue={previous.socialReach}
              percentChange={calculatePercentChange(
                current.socialReach,
                previous.socialReach
              )}
            />
          </div>
        </div>

        {/* Featured Video */}
        <div className="w-full md:w-[300px] aspect-[9/16] bg-muted rounded-lg shrink-0">
          <iframe
            className="w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/-V-tMH_R6bI?si=KQDYg3AJfMmbVSc_"
            title="From losing $600/mo to turning a profit - A 'blue belt' jiu jitsu gym owner's journey"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Growth Videos Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Growth Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {growthVideos.map((video) => (
            <VideoCard key={video.videoId} {...video} />
          ))}
        </div>
      </div>
    </div>
  );
}
