"use client";

import Link from "next/link";
import { ThemeSwitcher } from "../theme/theme-switcher";
import { Logo } from "../ui/logo";
import { MobileNav } from "./mobile-nav";
import { LivestreamLink } from "../livestream/livestream-link";
import { useTheme } from "../theme/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-foreground/60 transition-colors hover:text-foreground/80"
                >
                  Programs
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/jiu-jitsu-programs/kids">Kids Jiu Jitsu</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/schedule"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Schedule
            </Link>
            <Link
              href="/pricing"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Pricing
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-foreground/60 transition-colors hover:text-foreground/80"
                >
                  Resources
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <LivestreamLink />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/articles">Articles</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
