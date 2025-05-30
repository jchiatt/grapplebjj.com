"use client";

import Link from "next/link";
import { ThemeSwitcher } from "../theme/theme-switcher";
import { Logo } from "../ui/logo";
import { MobileNav } from "./mobile-nav";
import { LivestreamLink } from "../livestream/livestream-link";
import { useTheme } from "../theme/theme-provider";

export function Header() {
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 md:h-32 items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" className="flex items-center">
            <Logo
              theme={theme ?? "purple"}
              size="lg"
              className="w-auto h-12 md:h-[84px]"
            />
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link
              href="/schedule"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Schedule
            </Link>
            <LivestreamLink />
            <Link
              href="/pricing"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Pricing
            </Link>
            <Link
              href="/articles"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Articles
            </Link>
            <Link
              href="/events"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Events
            </Link>
            <a
              href="https://www.grapple.store"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Merch
            </a>
            <Link
              href="/contact"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex">
            <a
              href="https://members.grapplejj.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Login
            </a>
          </nav>
          <ThemeSwitcher />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
