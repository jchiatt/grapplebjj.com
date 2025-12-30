"use client";

import Link from "next/link";
import { useLiveStream } from "./livestream-context";
import { SheetClose } from "../ui/sheet";
import { cn } from "@/lib/utils";

export function LivestreamLink({
  mobile,
  className,
}: {
  mobile?: boolean;
  className?: string;
}) {
  const { liveStatus, isLoading } = useLiveStream();

  if (mobile) {
    return (
      <SheetClose asChild>
        <Link
          href="/livestream"
          className={cn(
            "relative flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80",
            className
          )}
        >
          {!isLoading && liveStatus?.isLive && (
            <span className="absolute -left-3 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          )}
          Livestream
        </Link>
      </SheetClose>
    );
  }

  return (
    <Link
      href="/livestream"
      className={cn(
        "relative flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80",
        className
      )}
    >
      {!isLoading && liveStatus?.isLive && (
        <span className="absolute -left-3 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
      )}
      Livestream
    </Link>
  );
}
