import { notFound } from "next/navigation";
import { AdultLandingPage } from "@/components/landing/adult-landing-page";
import {
  getPersonaLanding,
  personaLandingSlugs,
} from "@/data/persona-landing";

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

  return <AdultLandingPage slug={slug} />;
}
