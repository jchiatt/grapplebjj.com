import { Metadata } from "next";
import { CallToAction } from "@/components/ui/call-to-action";
import { Headline } from "@/components/ui/headline";
import { Check, Mail, Phone, Globe, Users, MapPin, TrendingUp } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Become a Sponsor | Grapple Jiu Jitsu",
  description:
    "Partner with Grapple Jiu Jitsu and Grapple Nights. Put your brand in front of a committed and passionate audience interested in improving their health, fitness, and minds.",
};

const singleEventBenefits = [
  "Shoutout during the event livestream",
  "Social media shoutout for the event",
  "Logo on event promotional materials",
  "Sponsor booth options are available",
];

const silverBenefits = [
  "Listed on Grapple Jiu Jitsu and Grapple Nights websites",
  "In-gym flyers allowed",
  "Twice monthly shoutout on Grapple & Grapple Nights livestreams",
  "Monthly social shoutout across Grapple channels",
  "80% off for all your employees",
  "Logo visibility and mention at all Grapple Nights events. 4 free tickets to all events.",
];

const goldBenefits = [
  "All Silver benefits",
  "In-gym banner",
  "Weekly shoutout on Grapple & Grapple Nights livestreams",
  "Twice monthly social shoutouts across Grapple channels",
  "10 free memberships for your employees, 80% off for others",
  "Up to 30 second ad placement at all Grapple Nights events. 8 free tickets to all events.",
];

const premierBenefits = [
  "All Silver & Gold benefits",
  "Prime in-gym banner placement",
  "30 second ad read on every Grapple & Grapple Nights livestream",
  "10 Charity memberships",
  "20 free employee memberships + 80% off",
  "Weekly social shoutouts + custom collaborations across Grapple channels",
  "30 second ad placement or owner pitch at all Grapple Nights events. 10 free tickets.",
];

const stats = [
  { icon: Users, label: "Local Event Attendees", value: "100+" },
  { icon: Users, label: "Age Range", value: "15–45 Years" },
  { icon: MapPin, label: "Location", value: "1576 Old Fannin Rd." },
  { icon: TrendingUp, label: "Monthly Social Impressions", value: "50K+" },
];

const jiuJitsuPoints = [
  "Emphasizes control by using leverage, balance, and weight distribution.",
  "Helps level the playing field between smaller, weaker people and larger, athletic people.",
  "Builds tremendous confidence, especially in children and abuse survivors.",
  "Deeply promotes mental health and camaraderie.",
];

const whyPartnerPoints = [
  "Kids are safer from bullying.",
  "Law enforcement has more control in hard situations.",
  "People struggling with stress or mental health have an outlet and a tribe.",
  "Training in violence actually helps prevent violent situations from forming.",
  "It's a great way to have fun and keep fit, while learning a real skill!",
];

function TierCard({
  title,
  description,
  benefits,
  highlighted = false,
  badge,
}: {
  title: string;
  description: string;
  benefits: string[];
  highlighted?: boolean;
  badge?: string;
}) {
  return (
    <div
      className={`rounded-2xl relative p-8 flex flex-col ${
        highlighted
          ? "bg-primary text-white ring-2 ring-primary"
          : "bg-secondary"
      }`}
    >
      {badge && (
        <span
          className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${
            highlighted
              ? "bg-white text-primary"
              : "bg-primary text-white"
          }`}
        >
          {badge}
        </span>
      )}
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm opacity-80">{description}</p>
      <ul className="mt-6 space-y-3 flex-1">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-start">
            <svg
              className="h-5 w-5 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-3">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SponsorsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center">
        <Headline as="h1" size="h1" className="mb-4 md:mb-8">
          Partner with Grapple
        </Headline>
        <p className="mt-4 max-w-3xl mx-auto text-xl text-muted-foreground">
          Join our mission to grow the grappling community. Your partnership with
          Grapple Jiu Jitsu puts your brand in front of a committed and
          passionate audience interested in improving their health, fitness, and
          minds.
        </p>
      </div>

      {/* About Grapple */}
      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center">About Grapple Jiu Jitsu</h2>
        <p className="mt-4 max-w-3xl mx-auto text-center text-lg text-muted-foreground">
          At Grapple Jiu Jitsu, we believe in the transformative power of
          submission grappling. Our mission is to create an inclusive environment
          where individuals can develop their skills, build confidence, and become
          part of a supportive community.{" "}
          <Link
            href="https://grapplenights.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Grapple Nights
          </Link>{" "}
          is our competitive events series that brings the community together.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border bg-card p-6 text-center text-card-foreground"
            >
              <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What is Jiu Jitsu? */}
      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center">What is Jiu Jitsu?</h2>
        <p className="mt-4 text-center text-lg text-muted-foreground">
          Jiu jitsu is a form of submission grappling that:
        </p>
        <div className="mt-12 max-w-3xl mx-auto grid gap-12 md:gap-16">
          {jiuJitsuPoints.map((point, index) => (
            <div
              key={index}
              className="grid md:grid-cols-[1fr,10fr] gap-8 items-start"
            >
              <div className="text-4xl font-bold text-primary">
                {(index + 1).toString().padStart(2, "0")}
              </div>
              <p className="text-lg text-muted-foreground">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Partner with Us? */}
      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center">Why Partner with Us?</h2>
        <p className="mt-4 text-center text-lg text-muted-foreground">
          Because jiu jitsu changes lives and promotes a healthier and safer
          community.
        </p>
        <div className="mt-12 bg-secondary rounded-2xl p-8">
          <ul className="space-y-4">
            {whyPartnerPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-lg">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sponsorship Tiers */}
      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center">Sponsorship Tiers</h2>
        <p className="mt-4 text-center text-lg text-muted-foreground">
          Choose the partnership level that&apos;s right for your business.
        </p>

        {/* Single Event - Full Width */}
        <div className="mt-12 flex justify-center">
          <div className="w-full max-w-md">
            <TierCard
              title="Single Event"
              description="Support a single Grapple Nights event."
              benefits={singleEventBenefits}
            />
          </div>
        </div>

        {/* Main Sponsorship Tiers */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <TierCard
            title="Silver Sponsor"
            description="Partner with Grapple Jiu Jitsu and extend your reach beyond the event day."
            benefits={silverBenefits}
          />
          <TierCard
            title="Gold Sponsor"
            description="Partner with Grapple Jiu Jitsu and extend your reach beyond the event day."
            benefits={goldBenefits}
            highlighted
            badge="Popular"
          />
          <TierCard
            title="Premier Sponsor"
            description="Become Grapple Jiu Jitsu's prime partner and be a force for grappling in our community."
            benefits={premierBenefits}
            badge="1 Available"
          />
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-24 text-center">
        <h2 className="text-3xl font-bold">Be a Force for Good</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Grappling promotes fitness, builds confidence, discourages violence, and
          changes lives. Partner with us to be a force for good in our community.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="mailto:info@grapplebjj.com"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="h-5 w-5" /> info@grapplebjj.com
          </a>
          <a
            href="tel:7692570260"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-5 w-5" /> (769) 257-0260
          </a>
          <a
            href="https://www.grapplejiujitsu.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Globe className="h-5 w-5" /> www.grapplejiujitsu.com
          </a>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 md:mt-24">
        <CallToAction
          title="Ready to partner with us?"
          description="Get in touch and let's discuss how we can work together to grow the grappling community."
          primaryAction={{
            label: "Contact Us",
            href: "/contact",
          }}
        />
      </div>
    </div>
  );
}
