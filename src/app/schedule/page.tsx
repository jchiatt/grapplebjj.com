import { Schedule } from "@/components/schedule/schedule";
import { Headline } from "@/components/ui/headline";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Class Schedule | Grapple",
  description:
    "View our class schedule and book your next training session at Grapple.",
};

export default function SchedulePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Headline as="h1" size="h1" className="mb-8 md:mb-16 text-center">
        Class Schedule
      </Headline>
      <Schedule />
    </div>
  );
}
