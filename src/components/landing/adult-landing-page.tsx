"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BadgeCheck, CheckCircle2, Star, Trophy, Users } from "lucide-react";
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
import { AdultTrialModal } from "@/components/trial/adult-trial-modal";
import schedule from "@/data/schedule.json";
import testimonialsData from "@/data/testimonials.json";
import { getPersonaLanding } from "@/data/persona-landing";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const programCards = [
  {
    title: "Jiu Jitsu Fundamentals",
    tagline: "Build the base.",
    description:
      "Learn the essentials of movement, control, and safe rolling habits.",
    bullets: [
      "Beginner-friendly instruction",
      "Clear drills and checkpoints",
      "Safe training culture",
    ],
    icon: BadgeCheck,
  },
  {
    title: "Adult Jiu Jitsu",
    tagline: "Level up weekly.",
    description:
      "All-levels classes that blend technique, strategy, and teamwork.",
    bullets: ["Technical skill building", "Consistent coaching", "Team culture"],
    icon: Users,
  },
  {
    title: "Live Rounds / Comp",
    tagline: "Pressure test your game.",
    description:
      "Structured live rounds to sharpen timing, cardio, and confidence.",
    bullets: ["Intentional sparring", "Coach feedback", "Optional comp focus"],
    icon: Trophy,
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

type AdultScheduleDay = {
  day: DayKey;
  label: string;
  slots: ScheduleSlot[];
};

type Testimonial = {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
  blurImageUrl?: string;
};

const scheduleData = schedule as ScheduleData;
const testimonials = (testimonialsData as { testimonials: Testimonial[] })
  .testimonials;
const featuredTestimonials = testimonials.filter((item) =>
  [0, 1, 8].includes(item.id)
);

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

interface AdultLandingPageProps {
  slug: string;
}

export function AdultLandingPage({ slug }: AdultLandingPageProps) {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const persona = getPersonaLanding(slug);

  if (!persona) {
    return null;
  }

  const adultSchedule = daysInOrder
    .map((day) => {
      const slots = scheduleData[day].filter((slot) => {
        if (slot.isClosed) return false;
        const className = slot.class.toLowerCase();
        return !className.includes("kids") && !className.includes("grapplers");
      });

      if (!slots.length) return null;

      return {
        day,
        label: `${day.charAt(0).toUpperCase()}${day.slice(1)}`,
        slots,
      };
    })
    .filter((day): day is AdultScheduleDay => day !== null);

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
              {persona.label}
            </p>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <Headline as="h1" className="max-w-2xl">
                  {persona.hero.headline}
                </Headline>
                <p className="mt-6 text-lg text-muted-foreground">
                  {persona.hero.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button size="lg" onClick={() => setIsTrialModalOpen(true)}>
                    {persona.hero.ctaLabel}
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#schedule">View Schedule</Link>
                  </Button>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  {persona.hero.note}
                </p>
              </div>
              <Card className="w-full max-w-xs overflow-hidden">
                <div className="aspect-[9/16] bg-black">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${persona.hero.videoId}?playsinline=1`}
                    title={`${persona.label} Intro`}
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
              Trusted by students in Flowood, Brandon, and the surrounding area.
            </p>
            <div className="flex items-center gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={`trust-star-${index}`} className="h-4 w-4" />
              ))}
              <span className="ml-2 text-xs text-muted-foreground">
                5.0 student rating
              </span>
            </div>
          </div>
        </FullWidthSection>

        <FullWidthSection id="benefits" className="py-16 md:py-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mx-auto max-w-3xl text-center">
              <Headline as="h2" size="h2">
                Why students train at Grapple.
              </Headline>
              <p className="mt-4 text-lg text-muted-foreground">
                World-class coaching and a supportive atmosphere that keep you
                consistent.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {persona.benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <Card key={benefit.title}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </span>
                        <CardTitle className="text-lg">
                          {benefit.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{benefit.description}</CardDescription>
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
            <div className="mx-auto max-w-3xl text-center">
              <Headline as="h2" size="h2">
                Programs that match your goals.
              </Headline>
              <p className="mt-4 text-lg text-muted-foreground">
                Structured coaching and intentional live rounds for every level.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
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

        <FullWidthSection id="schedule" className="bg-muted/40 py-16 md:py-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mx-auto max-w-3xl text-center">
              <Headline as="h2" size="h2">
                Adult class schedule.
              </Headline>
              <p className="mt-4 text-lg text-muted-foreground">
                Adult Jiu Jitsu, Fundamentals, Live Rounds, and Open Mat.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {adultSchedule.map((day) => (
                <Card key={day.day}>
                  <CardHeader>
                    <CardTitle className="text-lg">{day.label}</CardTitle>
                    <CardDescription>Adult programs</CardDescription>
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
                {persona.trial.title}
              </Headline>
              <p className="mt-4 text-lg text-muted-foreground">
                {persona.trial.description}
              </p>
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                {persona.trial.bullets.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button size="lg" onClick={() => setIsTrialModalOpen(true)}>
                  {persona.trial.ctaLabel}
                </Button>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  {persona.trial.promiseTitle}
                </CardTitle>
                <CardDescription>
                  {persona.trial.promiseDescription}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        </FullWidthSection>

        <FullWidthSection id="testimonials" className="py-16 md:py-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mx-auto max-w-3xl text-center">
              <Headline as="h2" size="h2">
                Students feel the difference.
              </Headline>
              <p className="mt-4 text-lg text-muted-foreground">
                Real people. Real growth. Real results.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {featuredTestimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardHeader>
                    <div className="flex items-center gap-1 text-primary">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={`${testimonial.id}-star-${index}`}
                          className="h-4 w-4"
                        />
                      ))}
                    </div>
                    <CardTitle className="text-base">
                      {testimonial.name}
                    </CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {testimonial.content}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </FullWidthSection>

        <FullWidthSection id="faq" className="py-16 md:py-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mx-auto max-w-3xl text-center">
              <Headline as="h2" size="h2">
                Quick answers for busy adults.
              </Headline>
              <p className="mt-4 text-lg text-muted-foreground">
                If you have more questions, we are happy to help.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {persona.faqs.map((faq) => (
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
            title={persona.finalCta.title}
            description={persona.finalCta.description}
            primaryAction={{
              label: persona.finalCta.ctaLabel,
              onClick: () => setIsTrialModalOpen(true),
            }}
            secondaryAction={{
              label: "Contact Us",
              href: "/contact",
            }}
          />
        </FullWidthSection>
      </div>

      <AdultTrialModal
        open={isTrialModalOpen}
        onOpenChange={setIsTrialModalOpen}
        persona={persona}
      />
    </div>
  );
}
