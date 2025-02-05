"use client";

import { useMemo } from "react";
import schedule from "@/data/schedule.json";
import { useLiveStream } from "../livestream/livestream-context";
import { LiveStreamStatus } from "@/lib/youtube";
import { CallToAction } from "../ui/call-to-action";

type DaySchedule = {
  start: string;
  end: string;
  class: string;
  liveStreamed?: boolean;
};

type WeekSchedule = {
  [key: string]: DaySchedule[];
};

const DAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

type Day = (typeof DAYS)[number];

function formatTime(time: string): string {
  if (time === "until") {
    return "Until";
  }

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

function getSortedDays(currentDay: number): Day[] {
  return [...DAYS.slice(currentDay), ...DAYS.slice(0, currentDay)];
}

export function Schedule() {
  const { liveStatus } = useLiveStream();

  const today = useMemo(() => {
    return DAYS[new Date().getDay()];
  }, []);

  const sortedDays = useMemo(() => {
    return getSortedDays(new Date().getDay());
  }, []);

  return (
    <div className="space-y-12">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Mobile: Show sorted days */}
        {sortedDays.map((day) => (
          <div
            key={day}
            className={`md:hidden rounded-lg border-2 p-4 shadow-sm ${
              day === today
                ? "border-primary bg-primary/5"
                : "border-secondary-foreground/20 dark:border-secondary-foreground"
            }`}
          >
            <h2 className="mb-4 text-lg font-semibold capitalize">{day}</h2>
            <div className="space-y-3">
              {(schedule as WeekSchedule)[day].map((slot, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {formatTime(slot.start)} - {formatTime(slot.end)}
                    </span>
                    {slot.liveStreamed && (
                      <LiveStreamStatusIndicator
                        liveStatus={liveStatus}
                        today={day === today}
                      />
                    )}
                  </div>
                  <p className="text-sm text-secondary-foreground/80">
                    {slot.class}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Desktop: Show regular order */}
        {DAYS.map((day) => (
          <div
            key={`desktop-${day}`}
            className={`hidden md:block rounded-lg border-2 p-4 shadow-sm ${
              day === today
                ? "border-primary bg-primary/5"
                : "border-secondary-foreground/20 dark:border-secondary-foreground"
            }`}
          >
            <h2 className="mb-4 text-lg font-semibold capitalize">{day}</h2>
            <div className="space-y-3">
              {(schedule as WeekSchedule)[day].map((slot, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {formatTime(slot.start)} - {formatTime(slot.end)}
                    </span>
                    {slot.liveStreamed && (
                      <LiveStreamStatusIndicator
                        liveStatus={liveStatus}
                        today={day === today}
                      />
                    )}
                  </div>
                  <p className="text-sm text-secondary-foreground/80">
                    {slot.class}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 md:mt-24">
        <CallToAction
          title="Ready to Grapple?"
          description="Jiu jitsu is a great way to get fit, challenge yourself, conquer fears, and engage your mind."
          primaryAction={{
            label: "Trial Class",
            href: "/trial",
          }}
          secondaryAction={{
            label: "FAQ",
            href: "/faq",
          }}
        />
      </div>
    </div>
  );
}

function LiveStreamStatusIndicator({
  liveStatus = null,
  today = false,
}: {
  liveStatus: LiveStreamStatus | null;
  today: boolean;
}) {
  if (!liveStatus) return null;

  return (
    <span className="rounded bg-red-500 px-1.5 py-0.5 text-xs text-white">
      {liveStatus?.isLive && today ? (
        <a
          href={liveStatus.streamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
          </span>
          Live Now! &rarr;
        </a>
      ) : (
        <span>Streamed Live</span>
      )}
    </span>
  );
}
