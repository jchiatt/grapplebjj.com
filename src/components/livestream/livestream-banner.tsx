"use client";

import Link from "next/link";
import { useLiveStream } from "./livestream-context";

export function LivestreamBanner() {
  const { liveStatus, isLoading } = useLiveStream();

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
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400"></span>
          </span>
          We&apos;re live! Watch the stream <span>&rarr;</span>
        </p>
      </div>
    </Link>
  );
}
