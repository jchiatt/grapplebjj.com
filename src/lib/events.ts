import { Event, upcomingEvents } from "@/data/events";

export function getNextEvent(): Event | null {
  if (upcomingEvents.length === 0) return null;

  const now = new Date();
  return (
    upcomingEvents
      .filter((event) => new Date(event.date) >= now)
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )[0] || null
  );
}
