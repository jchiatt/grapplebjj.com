import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="font-heading text-4xl font-bold">
          Welcome to Grapple BJJ
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Train with the best Brazilian Jiu-Jitsu academy in town. Whether
          you&apos;re a beginner or an experienced grappler, we have programs
          for all levels.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/schedule"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            View Schedule
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-colors hover:bg-accent/10"
          >
            <h3 className="font-heading text-lg font-semibold mb-2">
              {feature.title}
            </h3>
            <p className="text-muted-foreground">{feature.description}</p>
            <Link
              href={feature.link}
              className="inline-flex items-center text-sm mt-4 text-primary hover:text-primary/80"
            >
              Learn more →
            </Link>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="text-center bg-accent/10 rounded-lg p-8 mt-12">
        <h2 className="font-heading text-2xl font-bold mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Join our community of dedicated practitioners and start your BJJ
          journey today.
        </p>
        <Link
          href="/join"
          className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Start Free Trial
        </Link>
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
