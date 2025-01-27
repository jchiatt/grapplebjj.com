import type { Metadata } from "next";
import { InterestForm } from "@/components/kids/interest-form";

export const metadata: Metadata = {
  title: "Kids Classes - Grapple Jiu Jitsu",
  description:
    "Kids jiu jitsu classes coming soon to Grapple. Sign up to express interest and be one of our first students!",
};

export default function KidsPage() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold font-heading">
          Kids Jiu Jitsu Coming Soon!
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We&apos;re excited to announce that kids classes will be starting soon
          at Grapple! We&apos;re looking to hear from you to help us plan the
          best classes for your kids.
        </p>
      </section>

      {/* Interest Form */}
      <InterestForm />
    </div>
  );
}
