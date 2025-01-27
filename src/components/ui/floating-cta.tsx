"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useScrollPastHero } from "@/hooks/use-scroll-past-hero";

interface FloatingCTAProps {
  className?: string;
}

export function FloatingCTA({ className }: FloatingCTAProps) {
  const showCTA = useScrollPastHero();

  if (!showCTA) return null;

  return (
    <Link
      href="/trial"
      className={cn(
        "fixed right-1 bottom-0 z-50",
        "bg-primary text-primary-foreground hover:bg-white",
        "px-6 py-3 text-sm font-semibold tracking-wider uppercase",
        "transition-colors duration-200",
        "rounded-t-lg shadow-lg",
        className
      )}
    >
      Free Trial Class
    </Link>
  );
}
