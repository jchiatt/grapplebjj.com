"use client";

import { Event, upcomingEvents } from "@/data/events";
import { CalendarDays, Clock, MapPin, Users, Tag } from "lucide-react";
import Image from "next/image";

function formatTime(isoString: string) {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Chicago",
    timeZoneName: "short",
  });
}

function formatDate(dateString: string) {
  return new Date(dateString + "T00:00:00-06:00").toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  });
}

function isPriceStillPayWhatYouWant(price: Event["price"]): boolean {
  if ("type" in price || !price.payWhatYouWant?.enabled) return false;
  if (!price.payWhatYouWant.availableUntil) return true;
  return new Date(price.payWhatYouWant.availableUntil) > new Date();
}

function formatPrice(price: Event["price"]): string {
  if ("type" in price) return "Free";

  const isPayWhatYouWant = isPriceStillPayWhatYouWant(price);
  if (isPayWhatYouWant) {
    if (price.payWhatYouWant?.minimumAmount) {
      return `Pay What You Want (Min. $${price.payWhatYouWant.minimumAmount})`;
    }
    if (price.payWhatYouWant?.suggestedAmount) {
      return `Pay What You Want (Suggested $${price.payWhatYouWant.suggestedAmount})`;
    }
    return "Pay What You Want";
  }

  return `$${price.amount}`;
}

function getNextEvent(): Event | null {
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

export function NextEvent() {
  const nextEvent = getNextEvent();

  if (!nextEvent) return null;

  const timeString = nextEvent.time.end
    ? `${formatTime(nextEvent.time.start)} - ${formatTime(nextEvent.time.end)}`
    : formatTime(nextEvent.time.start);

  const isPayWhatYouWant =
    !("type" in nextEvent.price) && isPriceStillPayWhatYouWant(nextEvent.price);
  const payWhatYouWantEndsDate =
    !("type" in nextEvent.price) &&
    nextEvent.price.payWhatYouWant?.availableUntil
      ? new Date(nextEvent.price.payWhatYouWant.availableUntil)
      : null;
  const hasRegularPrice =
    !("type" in nextEvent.price) &&
    nextEvent.price.amount &&
    nextEvent.price.payWhatYouWant?.availableUntil;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-secondary">
      <div className="lg:grid lg:grid-cols-[0.75fr_1fr]">
        <div className="relative aspect-[4/3] lg:aspect-auto">
          <Image
            src={nextEvent.imageUrl}
            alt={nextEvent.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
            {nextEvent.category.charAt(0).toUpperCase() +
              nextEvent.category.slice(1)}
          </div>
        </div>
        <div className="p-8 lg:p-12">
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-foreground/60">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={nextEvent.date}>
                  {formatDate(nextEvent.date)}
                </time>
              </div>

              <h2 className="mt-4 text-2xl font-semibold">{nextEvent.title}</h2>

              <div className="mt-4 space-y-2 text-sm text-foreground/80">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{timeString}</span>
                </div>
                {isPayWhatYouWant && (
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <span className="text-primary font-medium">
                      Pay What You Want
                    </span>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1" />
                  <div>
                    <div>{nextEvent.location.name}</div>
                    {nextEvent.location.address &&
                      nextEvent.location.mapsLink && (
                        <a
                          href={nextEvent.location.mapsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          {nextEvent.location.address} &rarr;
                        </a>
                      )}
                    {nextEvent.location.instructions && (
                      <p className="text-foreground/60 mt-1">
                        {nextEvent.location.instructions}
                      </p>
                    )}
                  </div>
                </div>
                {nextEvent.capacity && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Limited to {nextEvent.capacity} participants</span>
                  </div>
                )}
              </div>

              <p className="mt-4 text-foreground/80">{nextEvent.description}</p>

              <div className="mt-6">
                <span className="text-lg font-semibold block">
                  {formatPrice(nextEvent.price)}
                </span>
                {!("type" in nextEvent.price) &&
                  nextEvent.price.description && (
                    <p className="text-sm text-foreground/60">
                      {nextEvent.price.description}
                    </p>
                  )}
                {isPayWhatYouWant && payWhatYouWantEndsDate && (
                  <div className="text-sm text-foreground/60">
                    <p>
                      Pay what you want ends{" "}
                      {payWhatYouWantEndsDate.toLocaleDateString()}
                    </p>
                    {hasRegularPrice && (
                      <p className="mt-1">
                        Regular price after deadline: $
                        {"type" in nextEvent.price ? 0 : nextEvent.price.amount}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <a
                href={nextEvent.ctaLink}
                className="inline-block rounded-lg px-6 py-3 text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {nextEvent.ctaText}
              </a>
            </div>

            {nextEvent.registrationDeadline && (
              <p className="mt-4 text-sm text-foreground/60">
                Registration closes{" "}
                {new Date(nextEvent.registrationDeadline).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
