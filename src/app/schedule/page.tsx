import { Schedule } from "@/components/schedule/schedule";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Class Schedule | Grapple",
  description:
    "View our class schedule and book your next training session at Grapple.",
};

export default function SchedulePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Class Schedule</h1>
      <Schedule />
    </main>
  );
}
