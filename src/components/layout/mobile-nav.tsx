"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetHeader,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { LivestreamLink } from "../livestream/livestream-link";
import { cn } from "@/lib/utils";

function NavLink({
  href,
  children,
  external,
  className,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  if (external) {
    return (
      <SheetClose asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-foreground/60 transition-colors hover:text-foreground/80",
            className
          )}
        >
          {children}
        </a>
      </SheetClose>
    );
  }

  return (
    <SheetClose asChild>
      <Link
        href={href}
        className={cn(
          "text-foreground/60 transition-colors hover:text-foreground/80",
          className
        )}
      >
        {children}
      </Link>
    </SheetClose>
  );
}

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Quick access to all pages
          </SheetDescription>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-4">
          <NavLink href="/schedule" className="block text-base font-medium">
            Schedule
          </NavLink>
          <NavLink href="/pricing" className="block text-base font-medium">
            Pricing
          </NavLink>

          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground list-none">
              Programs
              <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-3 flex flex-col gap-2 pl-4">
              <NavLink
                href="/jiu-jitsu-programs/kids"
                className="block text-base font-medium text-foreground/80"
              >
                Kids Jiu Jitsu
              </NavLink>
              <NavLink
                href="/jiu-jitsu-programs/adult-jiu-jitsu"
                className="block text-base font-medium text-foreground/80"
              >
                Adult Jiu Jitsu
              </NavLink>
              <NavLink
                href="/jiu-jitsu-programs/womens-jiu-jitsu"
                className="block text-base font-medium text-foreground/80"
              >
                Women&apos;s Jiu Jitsu
              </NavLink>
              <NavLink
                href="/jiu-jitsu-programs/competition-team"
                className="block text-base font-medium text-foreground/80"
              >
                Grapple Competition Team
              </NavLink>
              <NavLink
                href="/jiu-jitsu-programs/first-responders"
                className="block text-base font-medium text-foreground/80"
              >
                Jiu Jitsu for Law Enforcement Officers/First Responders
              </NavLink>
              <NavLink
                href="/jiu-jitsu-programs/hospital-workers"
                className="block text-base font-medium text-foreground/80"
              >
                Jiu Jitsu for Hospital Workers
              </NavLink>
            </div>
          </details>

          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground list-none">
              Community
              <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-3 flex flex-col gap-2 pl-4">
              <NavLink
                href="/events"
                className="block text-base font-medium text-foreground/80"
              >
                Events
              </NavLink>
              <LivestreamLink
                mobile={true}
                className="block text-base font-medium text-foreground/80"
              />
              <NavLink
                href="/articles"
                className="block text-base font-medium text-foreground/80"
              >
                Articles
              </NavLink>
              <NavLink
                href="/sponsor"
                className="block text-base font-medium text-foreground/80"
              >
                Sponsor
              </NavLink>
              <NavLink
                href="https://www.grapple.store"
                external
                className="block text-base font-medium text-foreground/80"
              >
                Merch
              </NavLink>
            </div>
          </details>

          <NavLink href="/contact" className="block text-base font-medium">
            Contact
          </NavLink>

          <div className="pt-4 mt-4 border-t flex flex-col gap-3">
            <SheetClose asChild>
              <Button asChild className="w-full">
                <Link href="/trial">Free Trial Class</Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button asChild variant="outline" className="w-full">
                <a
                  href="https://members.grapplejj.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Login
                </a>
              </Button>
            </SheetClose>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
