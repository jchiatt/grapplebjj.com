import { Metadata } from "next";
import { CallToAction } from "@/components/ui/call-to-action";
import pricingFaqs from "@/data/faqs.json";
import { Headline } from "@/components/ui/headline";

export const metadata: Metadata = {
  title: "Pricing | Grapple",
  description:
    "Simple, transparent pricing for Grapple classes. Start with a free trial class today.",
};

function PriceCard({
  title,
  price,
  description,
  features,
  cta,
  disclaimer,
  highlighted = false,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  cta: { text: string; href: string };
  disclaimer?: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-8 ${
        highlighted
          ? "bg-primary text-white ring-2 ring-primary"
          : "bg-secondary"
      }`}
    >
      <h3 className="text-2xl font-semibold">{title}</h3>
      <div className="mt-4 flex items-baseline">
        <span className="text-4xl font-bold">{price}</span>
      </div>
      <p className="mt-4 text-sm">{description}</p>
      <ul className="mt-8 space-y-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-start">
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
            <span className="ml-3">{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href={cta.href}
        className={`mt-8 block w-full rounded-lg px-6 py-4 text-center text-sm font-semibold ${
          highlighted
            ? "bg-white text-primary hover:bg-gray-50"
            : "bg-primary text-white hover:bg-primary/90"
        }`}
      >
        {cta.text}
      </a>
      {disclaimer && (
        <p
          className={`mt-4 text-xs text-center ${
            highlighted ? "text-white/80" : "text-muted-foreground"
          }`}
        >
          {disclaimer}
        </p>
      )}
    </div>
  );
}

function DiscountSection() {
  return (
    <div className="bg-secondary rounded-2xl p-8 mt-16">
      <h2 className="text-3xl font-semibold">Special Discounts</h2>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div>
          <h3 className="text-xl font-semibold">🫡 Heroes Discount</h3>
          <p className="mt-2">
            Military, Law Enforcement, First Responders, and Hospital Workers
            are eligible for &quot;pay what you want&quot; pricing.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">👨‍👩‍👦‍👦 Family Discount</h3>
          <p className="mt-2">
            Families receive 30% off for each additional family member after the
            first member pays full price.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">💸 Financial Hardship</h3>
          <p className="mt-2">
            <span className="font-bold">
              We never let anyone go without training purely because of money.
            </span>{" "}
            We have sponsorship opportunities available. Contact us to learn
            more.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  return (
    <div className="mt-16">
      <h2 className="text-3xl font-semibold">Frequently Asked Questions</h2>
      <dl className="mt-8 space-y-8">
        {pricingFaqs.pricing.map((faq) => (
          <div key={faq.question}>
            <dt className="text-lg font-semibold">{faq.question}</dt>
            <dd className="mt-2">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <Headline as="h1" size="h1" className="mb-4 md:mb-8">
          Simple, Transparent Pricing
        </Headline>
        <p className="mt-4 text-xl">
          Start your journey with a free trial class
        </p>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        <PriceCard
          title="Drop-In"
          price="$20"
          description="Perfect for visitors or occasional training"
          features={[
            "Access to all classes",
            "Valid for one day",
            "No commitment or other fees",
            "Bring a friend, get $10 cash",
            "No gear or equipment required",
            "Shower available",
          ]}
          cta={{ text: "Get Started", href: "/drop-in" }}
          disclaimer="Drop-in classes are available to anyone."
        />

        <PriceCard
          title="Free Trial Class"
          price="$0"
          description="Experience a class with no commitment"
          features={[
            "One full class",
            "Safe, fun, and friendly environment",
            "No gear or equipment required",
            "Bring a friend, get $10 cash",
            "Meet the community",
            "Shower available",
          ]}
          cta={{ text: "Schedule Trial", href: "/trial" }}
          highlighted
        />

        <PriceCard
          title="Grapple Membership"
          price="$100"
          description="Unlimited access to all classes."
          features={[
            "All classes included",
            "No contracts or other fees",
            "Shower available",
            "Access to private online learning",
            "Access to special events",
            "Off-schedule access to gym",
          ]}
          cta={{ text: "Join Now", href: "/join" }}
          disclaimer="Focus Fit membership required ($30/month, paid separately to Focus Fit)."
        />
      </div>

      <DiscountSection />
      <FAQ />

      <div className="mt-16 md:mt-24">
        <CallToAction
          title="Ready to start your journey?"
          description="Join us for a free trial class and experience the amazing art of jiu jitsu firsthand."
          primaryAction={{
            label: "Schedule Your Free Trial",
            href: "/contact",
          }}
        />
      </div>
    </div>
  );
}
