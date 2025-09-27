import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { upcomingEvents } from "@/data/events";

type EventParams = {
  params: Promise<{
    eventId: string;
  }>;
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

function isPriceStillPayWhatYouWant(price: (typeof upcomingEvents)[number]["price"]): boolean {
  if ("type" in price || !price.payWhatYouWant?.enabled) return false;
  if (!price.payWhatYouWant.availableUntil) return true;
  return new Date(price.payWhatYouWant.availableUntil) > new Date();
}

function formatPrice(price: (typeof upcomingEvents)[number]["price"]): string {
  if ("type" in price) return "Free";

  if (isPriceStillPayWhatYouWant(price)) {
    if (price.payWhatYouWant?.minimumAmount) {
      return `Pay What You Want (Min. $${price.payWhatYouWant.minimumAmount})`;
    }
    if (price.payWhatYouWant?.suggestedAmount) {
      return `Pay What You Want (Suggested $${price.payWhatYouWant.suggestedAmount})`;
    }
    return "Pay What You Want";
  }

  return price.amount ? `$${price.amount}` : "";
}

export function generateStaticParams() {
  return upcomingEvents.map((event) => ({ eventId: event.id }));
}

export async function generateMetadata({ params }: EventParams): Promise<Metadata> {
  const { eventId } = await params;
  const event = upcomingEvents.find((item) => item.id === eventId);

  if (!event) {
    return {};
  }

  return {
    title: `${event.title} | Grapple Events`,
    description: event.description,
    openGraph: {
      title: `${event.title} | Grapple Events`,
      description: event.description,
      url: `https://grapplejj.com/events/${eventId}`,
      images: [
        {
          url: event.imageUrl,
          width: 1200,
          height: 630,
          alt: `${event.title} promo photo`,
        },
      ],
    },
  };
}

export default async function EventDetailPage({ params }: EventParams) {
  const { eventId } = await params;
  const event = upcomingEvents.find((item) => item.id === eventId);

  if (!event) {
    notFound();
  }

  const eventDate = new Date(`${event.date}T00:00:00-06:00`);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  });

  const timeString = event.time.end
    ? `${formatTime(event.time.start)} – ${formatTime(event.time.end)}`
    : formatTime(event.time.start);

  const priceLabel = formatPrice(event.price);
  const descriptionParagraphs = event.longDescription?.length
    ? event.longDescription
    : [event.description];

  return (
    <main className="bg-background text-foreground">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={event.imageUrl}
            alt={`${event.title} hero`}
            fill
            className="object-cover object-center opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 sm:px-8 lg:flex-row lg:items-end lg:gap-16 lg:py-32">
          <div className="max-w-2xl space-y-6 text-white">
            <span className="inline-flex items-center rounded-full bg-primary/80 px-3 py-1 text-sm font-medium tracking-wide uppercase">
              {event.category === "seminar" ? "Seminar" : "Event"}
            </span>
            <h1 className="text-4xl font-semibold sm:text-5xl lg:text-6xl">{event.title}</h1>
            <p className="text-lg text-white/80 sm:text-xl">{event.description}</p>
            <div className="grid gap-4 text-sm font-medium text-white/90 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Date &amp; Time</p>
                <p className="mt-2 text-base text-white">
                  {formattedDate}
                  <br />
                  {timeString}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Location</p>
                <p className="mt-2 text-base text-white">{event.location.name}</p>
                {event.location.address && event.location.mapsLink && (
                  <Link
                    href={event.location.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex text-sm text-primary transition-colors hover:text-primary/80"
                  >
                    {event.location.address}
                  </Link>
                )}
                {event.location.instructions && (
                  <p className="mt-2 text-xs text-white/60">{event.location.instructions}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={event.ctaLink}
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {event.ctaText}
              </Link>
              <p className="text-sm text-white/70">
                {priceLabel}
                {event.capacity ? ` · Limited to ${event.capacity} spots` : null}
              </p>
            </div>
          </div>

          <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-white/10 bg-black/30 shadow-2xl backdrop-blur md:h-[500px] lg:w-[380px]">
            <Image
              src={event.imageUrl}
              alt={`${event.title} feature image`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 space-y-3 text-white">
              <div className="text-xs uppercase tracking-[0.2em] text-white/60">Event Snapshot</div>
              <ul className="space-y-2 text-sm text-white/90">
                <li>{formattedDate}</li>
                <li>{timeString}</li>
                <li>{event.location.name}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <article className="space-y-6 text-white/80 sm:text-lg">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Event Description</h2>
            {descriptionParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed sm:text-lg">
                {paragraph}
              </p>
            ))}
          </article>

          <aside className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/85 backdrop-blur">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Event Essentials</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium text-white/90">Date:</span> {formattedDate}
                </p>
                <p>
                  <span className="font-medium text-white/90">Time:</span> {timeString}
                </p>
                <p>
                  <span className="font-medium text-white/90">Venue:</span> {event.location.name}
                </p>
                {event.location.address && (
                  <p className="text-white/70">{event.location.address}</p>
                )}
                {event.location.instructions && (
                  <p className="text-xs text-white/50">{event.location.instructions}</p>
                )}
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Pricing &amp; Registration</h3>
              <p className="text-sm text-white/80">{priceLabel}</p>
              {!("type" in event.price) && event.price.description && (
                <p className="text-sm text-white/60">{event.price.description}</p>
              )}
              <Link
                href={event.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                {event.ctaText}
              </Link>
              {event.capacity && (
                <p className="text-xs text-white/60">Limited to {event.capacity} participants.</p>
              )}
            </div>
          </aside>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-background/80">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-12 text-center text-white/70 sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-semibold text-white">Grapple Jiu Jitsu</p>
            <p className="text-sm text-white/60">Pearl, Mississippi</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/contact" className="transition hover:text-white">
              Contact
            </Link>
            <Link href="/schedule" className="transition hover:text-white">
              Schedule
            </Link>
            <Link href="/trial" className="transition hover:text-white">
              Free Trial
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
