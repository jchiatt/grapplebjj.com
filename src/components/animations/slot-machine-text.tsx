"use client";

import { useEffect, useState, useRef } from "react";

const words = [
  "kids",
  "adults",
  "military",
  "police",
  "doctors",
  "nurses",
  "students",
  "men",
  "women",
  "jocks",
  "nerds",
  "competitors",
  "hobbyists",
  "the big",
  "the small",
  "the strong",
  "the weak",
  "the young",
  "the old",
  "you",
];

export function SlotMachineText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Set up the intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.intersectionRatio > 0 &&
          entry.boundingClientRect.y < window.innerHeight - 48
        ) {
          setShouldAnimate(true);
          observer.disconnect();
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle the animation once triggered
  useEffect(() => {
    if (!shouldAnimate) return;
    setIsAnimating(true);
  }, [shouldAnimate]);

  // Handle the word cycling
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === words.length - 1) {
          setIsAnimating(false);
          setTimeout(() => setShowHighlight(true), 200);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <span ref={containerRef} className="inline-block relative">
      <span className="relative z-10 bg-gradient-to-r from-black/80 via-primary-70 to-primary dark:from-primary dark:via-white dark:to-primary bg-clip-text text-transparent">
        {words[currentIndex]}
        <span>.</span>
      </span>
      {showHighlight && (
        <span
          className="absolute inset-0 -inset-x-2 bg-white/50 dark:bg-primary/50 -skew-y-2 animate-highlightSlide"
          style={{ transformOrigin: "0 0" }}
        />
      )}
    </span>
  );
}
