import { Hero } from "@/components/hero/hero";
import { FeaturedVideos } from "@/components/videos/featured-videos";
import Link from "next/link";
import { getFeaturedVideos } from "@/lib/youtube";

export const revalidate = 3600; // Revalidate every hour

async function getVideos() {
  try {
    return await getFeaturedVideos();
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    return [];
  }
}

export default async function Home() {
  const videos = await getVideos();

  return (
    <div>
      <Hero />

      {/* Features Section */}
      <section className="container py-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-colors hover:bg-accent/10"
            >
              <h3 className="mb-2 font-heading text-lg font-semibold">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
              <Link
                href={feature.link}
                className="mt-4 inline-flex items-center text-sm text-primary hover:text-primary/80"
              >
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <FeaturedVideos initialVideos={videos} />

      {/* CTA Section */}
      <section className="container pb-24">
        <div className="rounded-lg bg-accent/10 p-8 text-center">
          <h2 className="mb-4 font-heading text-2xl font-bold">
            Ready to Start Your Journey?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
            Join our community of dedicated practitioners and start your BJJ
            journey today.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Start Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Adult Programs",
    description:
      "Comprehensive BJJ training for all skill levels, with both Gi and No-Gi classes available.",
    link: "/programs/adult",
  },
  {
    title: "Kids Programs",
    description:
      "Age-appropriate classes that teach discipline, respect, and self-defense in a fun environment.",
    link: "/programs/kids",
  },
  {
    title: "Competition Team",
    description:
      "Join our competition team and represent Grapple BJJ at local and international tournaments.",
    link: "/competition",
  },
];
