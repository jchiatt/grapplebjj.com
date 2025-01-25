import { Metadata } from "next";
import { CallToAction } from "@/components/ui/call-to-action";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Grapple",
  description:
    "Learn about our mission, values, and the team behind Grapple Jiu Jitsu.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold">About Grapple</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Building a community through the art of submission grappling
        </p>
      </div>

      {/* Mission Section */}
      <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        <div className="relative aspect-[4/3] lg:aspect-[3/4]">
          <Image
            src="/images/ancient-grapplers.jpeg"
            alt="Ancient grapplers depicted in art"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            At Grapple, we believe in the transformative power of submission
            grappling. Our mission is to create an inclusive environment where
            individuals can develop their skills, build confidence, and become
            part of a supportive community.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            We focus on technical excellence, continuous learning, and fostering
            a positive training atmosphere where everyone—regardless of their
            experience level—can thrive.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center">Our Values</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-lg border bg-card p-8 text-card-foreground"
            >
              <h3 className="text-xl font-semibold">{value.title}</h3>
              <p className="mt-2 text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-24">
        <CallToAction
          title="Ready to Join Our Community?"
          description="Experience the art of submission grappling firsthand with a free trial class."
          primaryAction={{
            label: "Start Free Trial",
            href: "/trial",
          }}
        />
      </div>
    </div>
  );
}

const values = [
  {
    title: "Technical Excellence",
    description:
      "We emphasize proper technique and fundamentals, ensuring our students build a strong foundation for long-term growth.",
  },
  {
    title: "Inclusive Community",
    description:
      "Everyone is welcome at Grapple. We foster a supportive environment where students help each other learn and grow.",
  },
  {
    title: "Continuous Learning",
    description:
      "We're always students first. Our commitment to learning keeps us humble and hungry for improvement.",
  },
  {
    title: "Safety First",
    description:
      "Training safely is our top priority. We maintain a controlled environment where students can practice effectively without unnecessary risks.",
  },
  {
    title: "Positive Culture",
    description:
      "We cultivate a positive, ego-free atmosphere where everyone feels comfortable pushing their limits and trying new things.",
  },
  {
    title: "Competition Ready",
    description:
      "For those interested in competition, we provide the training and support needed to compete at any level.",
  },
];
