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
import { Menu } from "lucide-react";
import Link from "next/link";
import { LivestreamLink } from "../livestream/livestream-link";

function NavLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <SheetClose asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/60 transition-colors hover:text-foreground/80"
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
        className="text-foreground/60 transition-colors hover:text-foreground/80"
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
        <Button variant="ghost" size="icon" className="md:hidden">
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
        <nav className="flex flex-col gap-4 mt-6">
          <NavLink href="/schedule">Schedule</NavLink>
          <SheetClose asChild>
            <LivestreamLink />
          </SheetClose>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/articles">Articles</NavLink>
          <NavLink href="/events">Events</NavLink>
          <NavLink href="https://www.grapple.store" external>
            Merch
          </NavLink>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
