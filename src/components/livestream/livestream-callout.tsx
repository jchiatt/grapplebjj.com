"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLiveStream } from "./livestream-context";

export function LivestreamCallout() {
  const { liveStatus, isLoading } = useLiveStream();

  if (isLoading || !liveStatus?.isLive) return null;

  return (
    <Link
      href={liveStatus.streamUrl || "/livestream"}
      className="no-underline mb-8"
    >
      <div className="animate-bounce">
        <Button
          size="lg"
          variant="default"
          className="relative flex items-center gap-2 px-8 text-lg"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400"></span>
          </span>
          Watch Live Now
        </Button>
      </div>
    </Link>
  );
}
