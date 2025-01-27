"use client";

import { useState, useEffect } from "react";

export function useScrollPastHero() {
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Create a sentinel element at 100vh
    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = "120vh"; // Place it at exactly one viewport height
    sentinel.style.height = "1px";
    sentinel.style.width = "1px";
    sentinel.style.pointerEvents = "none";
    sentinel.style.opacity = "0";
    document.body.appendChild(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => {
        // On mobile, we use the intersection observer
        // On desktop (>= 768px), we always show
        const shouldShow = window.innerWidth >= 768 || !entry.isIntersecting;
        setHasScrolledPastHero(shouldShow);
      },
      {
        threshold: 0, // Trigger as soon as even 1px is passed
      }
    );

    observer.observe(sentinel);

    // Also handle resize events for the desktop override
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setHasScrolledPastHero(true);
      } else {
        // Reset state on mobile to let intersection observer handle it
        const entry = observer.takeRecords()[0];
        if (entry) {
          setHasScrolledPastHero(!entry.isIntersecting);
        }
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Initial check for desktop/mobile
    handleResize();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      document.body.removeChild(sentinel);
    };
  }, [isMounted]); // Only run effect when mounted

  // Return false during SSR and initial mount
  if (!isMounted) return false;

  return hasScrolledPastHero;
}
