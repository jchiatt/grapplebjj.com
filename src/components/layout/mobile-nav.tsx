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
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            Schedule
          </Link>
          <Link
            href="/livestream"
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            Livestream
          </Link>
          <Link
            href="/pricing"
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            Pricing
          </Link>
          <Link
            href="/articles"
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            Articles
          </Link>
          <Link
            href="/events"
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            Events
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
