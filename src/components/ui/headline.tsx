import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, forwardRef } from "react";

const headlineVariants = cva(
  "bg-gradient-to-r from-primary via-black to-primary dark:from-primary dark:via-white dark:to-primary bg-clip-text text-transparent font-bold leading-tight pb-4",
  {
    variants: {
      size: {
        h1: "text-5xl md:text-6xl lg:text-7xl",
        h2: "text-4xl md:text-5xl lg:text-6xl",
        h3: "text-3xl md:text-4xl lg:text-5xl",
        h4: "text-2xl md:text-3xl lg:text-4xl",
        h5: "text-xl md:text-2xl lg:text-3xl",
        h6: "text-lg md:text-xl lg:text-2xl",
      },
    },
    defaultVariants: {
      size: "h1",
    },
  }
);

interface HeadlineProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headlineVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Headline = forwardRef<HTMLHeadingElement, HeadlineProps>(
  ({ className, size, as = "h1", ...props }, ref) => {
    const Component = as;
    return (
      <Component
        ref={ref}
        className={cn(headlineVariants({ size: size || as }), className)}
        {...props}
      />
    );
  }
);

Headline.displayName = "Headline";

export { Headline, headlineVariants };
