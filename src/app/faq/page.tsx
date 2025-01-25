import { Metadata } from "next";
import { CallToAction } from "@/components/ui/call-to-action";
import faqs from "@/data/faqs.json";

export const metadata: Metadata = {
  title: "FAQ | Grapple",
  description:
    "Frequently asked questions about training at Grapple, including membership, pricing, and general information about submission grappling / jiu jitsu.",
};

function FAQSection({
  title,
  questions,
}: {
  title: string;
  questions: Array<{ question: string; answer: string }>;
}) {
  return (
    <div className="mt-16 first:mt-0">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <dl className="mt-8 space-y-8">
        {questions.map((faq) => (
          <div key={faq.question} className="bg-secondary rounded-lg p-6">
            <dt className="text-lg font-semibold">{faq.question}</dt>
            <dd className="mt-2 text-gray-700 dark:text-white/90">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        <p className="mt-4 text-xl text-gray-700 dark:text-white/90">
          Everything you need to know about training at Grapple
        </p>
      </div>

      <div className="mt-16">
        <FAQSection title="General Questions" questions={faqs.general} />
        <FAQSection title="Pricing & Membership" questions={faqs.pricing} />
      </div>

      <div className="mt-16 md:mt-24">
        <CallToAction
          title="Still have questions?"
          description="We're here to help! Reach out to us and we'll get back to you as soon as possible."
          primaryAction={{
            label: "Contact Us",
            href: "/contact",
          }}
        />
      </div>
    </div>
  );
}
