"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  CheckCircle2,
  Gamepad2,
  Rocket,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FullWidthSection } from "@/components/ui/full-width-section";
import { Headline } from "@/components/ui/headline";
import { CallToAction } from "@/components/ui/call-to-action";
import schedule from "@/data/schedule.json";
import { ConfidenceTrialModal } from "@/components/kids/confidence-trial-modal";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const featureCards = [
  {
    title: "Game-Based Learning",
    description:
      "Fun facilitates learning. We use a proven games-based approach so kids learn through playful problem-solving, which is proven to be more effective than traditional learning methods.",
    icon: Gamepad2,
  },
  {
    title: "Parent Bridge First Class",
    description:
      "Nervous first day? Mom or Dad can hop on the mats to help shy kids feel safe and supported.",
    icon: Users,
  },
  {
    title: "Belt at Sign-Up",
    description:
      "Your child joins the team instantly with their own belt, ready to rank up and progress on their jiu jitsu journey.",
    icon: BadgeCheck,
  },
];

const programCards = [
  {
    title: "Lil' Grapplers (Ages 4-6)",
    tagline: "Blast off into movement.",
    description:
      "Coordination, balance, and listening skills through playful, structured games.",
    bullets: [
      "Build coordination and dexterity",
      "Body awareness and agility",
      "Sharing, turn-taking, and confidence",
      "All while having fun",
    ],
    icon: Rocket,
  },
  {
    title: "Junior Grapplers (Ages 7-12)",
    tagline: "Forging future leaders.",
    description:
      "Technique, teamwork, and social dynamics with purpose and clarity.",
    bullets: [
      "Anti-bullying emphasis",
      "Leverage, control, and strategy",
      "Situational grappling games",
      "Competition opportunities",
    ],
    icon: Shield,
  },
];

type ScheduleSlot = {
  start: string;
  end: string;
  class: string;
  isClosed?: boolean;
};

const daysInOrder = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

type DayKey = (typeof daysInOrder)[number];

type ScheduleData = Record<DayKey, ScheduleSlot[]> & {
  overrides: unknown[];
};

const scheduleData = schedule as ScheduleData;

type KidsScheduleDay = {
  day: DayKey;
  label: string;
  slots: ScheduleSlot[];
};

const kidsSchedule = daysInOrder
  .map((day) => {
    const slots = scheduleData[day].filter(
      (slot) =>
        !slot.isClosed &&
        (slot.class.includes("Kids") || slot.class.includes("Grapplers"))
    );

    if (!slots.length) return null;

    return {
      day,
      label: `${day.charAt(0).toUpperCase()}${day.slice(1)}`,
      slots,
    };
  })
  .filter((day): day is KidsScheduleDay => day !== null);

function formatTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes));
  return date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();
}

// const testimonials = [
//   {
//     quote:
//       "My daughter smiled through the whole class. The coaches cheer them on, and she left feeling proud.",
//     name: "Parent in Flowood",
//   },
//   {
//     quote:
//       "We loved the games. It felt like learning without pressure, and my son made friends fast.",
//     name: "Parent in Brandon",
//   },
//   {
//     quote:
//       "The Parent Bridge helped my shy kiddo open up. He now asks when he can go back.",
//     name: "Parent in Pearl",
//   },
// ];

const faqs = [
  {
    question: "Is it safe?",
    answer:
      "Jiu Jitsu is a contact sport, so bumps and bruises can happen. Our no-striking and game-based rules minimize risk significantly compared to other sports.",
  },
  {
    question: "My child is shy. What if they freeze?",
    answer:
      "That's why we have the Parent Bridge. You are welcome on the mats for the first session to be the ultimate safety net.",
  },
  {
    question: "Do I need to buy gear?",
    answer: "Shorts and a t-shirt work for the trial.",
  },
];

