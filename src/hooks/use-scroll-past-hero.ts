"use client";

import { useState, useEffect, useRef } from "react";

export function useScrollPastHero() {
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Create a sentinel element at viewport height if it doesn't exist
    if (!sentinelRef.current) {
      const sentinel = document.createElement("div");
      sentinel.style.position = "absolute";
      sentinel.style.top = "80vh"; // Place it at 80% of viewport height (matches hero height)
      sentinel.style.height = "1px";
      sentinel.style.width = "1px";
      sentinel.style.pointerEvents = "none";
      sentinel.style.opacity = "0";
      document.body.appendChild(sentinel);
      sentinelRef.current = sentinel;
    }

    // Create observer if it doesn't exist
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          setHasScrolledPastHero(!entry.isIntersecting);
        },
        {
          threshold: 0, // Trigger as soon as even 1px is passed
        }
      );
    }

    // Start observing
    if (sentinelRef.current && observerRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (sentinelRef.current) {
        document.body.removeChild(sentinelRef.current);
        sentinelRef.current = null;
      }
    };
  }, [isMounted]); // Only re-run if isMounted changes

  // Only return false during SSR/initial mount
  if (!isMounted) {
    return false;
  }

  return hasScrolledPastHero;
}
