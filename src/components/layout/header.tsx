"use client";

import Link from "next/link";
import { ThemeSwitcher } from "../theme/theme-switcher";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-heading text-xl font-semibold">Grapple</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/schedule"
              className="text-sm font-medium transition-colors"
            >
              Schedule
            </Link>
            <Link
              href="/livestream"
              className="text-sm font-medium transition-colors"
            >
              Livestream
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/articles"
              className="text-sm font-medium transition-colors"
            >
              Articles
            </Link>
            <Link
              href="/events"
              className="text-sm font-medium transition-colors"
            >
              Events
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <Link
            href="/trial"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </header>
  );
}
