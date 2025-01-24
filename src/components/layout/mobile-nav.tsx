"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { LivestreamLink } from "../livestream/livestream-link";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Quick access to all pages on Grapple BJJ
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-6">
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
        </nav>
      </SheetContent>
    </Sheet>
  );
}
