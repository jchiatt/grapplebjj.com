import schedule from "@/components/schedule/schedule.json";

export const DAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

export type Day = (typeof DAYS)[number];

export type DaySchedule = {
  start: string;
  end: string;
  class: string;
  liveStreamed?: boolean;
};

export type WeekSchedule = {
  [key in Day]: DaySchedule[];
};

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));
  return date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();
}

export function getNextLiveStreamedClass(): {
  day: Day;
  class: DaySchedule;
} | null {
  const now = new Date();
  const currentDay = now.getDay();
  const currentTime = now.getHours() * 100 + now.getMinutes();

  // Check remaining classes today and next 6 days
  for (let offset = 0; offset < 7; offset++) {
    const checkDay = (currentDay + offset) % 7;
    const dayName = DAYS[checkDay];
    const isToday = offset === 0;

    const daySchedule = (schedule as WeekSchedule)[dayName];

    for (const classInfo of daySchedule) {
      if (!classInfo.liveStreamed) continue;

      const [hours, minutes] = classInfo.start.split(":");
      const classTime = parseInt(hours) * 100 + parseInt(minutes);

      // If it's today, only include future classes
      if (isToday && classTime <= currentTime) continue;

      return {
        day: dayName,
        class: classInfo,
      };
    }
  }

  return null;
}
