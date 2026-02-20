import { notFound } from "next/navigation";
import { AdultLandingPage } from "@/components/landing/adult-landing-page";
import {
  getPersonaLanding,
  personaLandingSlugs,
} from "@/data/persona-landing";

export function generateStaticParams() {
  return personaLandingSlugs.map((slug) => ({ slug }));
}

export default function PersonaLandingPage({
  params,
}: {
  params: { slug: string };
}) {
  const persona = getPersonaLanding(params.slug);

  if (!persona) {
    return notFound();
  }

  return <AdultLandingPage persona={persona} />;
}