export default function KidsPage() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  return (
    <div className="relative overflow-hidden bg-background">
      <div className="relative">
        <FullWidthSection className="py-16 md:py-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="space-y-10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Kids Program
            </p>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <Headline as="h1" className="max-w-2xl">
                  Building Unshakable Confidence Through the Power of Play.
                </Headline>
                <p className="mt-6 text-lg text-muted-foreground">
                  Flowood&apos;s premier Jiu Jitsu program for kids. We use a
                  science-backed approach to improve learning, instill
                  confidence, and build real self-defense skills.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button size="lg" onClick={() => setIsTrialModalOpen(true)}>
                    Claim Your 3-Day Confidence Trial
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#programs">Explore Programs</Link>
                  </Button>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Parents welcome on the mats for the first class.
                </p>
              </div>
              <Card className="w-full max-w-xs overflow-hidden">
                <div className="aspect-[9/16] bg-black">
                  <iframe
                    className="h-full w-full"
                    src="https://www.youtube.com/embed/G1EYlbpsSgI?playsinline=1"
                    title="Grapple Kids Intro"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </Card>
            </div>
          </motion.div>
        </FullWidthSection>

        <FullWidthSection className="border-y border-border/60 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row md:text-left">
            <p>
              Trusted by parents in Flowood, Brandon, and the surrounding area.
            </p>
            <div className="flex items-center gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={`trust-star-${index}`} className="h-4 w-4" />
              ))}
              <span className="ml-2 text-xs text-muted-foreground">
                5.0 parent rating
              </span>
            </div>
          </div>
        </FullWidthSection>

        <FullWidthSection id="features" className="py-16 md:py-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center max-w-3xl mx-auto">
              <Headline as="h2" size="h2">
                Why parents choose Grapple.
              </Headline>
              <p className="mt-4 text-lg text-muted-foreground">
                Safe and fun doesn&apos;t mean ineffective. Every class blends
                structure and play so kids feel safe, seen, and excited to
                learn.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {featureCards.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </span>
                        <CardTitle className="text-lg">
                          {feature.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        </FullWidthSection>

        <FullWidthSection id="programs" className="py-16 md:py-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center max-w-3xl mx-auto">
              <Headline as="h2" size="h2">
                Two programs, one mission.
              </Headline>
              <p className="mt-4 text-lg text-muted-foreground">
                Age-appropriate coaching keeps every child challenged, safe, and
                excited to grow.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {programCards.map((program) => {
                const Icon = program.icon;
                return (
                  <Card key={program.title}>
                    <CardHeader>
                      <div className="flex items-center gap-3 text-primary">
                        <Icon className="h-5 w-5" />
                        <p className="text-xs font-semibold uppercase tracking-[0.25em]">
                          {program.title}
                        </p>
                      </div>
                      <CardTitle className="text-xl">
                        {program.tagline}
                      </CardTitle>
                      <CardDescription>{program.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-muted-foreground">
                      {program.bullets.map((item) => (
                        <p key={item}>• {item}</p>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        </FullWidthSection>

        <FullWidthSection
          id="kids-schedule"
          className="bg-muted/40 py-16 md:py-24"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center max-w-3xl mx-auto">
              <Headline as="h2" size="h2">
                Kids class schedule.
              </Headline>
              <p className="mt-4 text-lg text-muted-foreground">
                Lil&apos; Grapplers and Kids (7-12) classes are offered on these
                days. See the full schedule anytime.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {kidsSchedule.map((day) => (
                <Card key={day.day}>
                  <CardHeader>
                    <CardTitle className="text-lg">{day.label}</CardTitle>
                    <CardDescription>Kids programs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    {day.slots.map((slot) => (
                      <div key={`${day.day}-${slot.class}-${slot.start}`}>
                        <p className="font-medium">{slot.class}</p>
                        <p className="text-muted-foreground">
                          {formatTime(slot.start)} - {formatTime(slot.end)}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/schedule">View Full Schedule</Link>
              </Button>
            </div>
          </motion.div>
        </FullWidthSection>

        <FullWidthSection id="trial" className="bg-primary/10 py-16 md:py-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center"
          >
            <div>
              <Headline as="h2" size="h2">
                The 3-Day Confidence Trial.
              </Headline>
              <p className="mt-4 text-lg text-muted-foreground">
                No pressure, just playful progress. We celebrate small wins
                every class.
              </p>
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                {[
                  "Parent welcome on the mats for the first class.",
                  "Belt at sign-up so your child feels part of the team.",
                  "Three days of games, milestones, and measurable confidence.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button size="lg" onClick={() => setIsTrialModalOpen(true)}>
                  Claim Your 3-Day Confidence Trial
                </Button>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  The Parent Bridge Promise
                </CardTitle>
                <CardDescription>
                  Nervous first day? Mom or Dad can hop on the mats for the
                  first class to be the ultimate safety net.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                We build trust first, then independence. Kids learn faster when
                they feel safe and supported.
              </CardContent>
            </Card>
          </motion.div>
        </FullWidthSection>

        <FullWidthSection id="empowerment" className="py-16 md:py-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  Build a fortress of confidence.
                </CardTitle>
                <CardDescription>
                  Confidence changes posture, voice, and presence. Kids who know
                  they can handle themselves are less likely to be targeted.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Self-defense emphasis &mdash; not looking for a fight</p>
                <p>• Non-violent control and safe exits</p>
                <p>• Calm focus under pressure</p>
              </CardContent>
            </Card>
            <div>
              <Headline as="h2" size="h2">
                We teach courage without aggression.
              </Headline>
              <p className="mt-4 text-lg text-muted-foreground">
                Your child learns to speak clearly, stand tall, and de-escalate.
                We focus on control, not conflict.
              </p>
              <div className="mt-6 flex items-start gap-3 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
                <Shield className="mt-0.5 h-5 w-5 text-primary" />
                <p>
                  Knowing how to stay safe reduces fear. Fearless kids are
                  kinder, calmer, and more confident in school.
                </p>
              </div>
            </div>
          </motion.div>
        </FullWidthSection>

        {/* <FullWidthSection id="reviews" className="bg-muted/40 py-16 md:py-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center max-w-3xl mx-auto">
              <Headline as="h2" size="h2">
                Parents notice the difference fast.
              </Headline>
              <p className="mt-4 text-lg text-muted-foreground">
                A calm, structured atmosphere that still feels like recess.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name}>
                  <CardHeader>
                    <div className="flex items-center gap-1 text-primary">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={`${testimonial.name}-star-${index}`}
                          className="h-4 w-4"
                        />
                      ))}
                    </div>
                    <CardTitle className="text-base">
                      {testimonial.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {testimonial.quote}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </FullWidthSection> */}

        <FullWidthSection id="faq" className="py-16 md:py-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center max-w-3xl mx-auto">
              <Headline as="h2" size="h2">
                Quick answers for busy parents.
              </Headline>
              <p className="mt-4 text-lg text-muted-foreground">
                If you have more questions, we are happy to help.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {faqs.map((faq) => (
                <Card key={faq.question}>
                  <CardHeader>
                    <CardTitle className="text-base">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {faq.answer}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </FullWidthSection>

        <FullWidthSection className="py-16 md:py-24">
          <CallToAction
            title="Ready to see your child light up?"
            description="Claim the 3-Day Confidence Trial and experience the Grapple difference."
            primaryAction={{
              label: "Claim Your 3-Day Confidence Trial",
              onClick: () => setIsTrialModalOpen(true),
            }}
            secondaryAction={{
              label: "Contact Us",
              href: "/contact",
            }}
          />
        </FullWidthSection>
      </div>

      <ConfidenceTrialModal
        open={isTrialModalOpen}
        onOpenChange={setIsTrialModalOpen}
      />
    </div>
  );
}
