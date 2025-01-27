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

    // Create a sentinel element at 100vh if it doesn't exist
    if (!sentinelRef.current) {
      const sentinel = document.createElement("div");
      sentinel.style.position = "absolute";
      sentinel.style.top = "100vh"; // Place it at exactly one viewport height
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
          // On mobile, we use the intersection observer and show only when scrolled past
          // On desktop (>= 768px), we always show
          const isMobile = window.innerWidth < 768;
          const shouldShow = !isMobile || (isMobile && !entry.isIntersecting);
          setHasScrolledPastHero(shouldShow);
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

    // Handle resize events for the desktop override
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      if (!isMobile) {
        // On desktop, always show
        setHasScrolledPastHero(true);
      } else {
        // On mobile, check intersection
        const entry = observerRef.current?.takeRecords()[0];
        if (entry) {
          setHasScrolledPastHero(!entry.isIntersecting);
        } else {
          // If no intersection record yet, hide on mobile
          setHasScrolledPastHero(false);
        }
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Initial check for desktop/mobile
    handleResize();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener("resize", handleResize);
      if (sentinelRef.current) {
        document.body.removeChild(sentinelRef.current);
        sentinelRef.current = null;
      }
    };
  }, [isMounted]); // Only run effect when mounted

  // Only return false during SSR/initial mount
  if (!isMounted) {
    return false;
  }

  return hasScrolledPastHero;
}
