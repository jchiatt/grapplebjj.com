"use client";

import { Button } from "./button";
import Link from "next/link";

interface CallToActionProps {
  title: string;
  description: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  className?: string;
}

export function CallToAction({
  title,
  description,
  primaryAction,
  secondaryAction,
  className = "",
}: CallToActionProps) {
  return (
    <div
      className={`rounded-lg border-2 border-secondary/10 p-4 md:p-8 lg:p-12 text-center ${className}`}
    >
      <div className="relative">
        <h2 className="max-w-4xl mx-auto bg-gradient-to-r from-primary via-black to-primary dark:from-primary dark:via-white dark:to-primary bg-clip-text text-4xl md:text-6xl lg:text-7xl font-bold text-transparent pb-8">
          {title}
        </h2>
      </div>
      <p className="mt-8 max-w-2xl mx-auto text-xl md:text-2xl text-gray-700 dark:text-white/90">
        {description}
      </p>
      <div className="mt-12 flex gap-6 justify-center">
        <Link href={primaryAction.href}>
          <Button size="lg" className="text-lg px-8">
            {primaryAction.label}
          </Button>
        </Link>
        {secondaryAction && (
          <Link href={secondaryAction.href}>
            <Button size="lg" variant="outline" className="text-lg px-8">
              {secondaryAction.label}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
