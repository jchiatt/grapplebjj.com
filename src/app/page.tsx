import { Hero } from "@/components/hero/hero";
import { FeaturedVideos } from "@/components/videos/featured-videos";
import { Testimonials } from "@/components/testimonials/testimonials";
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
            <Link
              key={feature.title}
              href={feature.link}
              className="group rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-colors hover:bg-primary"
            >
              <h3 className="mb-2 font-heading text-lg font-semibold">
                {feature.title}
              </h3>
              <p className="text-muted-foreground group-hover:text-black dark:group-hover:text-white">
                {feature.description}
              </p>
              <span className="mt-4 inline-flex items-center text-sm text-primary dark:group-hover:text-white group-hover:text-black">
                Get Started →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Testimonials />

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
    title: "Build Confidence",
    description:
      "Feel unsure of yourself? Grappling is a great way to build confidence and keep a steady head in difficult situations.",
    link: "/trial",
  },
  {
    title: "Self-Defense",
    description:
      "Learn practical self-defense skills that could save your life if you're ever forced to defend yourself.",
    link: "/trial",
  },
  {
    title: "Sharpen Your Mind",
    description:
      "Jiu jitsu is a cerebral art that combines strategy, problem-solving, and physical chess. Engage and sharpen your mind while getting fit.",
    link: "/trial",
  },
  {
    title: "Get Fit Safely",
    description:
      "Looking to lose a few pounds? Jiu jitsu provides a safe, fun, and engaging way to get in the best shape of your life.",
    link: "/trial",
  },
  {
    title: "Join a Culture of Growth",
    description:
      "Surround yourself with people who are serious about self-improvement and push each other to reach new heights every day.",
    link: "/trial",
  },
  {
    title: "Build Character",
    description:
      "The mats teach invaluable life lessons through humility and perseverance. Develop mental fortitude that extends far beyond training.",
    link: "/trial",
  },
];
