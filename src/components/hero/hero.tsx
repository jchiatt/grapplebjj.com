"use client";

import { GalaxyBackground } from "./galaxy-background";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/theme-provider";
import { LivestreamCallout } from "../livestream/livestream-callout";
import { Headline } from "@/components/ui/headline";
import Link from "next/link";

export function Hero() {
  const { theme } = useTheme();

  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden">
      <GalaxyBackground key={theme} />

      {/* Content overlay */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative flex min-h-[80vh] flex-col items-center justify-center text-center">
        <LivestreamCallout />
        <Headline className="max-w-4xl">
          Good things come to those who Grapple.
        </Headline>
        <p className="mt-8 max-w-2xl text-xl md:text-2xl text-gray-700 dark:text-white/90">
          We&apos;re obsessed with learning and growing the beautiful art of
          submission grappling.
        </p>
        <div className="mt-12 flex gap-6 justify-center">
          <Button size="lg" className="text-lg px-8" asChild>
            <Link href="/trial">Trial Class</Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8" asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
