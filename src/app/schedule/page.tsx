import { Schedule } from "@/components/schedule/schedule";
import { Headline } from "@/components/ui/headline";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Class Schedule | Grapple",
  description:
    "View our class schedule and book your next training session at Grapple.",
};

export default function SchedulePage() {
  const weekStartDate = new Date();
  weekStartDate.setDate(weekStartDate.getDate() - weekStartDate.getDay());

  const formattedWeekStart = weekStartDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Headline as="h1" size="h1" className="mb-8 md:mb-16 text-center">
        Class Schedule
      </Headline>
      <p className="mb-8 text-center text-sm text-secondary-foreground/80 md:mb-12">
        Class times for the week of {formattedWeekStart}
      </p>
      <Schedule />
    </div>
  );
}
