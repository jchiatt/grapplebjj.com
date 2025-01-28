"use client";

import { useState, useEffect, useRef } from "react";

export function useScrollPastHero() {
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Handle mounting separately to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    // Only run after component is mounted and hydrated
    if (!isMounted) return;

    // Cleanup previous sentinel if it exists
    if (sentinelRef.current) {
      document.body.removeChild(sentinelRef.current);
      sentinelRef.current = null;
    }

    // Create sentinel in a requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      if (!sentinelRef.current) {
        const sentinel = document.createElement("div");
        sentinel.style.position = "absolute";
        sentinel.style.top = "80vh";
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
            threshold: 0,
          }
        );
      }

      // Start observing
      if (sentinelRef.current && observerRef.current) {
        observerRef.current.observe(sentinelRef.current);
      }
    });

    // Cleanup function
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
  }, [isMounted]); // Only re-run if isMounted changes

  return isMounted ? hasScrolledPastHero : false;
}
