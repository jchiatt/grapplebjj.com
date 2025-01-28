import { Metadata } from "next";
import { CallToAction } from "@/components/ui/call-to-action";
import { FeaturedPhotos } from "@/components/photos/featured-photos";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Grapple",
  description: "Learn about our mission and values.",
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
            src="/images/training_shots/training-1.jpg"
            alt="Grappling instruction at Grapple."
            fill
            placeholder="blur"
            blurDataURL="/images/training_shots/training-1.jpg"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded-2xl transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 dark:brightness-90 dark:group-hover:brightness-100"
          />
          <div className="absolute inset-0 bg-primary/50 mix-blend-overlay transition-opacity duration-300 opacity-50 group-hover:opacity-100" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Just Grapple.</h2>
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

      {/* Philosophy Section */}
      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center">The Grapple Ethos</h2>
        <div className="mt-12 grid gap-12 md:gap-16">
          {philosophy.map((item, index) => (
            <div
              key={item.title}
              className="grid md:grid-cols-[1fr,2fr] gap-8 items-start"
            >
              <div>
                <div className="text-4xl font-bold text-primary mb-4">
                  {(index + 1).toString().padStart(2, "0")}
                </div>
                <h3 className="text-2xl font-bold">{item.title}</h3>
              </div>
              <p className="text-lg text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <FeaturedPhotos className="mt-24" title="" />

      {/* CTA Section */}
      <div className="mt-16 md:mt-24">
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
      "We emphasize proper technique and fundamentals, ensuring our students build a strong foundation for long-term growth. We are deeply interested in skill development and are always looking for ways to improve.",
  },
  {
    title: "Supportive Community",
    description:
      "Anyone and everyone with a good attitude is welcome at Grapple. We foster a supportive environment where students help each other learn and grow. You don't have to be a fighter to train here, but you do need to be willing to learn and grow.",
  },
  {
    title: "Continuous Learning",
    description:
      "We're always students first. Our commitment to learning keeps us humble and hungry for improvement. We heavily promote a culture of self-education and experimentation.",
  },
  {
    title: "Safety First",
    description:
      "Training safely is our top priority. We maintain a controlled environment where students can practice effectively without unnecessary risks. Injuries are very rare, and we take them seriously and do our best to prevent them.",
  },
  {
    title: "Positive Culture",
    description: `We cultivate a positive, ego-free atmosphere where everyone feels comfortable pushing their limits and trying new things. There are no "masters" here, we are all equal and we are all here to learn and grow.`,
  },
  {
    title: "Competition Ready",
    description:
      "For those interested in competition, we provide the training and support needed to compete at any level. Competition is not required by an means, nor will you be treated any differently should you choose not to compete, but it is encouraged to help you grow and improve.",
  },
];

const philosophy = [
  {
    title: "People Over Profits",
    description: `You, the customer, pay to be here. We don't take that lightly. We're here to serve you, and we're here to help you grow. While we would like to make money like any other business, we love the art of jiu jitsu and aren't in this for the money. Our aim is to see you learn to grapple and fall in love with the art just as we have. We prioritize making the best experience possible for you and earning your business every day over making a quick buck. You won't find setup fees, required gear purchases, pay-to-progress fees, or any other hidden costs here.`,
  },
  {
    title: "Transparency",
    description: `We believe in transparency and learning and building this business in public. We make our financials and growth metrics available to the public. We share our journey and our learnings with the world. We believe in the power of community and collaboration.`,
  },
  {
    title: "Innovation Over Tradition",
    description: `While tradition has its place and value, we belive tradition for tradition's sake is silly and counterproductive. We embrace innovation and experimentation, never afraid to try something new. We keep what is effective, and throw out what isn't. Doing things the way it's always been done is a sure way to never evolve.`,
  },
  {
    title: "Humility Over Hierarchy",
    description: `We believe hierarchy in the gym purely as a means to exert dominance or "pull rank" over others is counterproductive and juvenille. We believe respect is earned every day, and it's a two-way street. And we believe the further you progress, the more you should build bridges for those coming behind you.`,
  },
  {
    title: "Self Education",
    description:
      "We believe in creating self-learners. We believe in the power of the internet and the ability to learn anything from anywhere. We believe in the power of community and collaboration. Studying outside of class is encouraged. Study, experiment, observe, refine, repeat.",
  },
  {
    title: "Why So Serious?",
    description: `We don't take ourselves too seriously, and you shouldn't either. There's a time for the competitive spirit — a time for intensity — but at the end of the day we're just grappling, and "grappler" isn't much of a well-rounded identity on its own.`,
  },
];
