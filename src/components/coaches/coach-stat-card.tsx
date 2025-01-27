"use client";

import { Card } from "@/components/ui/card";
import Link from "next/link";

interface CoachStatCardProps {
  label: string;
  value: string;
  href?: string;
}

export function CoachStatCard({ label, value, href }: CoachStatCardProps) {
  const content = (
    <Card className="p-4 text-center hover:bg-muted/50 transition-colors">
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-lg font-semibold text-primary">{value}</p>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
