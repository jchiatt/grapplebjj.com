"use client";

import { useState, useEffect } from "react";
import { useLiveStream } from "./livestream-context";
import { useRouter, usePathname } from "next/navigation";
import { useScrollPastHero } from "@/hooks/use-scroll-past-hero";

export function FloatingPlayer() {
  const { liveStatus, isLoading } = useLiveStream();
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const showPlayer = useScrollPastHero();

  // Handle mounting separately to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Early return during SSR and initial mount
  if (!isMounted || !showPlayer) {
    return null;
  }

  // Return null for other conditions after hydration
  if (
    isLoading ||
    !liveStatus?.isLive ||
    !isVisible ||
    pathname === "/livestream"
  ) {
    return null;
  }

  const handleVideoClick = () => {
    router.push("/livestream");
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push("/livestream");
  };

  return (
    <div className="fixed bottom-16 right-1 z-50 bg-background rounded-lg shadow-lg overflow-hidden transition-all duration-300 border border-border w-[180px] md:w-64">
      <div
        className="aspect-video w-full transition-all duration-300 cursor-pointer"
        onClick={handleVideoClick}
      >
        <iframe
          src={`https://www.youtube.com/embed/${liveStatus.videoId}?autoplay=1&mute=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          loading="lazy"
          allowFullScreen
          className="w-full h-full pointer-events-none"
        />
      </div>
      <div className="p-2 md:p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 md:h-3 w-2 md:w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-full w-full bg-red-500"></span>
          </span>
          <span className="font-medium text-sm md:text-base">Live Now</span>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={handleExpand}
            className="text-foreground/60 hover:text-foreground"
            aria-label="Open livestream"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="md:w-4 md:h-4"
            >
              <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
            </svg>
          </button>
          <button
            onClick={handleClose}
            className="text-foreground/60 hover:text-foreground"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="md:w-4 md:h-4"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
