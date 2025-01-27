import Link from "next/link";
import { cn } from "@/lib/utils";

interface FloatingCTAProps {
  className?: string;
}

export function FloatingCTA({ className }: FloatingCTAProps) {
  return (
    <Link
      href="/trial"
      className={cn(
        "fixed right-0 bottom-0 z-50",
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
