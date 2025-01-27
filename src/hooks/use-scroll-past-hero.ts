"use client";

import { useState, useEffect } from "react";

export function useScrollPastHero() {
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);

  useEffect(() => {
    // Create a sentinel element at 100vh
    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = "100vh"; // Place it at exactly one viewport height
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
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Initial check for desktop
    handleResize();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      document.body.removeChild(sentinel);
    };
  }, []);

  return hasScrolledPastHero;
}
