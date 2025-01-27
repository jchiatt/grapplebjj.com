import { Metadata } from "next";
import { CallToAction } from "@/components/ui/call-to-action";
import Image from "next/image";
import { Event, upcomingEvents } from "@/data/events";
import { CalendarDays, Clock, MapPin, Users, Tag } from "lucide-react";
import { Headline } from "@/components/ui/headline";

export const metadata: Metadata = {
  title: "Events | Grapple",
  description: "Upcoming events, tournaments, and seminars at Grapple.",
};

function formatTime(isoString: string) {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Chicago",
    timeZoneName: "short",
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

function EventCard({ event }: { event: Event }) {
  const eventDate = new Date(event.date + "T00:00:00-06:00");
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  });

  const timeString = event.time.end
    ? `${formatTime(event.time.start)} - ${formatTime(event.time.end)}`
    : formatTime(event.time.start);

  const isPayWhatYouWant =
    !("type" in event.price) && isPriceStillPayWhatYouWant(event.price);
  const payWhatYouWantEndsDate =
    !("type" in event.price) && event.price.payWhatYouWant?.availableUntil
      ? new Date(event.price.payWhatYouWant.availableUntil)
      : null;
  const hasRegularPrice =
    !("type" in event.price) &&
    event.price.amount &&
    event.price.payWhatYouWant?.availableUntil;

  return (
    <div
      className={`rounded-2xl overflow-hidden bg-secondary ${
        event.featured
          ? "lg:grid lg:grid-cols-[0.5fr_1fr] lg:gap-8 lg:min-h-[525px]"
          : "grid grid-rows-[1fr_auto]"
      }`}
    >
      <div
        className={`relative ${
          event.featured ? "lg:aspect-auto aspect-[3/4]" : "aspect-[3/4]"
        }`}
      >
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-center gap-2 text-sm text-foreground/60">
          <CalendarDays className="h-4 w-4" />
          <time dateTime={event.date}>{formattedDate}</time>
        </div>

        <h3 className="mt-2 text-2xl font-semibold">{event.title}</h3>

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
              <div>{event.location.name}</div>
              {event.location.address && event.location.mapsLink && (
                <a
                  href={event.location.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  {event.location.address} &rarr;
                </a>
              )}
              {event.location.instructions && (
                <p className="text-foreground/60 mt-1">
                  {event.location.instructions}
                </p>
              )}
            </div>
          </div>
          {event.capacity && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Limited to {event.capacity} participants</span>
            </div>
          )}
        </div>

        <p className="mt-4 text-foreground/80">{event.description}</p>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-lg font-semibold">
              {formatPrice(event.price)}
            </span>
            {!("type" in event.price) && event.price.description && (
              <p className="text-sm text-foreground/60">
                {event.price.description}
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
                    {"type" in event.price ? 0 : event.price.amount}
                  </p>
                )}
              </div>
            )}
          </div>
          <a
            href={event.ctaLink}
            className="w-full sm:w-auto text-center rounded-lg px-6 py-3 text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            {event.ctaText}
          </a>
        </div>

        {event.registrationDeadline && (
          <p className="mt-4 text-sm text-foreground/60">
            Registration closes{" "}
            {new Date(event.registrationDeadline).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}

export default function EventsPage() {
  const featuredEvents = upcomingEvents.filter((event) => event.featured);
  const regularEvents = upcomingEvents.filter((event) => !event.featured);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <Headline as="h1" size="h1">
          Upcoming Events
        </Headline>
        <p className="mt-4 text-xl text-foreground/80">
          Join us for tournaments, seminars, and special events
        </p>
      </div>

      <div className="mt-16 space-y-12">
        {featuredEvents.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-8">Featured Events</h2>
            <div className="grid gap-8">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {regularEvents.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-8">More Events</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {regularEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}
      </div>

      {upcomingEvents.length === 0 && (
        <div className="text-center mt-16">
          <p className="text-xl text-foreground/60">
            No upcoming events at this time.
          </p>
        </div>
      )}

      <div className="mt-16 md:mt-24">
        <CallToAction
          title="Want to host an event?"
          description="Get in touch to discuss hosting your tournament or seminar with Grapple."
          primaryAction={{
            label: "Contact Us",
            href: "/contact",
          }}
        />
      </div>
    </div>
  );
}
