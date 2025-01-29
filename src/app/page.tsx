import { Hero } from "@/components/hero/hero";
import { FeaturedVideos } from "@/components/videos/featured-videos";
import { Testimonials } from "@/components/testimonials/testimonials";
import { FeaturedPhotos } from "@/components/photos/featured-photos";
import { FullWidthSection } from "@/components/ui/full-width-section";
import { SlotMachineText } from "@/components/animations/slot-machine-text";
import { CoachProfiles } from "@/components/coaches/coach-profiles";
import { NextEvent } from "@/components/events/next-event";
import Link from "next/link";
import { getFeaturedVideos } from "@/lib/youtube";
import { CallToAction } from "@/components/ui/call-to-action";
import { FloatingMetrics } from "@/components/metrics/floating-metrics";
import { Suspense } from "react";

export const revalidate = 86400; // Revalidate every day

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

      {/* Welcome Video Section */}
      <FullWidthSection className="py-24">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            Welcome to Grapple
          </h2>
          <div className="aspect-video w-full max-w-3xl mx-auto">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/ZDCj1HWKyyQ?si=yJpzCYzynIdxs2tp"
              title="Welcome to Grapple"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </FullWidthSection>

      <FeaturedPhotos title="" />

      <FeaturedVideos initialVideos={videos} />

      {/* Growth Metrics Section */}
      <FullWidthSection className="py-24">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="max-w-4xl mx-auto bg-gradient-to-r from-primary via-black to-primary dark:from-primary dark:via-white dark:to-primary bg-clip-text text-4xl md:text-6xl lg:text-7xl font-bold text-transparent pb-8 text-center">
            We take transparency seriously
          </h2>
          <p className="text-center text-lg text-foreground mb-16">
            We believe in transparency and learning and building in public. To
            prove it, here&apos;s our business financials and growth metrics.
            Yes, really!
          </p>
        </div>
        <Suspense fallback={null}>
          <div className="max-w-md mx-auto">
            <FloatingMetrics />
          </div>
        </Suspense>
      </FullWidthSection>

      {/* Features Section */}
      <FullWidthSection className="py-24">
        <h2 className="max-w-4xl mx-auto bg-gradient-to-r from-primary via-black to-primary dark:from-primary dark:via-white dark:to-primary bg-clip-text text-4xl md:text-6xl lg:text-7xl font-bold text-transparent pb-8 text-center">
          Why Grapple?
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.link}
              className="group rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-colors hover:bg-primary"
            >
              <h3 className="mb-2 font-heading text-lg font-semibold text-primary group-hover:text-white">
                {feature.title}
              </h3>
              <p className="text-black dark:text-white group-hover:text-black dark:group-hover:text-white">
                {feature.description}
              </p>
              <span className="mt-4 inline-flex items-center text-sm text-primary dark:group-hover:text-white group-hover:text-black">
                Get Started →
              </span>
            </Link>
          ))}
        </div>
      </FullWidthSection>

      {/* Who We Serve Section */}
      <FullWidthSection className="bg-primary dark:bg-primary/20 backdrop-blur-sm py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            Grapple is for <br />
            <SlotMachineText />
          </h2>
          <p className="text-xl text-white/90 mb-16">
            If you&apos;re looking to build confidence, learn self-defense, get
            fit, or simply challenge yourself with something new, we&apos;d love
            to have you. If you want to learn and grow, we&apos;re here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {audiences.map((audience) => (
            <Link
              key={audience.title}
              href={audience.link}
              className="group relative overflow-hidden rounded-lg bg-black/50 backdrop-blur-sm p-6 transition-all hover:bg-black/40"
            >
              <div className="relative z-10">
                <h3 className="font-heading text-lg font-semibold mb-2 text-white">
                  For {audience.title}
                </h3>
                <p className="text-sm text-white/90 group-hover:text-white transition-colors mb-4">
                  {audience.description}
                </p>
                <span className="text-sm text-white/90 group-hover:text-white inline-flex items-center">
                  Learn More{" "}
                  <span className="ml-1 transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </div>
              <div className="absolute inset-0 bg-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </FullWidthSection>

      <div className="container mx-auto px-4 py-24">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Next Event at Grapple
        </h2>
        <NextEvent />
      </div>

      {/* Coach Profiles */}
      <CoachProfiles />

      <Testimonials />

      <div className="py-24">
        <CallToAction
          title="Ready to Start Your Journey?"
          description="Join our community of dedicated practitioners and start your jiu jitsu journey today."
          primaryAction={{
            label: "Start Free Trial",
            href: "/trial",
          }}
        />
      </div>
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

const audiences = [
  {
    title: "Kids (Coming Soon)",
    description:
      "Build confidence, discipline, and healthy habits from an early age.",
    link: "/kids",
  },
  {
    title: "Adults",
    description:
      "Challenge yourself, get fit, and join a community of lifelong learners.",
    link: "/trial",
  },
  {
    title: "Military & Law Enforcement",
    description:
      "Enhance your tactical skills with proven grappling techniques. And at Grapple, you can pay whatever you can afford, even if it's $0.",
    link: "/trial",
  },
  {
    title: "Healthcare Workers",
    description: `Learn practical skills for managing challenging situations safely. And medical professionals working in a hospital can take advantage of our "pay what you want" discount`,
    link: "/trial",
  },
  {
    title: "Competitors",
    description:
      "Train with others who are dedicated to improving and prepare for tournaments.",
    link: "/trial",
  },
  {
    title: "Hobbyists",
    description:
      "Enjoy the art of grappling at your own pace in a supportive environment.",
    link: "/trial",
  },
];
