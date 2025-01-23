"use client";

import Link from "next/link";
import { ThemeSwitcher } from "../theme/theme-switcher";
import { Logo } from "../ui/logo";
import { useTheme } from "../theme/theme-provider";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 md:h-32 items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" className="flex items-center">
            <Logo
              theme={theme as "purple" | "blue"}
              size="lg"
              className="w-auto h-12 md:h-[84px]"
            />
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/schedule"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Schedule
            </Link>
            <Link
              href="/livestream"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Livestream
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              href="/articles"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Articles
            </Link>
            <Link
              href="/events"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Events
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
