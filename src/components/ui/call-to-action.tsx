"use client";

import { Button } from "./button";
import Link from "next/link";

interface CallToActionProps {
  title: string;
  description: string;
  primaryAction: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
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
      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
        {primaryAction.href ? (
          <Link href={primaryAction.href}>
            <Button
              size="lg"
              className="w-full px-6 text-sm leading-snug whitespace-nowrap sm:w-auto sm:px-8 sm:text-lg"
            >
              {primaryAction.label}
            </Button>
          </Link>
        ) : (
          <Button
            size="lg"
            className="w-full px-6 text-sm leading-snug whitespace-nowrap sm:w-auto sm:px-8 sm:text-lg"
            type="button"
            onClick={primaryAction.onClick}
          >
            {primaryAction.label}
          </Button>
        )}
        {secondaryAction && (
          <>
            {secondaryAction.href ? (
              <Link href={secondaryAction.href}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full px-6 text-sm leading-snug whitespace-nowrap sm:w-auto sm:px-8 sm:text-lg"
                >
                  {secondaryAction.label}
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                variant="outline"
                className="w-full px-6 text-sm leading-snug whitespace-nowrap sm:w-auto sm:px-8 sm:text-lg"
                type="button"
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
