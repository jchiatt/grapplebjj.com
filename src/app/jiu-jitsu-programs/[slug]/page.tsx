import Script from "next/script";
import { notFound } from "next/navigation";
import { AdultLandingPage } from "@/components/landing/adult-landing-page";
import {
  getPersonaLanding,
  personaLandingSlugs,
} from "@/data/persona-landing";
import testimonialsData from "@/data/testimonials.json";

export function generateStaticParams() {
  return personaLandingSlugs.map((slug) => ({ slug }));
}

export default async function PersonaLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const persona = getPersonaLanding(slug);

  if (!persona) {
    return notFound();
  }

  const isAdult = persona.slug === "adult-jiu-jitsu";
  const testimonials = (testimonialsData as { testimonials: unknown[] })
    .testimonials;
  const reviewCount = testimonials.length;

  const schema = isAdult
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "LocalBusiness",
            name: "Grapple",
            url: "https://www.grapplebjj.com/jiu-jitsu-programs/adult-jiu-jitsu",
            image: [
              "https://www.grapplebjj.com/images/training_shots/training-1.jpg",
            ],
            telephone: "+1-601-673-4320",
            address: {
              "@type": "PostalAddress",
              streetAddress: "1576 Old Fannin Road Suite D",
              addressLocality: "Brandon",
              addressRegion: "MS",
              postalCode: "39047",
              addressCountry: "US",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5.0",
              reviewCount: String(reviewCount || 1),
              bestRating: "5",
              worstRating: "1",
            },
          },
          {
            "@type": "FAQPage",
            mainEntity: persona.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          },
        ],
      }
    : null;

  return (
    <>
      {schema ? (
        <Script
          id="adult-jiu-jitsu-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ) : null}
      <AdultLandingPage persona={persona} />
    </>
  );
}
