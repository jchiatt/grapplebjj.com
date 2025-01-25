import { cn } from "@/lib/utils";

interface FullWidthSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  containerClassName?: string;
}

export function FullWidthSection({
  children,
  className,
  containerClassName,
  ...props
}: FullWidthSectionProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <div className={cn("container", containerClassName)}>{children}</div>
    </div>
  );
}
