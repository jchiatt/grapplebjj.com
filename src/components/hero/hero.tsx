"use client";

import { GalaxyBackground } from "./galaxy-background";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/theme-provider";

export function Hero() {
  const { theme } = useTheme();

  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden">
      <GalaxyBackground key={theme} />

      {/* Content overlay */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative flex min-h-[80vh] flex-col items-center justify-center text-center">
        <h1 className="max-w-4xl bg-gradient-to-r from-primary via-black to-primary dark:from-primary dark:via-white dark:to-primary bg-clip-text text-5xl md:text-6xl lg:text-7xl font-bold text-transparent">
          Good things come to those who Grapple.
        </h1>
        <p className="mt-8 max-w-2xl text-xl md:text-2xl text-gray-700 dark:text-white/90">
          We&apos;re obsessed with learning and growing the beautiful art of
          submission grappling.
        </p>
        <div className="mt-12 flex gap-6 justify-center">
          <Button size="lg" className="text-lg px-8">
            Trial Class
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
