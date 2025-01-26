import Image from "next/image";
import Link from "next/link";
import { Headline } from "@/components/ui/headline";
import { Metadata } from "next";
import { siInstagram, siX } from "simple-icons";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "J.C. Hiatt | Head Coach at Grapple",
  description:
    "Meet J.C. Hiatt, owner and head coach at Grapple. Learn about his journey in jiu jitsu, teaching philosophy, and approach to the art.",
};

interface ProfileStatProps {
  label: string;
  value: string;
  href?: string;
}

function ProfileStat({ label, value, href }: ProfileStatProps) {
  const content = (
    <>
      <div className="text-lg font-semibold text-primary mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="text-center px-4 hover:opacity-80 transition-opacity"
      >
        {content}
      </Link>
    );
  }

  return <div className="text-center px-4">{content}</div>;
}

interface SocialLinkProps {
  href: string;
  icon: { path: string };
  label: string;
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <Button variant="outline" size="icon" asChild>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full"
        aria-label={label}
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
        >
          <path d={icon.path} />
        </svg>
      </Link>
    </Button>
  );
}

interface QandAProps {
  question: string;
  answer: string;
}

function QandA({ question, answer }: QandAProps) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-3 text-primary">{question}</h3>
      <p className="text-gray-700 dark:text-gray-300">{answer}</p>
    </div>
  );
}

interface VideoProps {
  title: string;
  description: string;
  youtubeId: string;
}

function FeaturedVideo({ title, description, youtubeId }: VideoProps) {
  return (
    <div className="mb-8">
      <div className="aspect-video mb-4 overflow-hidden rounded-xl">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="border-0"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}

export default function CoachProfile() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="text-center mb-16">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/40 via-primary/10 to-transparent dark:from-primary/70 dark:via-primary/20 dark:to-transparent" />
          <Image
            src="/images/coaches/jc-hiatt.png"
            alt="J.C. Hiatt"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain rounded-xl"
          />
        </div>
        <Headline as="h1" size="h2" className="mb-4">
          J.C. Hiatt
        </Headline>
        <p className="text-xl text-primary mb-4">Owner & Head Coach</p>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
          <SocialLink
            href="https://instagram.com/jchiatt"
            icon={siInstagram}
            label="Follow J.C. on Instagram"
          />
          <SocialLink
            href="https://twitter.com/jchiatt"
            icon={siX}
            label="Follow J.C. on Twitter"
          />
        </div>

        {/* Quick Stats */}
        <div className="flex justify-center gap-8 mb-12">
          <ProfileStat label="Experience" value="6+ Years" />
          <ProfileStat label="Rank" value="Purple Belt" />
          <ProfileStat label="Favorite Sub" value="Heel Hook" />
          <ProfileStat
            label="Currently Learning"
            value="K-Guard"
            href="https://bjjfanatics.com/products/k-guard-fundamentals-by-tommy-langaker"
          />
        </div>
      </div>

      {/* Q&A Section */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
        <Headline as="h2" size="h3" className="text-center mb-12">
          Get to Know Coach J.C.
        </Headline>

        <QandA
          question="How did you get into jiu jitsu?"
          answer="I started training in 2017 after years of being interested but never taking the leap. I was working as a software engineer and needed both a physical outlet and a mental challenge. From my very first class, I was hooked by the combination of problem-solving, physicality, and the immediate feedback loop that jiu jitsu provides. The more I trained, the more I realized this was something I wanted to dedicate my life to sharing with others."
        />

        <QandA
          question="What do you love about jiu jitsu?"
          answer="What I love most about jiu jitsu is its ability to transform people, both physically and mentally. It's an art that teaches you to be comfortable with being uncomfortable, to think clearly under pressure, and to approach problems systematically. As someone with a background in engineering, I'm fascinated by the technical depth and problem-solving aspects of the sport. But what really keeps me passionate is seeing how it helps people build confidence, overcome challenges, and develop a growth mindset that extends far beyond the mats."
        />

        <QandA
          question="What's your teaching philosophy?"
          answer="I believe in teaching jiu jitsu in a way that emphasizes understanding over memorization. Rather than just showing techniques, I focus on helping students understand the underlying principles and concepts that make techniques work. This approach comes from my background in software engineering - I want students to understand the 'why' behind every move, enabling them to problem-solve and adapt in real-time. I also believe in creating a welcoming, inclusive environment where everyone feels comfortable learning at their own pace."
        />
      </div>

      {/* Featured Photos */}
      <div className="mb-16">
        <Headline as="h2" size="h3" className="text-center mb-8">
          Featured Photos
        </Headline>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative aspect-square">
            <Image
              src="/images/training_shots/training-1.jpg"
              alt="Coach JC teaching a class"
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="relative aspect-square">
            <Image
              src="/images/training_shots/training-2.jpg"
              alt="Coach JC demonstrating a technique"
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="relative aspect-square">
            <Image
              src="/images/training_shots/training-3.jpg"
              alt="Coach JC at a competition"
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="relative aspect-square">
            <Image
              src="/images/training_shots/training-4.jpg"
              alt="Coach JC with students"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Featured Videos */}
      <div>
        <Headline as="h2" size="h3" className="text-center mb-8">
          Featured Videos
        </Headline>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeaturedVideo
            title="Heel Hook Setup from 50/50"
            description="A detailed breakdown of my favorite heel hook entry from the 50/50 position."
            youtubeId="dQw4w9WgXcQ"
          />
          <FeaturedVideo
            title="Guard Retention Fundamentals"
            description="Key principles for maintaining and recovering guard in no-gi."
            youtubeId="dQw4w9WgXcQ"
          />
          <FeaturedVideo
            title="Competition Highlights 2023"
            description="Highlights from various competitions throughout 2023."
            youtubeId="dQw4w9WgXcQ"
          />
          <FeaturedVideo
            title="Beginner's Guide to Leg Locks"
            description="An introduction to the leg lock game for beginners."
            youtubeId="dQw4w9WgXcQ"
          />
        </div>
      </div>
    </div>
  );
}
