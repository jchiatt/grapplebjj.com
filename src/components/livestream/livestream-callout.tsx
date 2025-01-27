"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLiveStream } from "./livestream-context";
import { useTheme } from "../theme/theme-provider";
import { cn } from "@/lib/utils";

export function LivestreamCallout() {
  const { liveStatus, isLoading } = useLiveStream();
  const { theme } = useTheme();

  if (isLoading || !liveStatus?.isLive) return null;

  return (
    <Link
      href={liveStatus.streamUrl || "/livestream"}
      target={liveStatus.streamUrl ? "_blank" : "_self"}
      rel={liveStatus.streamUrl ? "noopener noreferrer" : undefined}
      className="no-underline mb-8"
    >
      <div className="animate-bounce">
        <Button
          size="lg"
          variant="default"
          className="relative flex items-center gap-2 px-8 text-lg"
        >
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
          Watch Live Now
        </Button>
      </div>
    </Link>
  );
}
