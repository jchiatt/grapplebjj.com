"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/theme-provider";
import { LivestreamCallout } from "../livestream/livestream-callout";
import { Headline } from "@/components/ui/headline";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { Star } from "lucide-react";

const DynamicGalaxyBackground = dynamic(
  () => import("./galaxy-background").then((mod) => mod.GalaxyBackground),
  { ssr: false }
);

const REVIEWS = [
  "Training at Grapple has boosted my confidence in multiple areas of my BJJ game.",
  "Grapple feels like a second home.",
  "Family friendly environment and tough training.",
  "The members are welcoming, genuine, and stay connected with me regularly.",
  "J.C. has done an incredible job with this school",
  "The dedication and investment in the school are evident in every aspect, from the expert teaching to the welcoming and supportive atmosphere. ",
  "The culture here is truly one of a kind, making it an exceptional place to learn and grow. Highly recommended!",
  "Excellent instruction and great teammates for adults and kids alike.",
  "This is the best training environment I've ever been in.",
  "I always feel welcome, everyone is there to learn and improve together and nobody has an ego.",
  "Started tonight as a beginner and they were super helpful and in no way were judgmental.",
  "Great place to learn and train BJJ! Awesome coach!",
  "This is the place to be in Mississippi.",
  "I travel 4 hours every week just to train here",
  "Very friendly and helpful. I appreciated how welcome and supported I felt here!",
  "Splendid place to train along with great instruction and atmosphere.",
  "They pay attention to hygiene",
];

const REVIEW_POSITIONS = [
  { top: 8, left: 6, width: 240, duration: 48, delay: -6 },
  { top: 20, left: 32, width: 260, duration: 52, delay: -14 },
  { top: 14, left: 58, width: 220, duration: 46, delay: -10 },
  { top: 32, left: 70, width: 180, duration: 54, delay: -22 },
  { top: 44, left: 10, width: 230, duration: 50, delay: -18 },
  { top: 52, left: 38, width: 240, duration: 56, delay: -28 },
  { top: 60, left: 64, width: 200, duration: 49, delay: -16 },
  { top: 74, left: 18, width: 240, duration: 58, delay: -30 },
  { top: 82, left: 48, width: 220, duration: 53, delay: -20 },
  { top: 68, left: 76, width: 170, duration: 47, delay: -12 },
  { top: 90, left: 84, width: 210, duration: 51, delay: -24 },
  { top: 100, left: 10, width: 250, duration: 55, delay: -32 },
  { top: 110, left: 38, width: 260, duration: 59, delay: -36 },
  { top: 120, left: 64, width: 220, duration: 54, delay: -26 },
  { top: 130, left: 90, width: 180, duration: 48, delay: -14 },
  { top: 140, left: 116, width: 230, duration: 52, delay: -20 },
  { top: 150, left: 142, width: 240, duration: 56, delay: -28 },
  { top: 160, left: 168, width: 200, duration: 50, delay: -16 },
  { top: 170, left: 194, width: 250, duration: 54, delay: -24 },
];

const MOBILE_REVIEW_INTERVAL_MS = 3000;

export function Hero() {
  const { theme } = useTheme();
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [mobileReviewIndex, setMobileReviewIndex] = useState(0);

  useEffect(() => {
    // Wait for a frame after hydration to enhance
    requestAnimationFrame(() => {
      setIsEnhanced(true);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMobileReviewIndex((current) => (current + 1) % REVIEWS.length);
    }, MOBILE_REVIEW_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden">
      <Suspense
        fallback={
          <div className="absolute inset-0 bg-gradient-to-b from-background to-muted" />
        }
      >
        <DynamicGalaxyBackground key={theme} />
      </Suspense>

      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/90 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/80 to-transparent" />
          {REVIEWS.map((review, index) => {
            const position = REVIEW_POSITIONS[index];
            return (
              <div
                key={`hero-review-${index}`}
                className="absolute hidden rounded-lg border border-border/70 bg-background/80 px-4 py-3 text-xs text-foreground/70 shadow-sm opacity-60 backdrop-blur-sm dark:border-white/20 dark:bg-white/10 dark:text-white/80 dark:opacity-75 sm:block"
                style={{
                  top: `${position.top}%`,
                  left: `${position.left}%`,
                  width: position.width,
                  animation: `hero-review-float ${position.duration}s linear infinite`,
                  animationDelay: `${position.delay}s`,
                  willChange: "transform",
                }}
              >
                <div className="mb-2 flex items-center gap-1 text-primary/80">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={`star-${index}-${starIndex}`}
                      className="h-3 w-3 fill-current"
                    />
                  ))}
                </div>
                <p>&ldquo;{review}&rdquo;</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content overlay */}
      <div className="max-w-7xl container relative z-10 flex min-h-[80vh] flex-col justify-center py-12">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="text-left">
            <LivestreamCallout />
            {isEnhanced ? (
              <Headline className="max-w-3xl">
                In Flowood, Your Jiu Jitsu Journey Starts Here.
              </Headline>
            ) : (
              <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground/80">
                In Flowood, Your Jiu Jitsu Journey Starts Here.
              </h1>
            )}
            <p className="mt-6 max-w-2xl text-xl md:text-2xl text-gray-700 dark:text-white/90">
              A modern, safe, and systematic approach to submission grappling.
              Perfect for beginners, competitors, and everyone in between.
            </p>

            <div className="mt-6 sm:mt-10">
              <div className="relative h-20 overflow-hidden text-sm text-muted-foreground sm:hidden">
                <p
                  key={`hero-mobile-review-${mobileReviewIndex}`}
                  className="absolute inset-0 flex flex-col items-start justify-center gap-2 animate-[hero-mobile-review_3s_ease-in-out]"
                >
                  <span className="flex items-center gap-1 text-primary/80">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={`hero-mobile-star-${mobileReviewIndex}-${starIndex}`}
                        className="h-3 w-3 fill-current"
                      />
                    ))}
                  </span>
                  <span>&ldquo;{REVIEWS[mobileReviewIndex]}&rdquo;</span>
                </p>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-4 sm:mt-0 sm:justify-start">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/trial">Trial Class</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8"
                  asChild
                >
                  <Link href="/about" title="Learn more about Grapple.">
                    Our Values
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-start lg:justify-end">
            <div className="w-full max-w-xs rounded-lg border bg-card p-1 shadow-lg">
              <div className="aspect-[9/16] w-full overflow-hidden rounded-md border border-border bg-black">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/6HPsq1FB8lg?playsinline=1"
                  title="Grapple Jiu Jitsu Welcome Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes hero-review-float {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-220px);
          }
        }
        @keyframes hero-mobile-review {
          0% {
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
