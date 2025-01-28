"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/theme-provider";
import { LivestreamCallout } from "../livestream/livestream-callout";
import { Headline } from "@/components/ui/headline";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

const DynamicGalaxyBackground = dynamic(
  () => import("./galaxy-background").then((mod) => mod.GalaxyBackground),
  { ssr: false }
);

export function Hero() {
  const { theme } = useTheme();
  const [isEnhanced, setIsEnhanced] = useState(false);

  useEffect(() => {
    // Wait for a frame after hydration to enhance
    requestAnimationFrame(() => {
      setIsEnhanced(true);
    });
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

      {/* Content overlay */}
      <div className="max-w-7xl container relative flex min-h-[80vh] flex-col items-center justify-center text-center py-12">
        <LivestreamCallout />
        {isEnhanced ? (
          <Headline className="max-w-4xl">
            Good things come to those who Grapple.
          </Headline>
        ) : (
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground/80">
            Good things come to those who Grapple.
          </h1>
        )}
        <p className="mt-8 max-w-2xl text-xl md:text-2xl text-gray-700 dark:text-white/90">
          We&apos;re obsessed with learning and growing the beautiful art of
          submission grappling.
        </p>

        <div className="mt-12 flex gap-6 justify-center">
          <Button size="lg" className="text-lg px-8" asChild>
            <Link href="/trial">Trial Class</Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8" asChild>
            <Link href="/about" title="Learn more about Grapple.">
              Our Values
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
