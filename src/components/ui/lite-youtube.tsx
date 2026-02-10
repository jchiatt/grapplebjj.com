"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiteYouTubeProps {
  videoId: string;
  title: string;
  posterSrc: string;
  className?: string;
}

export function LiteYouTube({
  videoId,
  title,
  posterSrc,
  className,
}: LiteYouTubeProps) {
  const [activated, setActivated] = useState(false);
  const embedSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`;

  return (
    <div
      className={cn(
        "relative aspect-[9/16] w-full overflow-hidden rounded-lg bg-black",
        className
      )}
    >
      {activated ? (
        <iframe
          className="h-full w-full"
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActivated(true)}
          className="group relative h-full w-full"
          aria-label={`Play ${title}`}
        >
          <Image
            src={posterSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 33vw"
            priority
          />
          <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition-transform group-hover:scale-105">
              <Play className="h-6 w-6 fill-current" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
