"use client";

import { useState, useEffect, useRef } from "react";

export function useScrollPastHero() {
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create sentinel element
    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = "80vh";
    sentinel.style.height = "1px";
    sentinel.style.width = "1px";
    sentinel.style.pointerEvents = "none";
    sentinel.style.opacity = "0";
    document.body.appendChild(sentinel);
    sentinelRef.current = sentinel;

    // Create and setup observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasScrolledPastHero(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    observerRef.current = observer;

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (sentinelRef.current) {
        document.body.removeChild(sentinelRef.current);
        sentinelRef.current = null;
      }
    };
  }, []); // Empty dependency array - only run once on mount

  // Always return false during SSR
  return hasScrolledPastHero;
}
