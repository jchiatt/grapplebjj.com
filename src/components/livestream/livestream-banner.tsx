"use client";

import Link from "next/link";
import { useLiveStream } from "./livestream-context";
import { cn } from "@/lib/utils";
import { useTheme } from "../theme/theme-provider";

export function LivestreamBanner() {
  const { liveStatus, isLoading } = useLiveStream();
  const { theme } = useTheme();

  if (isLoading || !liveStatus?.isLive) return null;

  return (
    <Link
      href={liveStatus.streamUrl || "/livestream"}
      target={liveStatus.streamUrl ? "_blank" : "_self"}
      rel={liveStatus.streamUrl ? "noopener noreferrer" : undefined}
      className="block w-full bg-primary hover:bg-primary/90 transition-colors"
    >
      <div className="container py-2 text-center">
        <p className="text-white font-medium flex items-center justify-center gap-2">
          <span className="relative flex h-3 w-3">
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full",
                theme === "valentine" ? "bg-white" : "bg-red-400"
              )}
            ></span>
            <span
              className={cn(
                "relative inline-flex rounded-full h-3 w-3",
                theme === "valentine" ? "bg-white" : "bg-red-400"
              )}
            ></span>
          </span>
          We&apos;re live! Watch the stream <span>&rarr;</span>
        </p>
      </div>
    </Link>
  );
}
