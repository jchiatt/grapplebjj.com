"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  CheckCircle2,
  Clock,
  Dumbbell,
  HeartPulse,
  Shield,
  ShieldCheck,
  Siren,
  Star,
  Stethoscope,
  Target,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
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
import type {
  PersonaBenefitIcon,
  PersonaLanding,
} from "@/data/persona-landing";

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

const REVIEWS = [
  "Training at Grapple has boosted my confidence in multiple areas of my BJJ game.",
  "Grapple feels like a second home.",
  "Family friendly environment and tough training.",
  "The members are welcoming, genuine, and stay connected with me regularly.",
  "J.C. has done an incredible job with this school",
  "The dedication and investment in the school are evident in every aspect, from the expert teaching to the welcoming and supportive atmosphere. ",
  "The culture here is truly one of a kind, making it an exceptional place to learn and grow. Highly recommended!",
  "Excellent instruction and great teammates for adults and kids alike.",
  "This is the best training environment I've ever been in.",
  "I always feel welcome, everyone is there to learn and improve together and nobody has an ego.",
  "Started tonight as a beginner and they were super helpful and in no way were judgmental.",
  "Great place to learn and train BJJ! Awesome coach!",
  "This is the place to be in Mississippi.",
  "I travel 4 hours every week just to train here",
  "Very friendly and helpful. I appreciated how welcome and supported I felt here!",
  "Splendid place to train along with great instruction and atmosphere.",
  "They pay attention to hygiene",
];

const REVIEW_POSITIONS = [
  { top: 8, left: 6, width: 240, duration: 48, delay: -6 },
  { top: 20, left: 32, width: 260, duration: 52, delay: -14 },
  { top: 14, left: 58, width: 220, duration: 46, delay: -10 },
  { top: 32, left: 70, width: 180, duration: 54, delay: -22 },
  { top: 44, left: 10, width: 230, duration: 50, delay: -18 },
  { top: 52, left: 38, width: 240, duration: 56, delay: -28 },
  { top: 60, left: 64, width: 200, duration: 49, delay: -16 },
  { top: 74, left: 18, width: 240, duration: 58, delay: -30 },
  { top: 82, left: 48, width: 220, duration: 53, delay: -20 },
  { top: 68, left: 76, width: 170, duration: 47, delay: -12 },
  { top: 90, left: 84, width: 210, duration: 51, delay: -24 },
  { top: 100, left: 10, width: 250, duration: 55, delay: -32 },
  { top: 110, left: 38, width: 260, duration: 59, delay: -36 },
  { top: 120, left: 64, width: 220, duration: 54, delay: -26 },
  { top: 130, left: 90, width: 180, duration: 48, delay: -14 },
  { top: 140, left: 116, width: 230, duration: 52, delay: -20 },
  { top: 150, left: 142, width: 240, duration: 56, delay: -28 },
  { top: 160, left: 168, width: 200, duration: 50, delay: -16 },
  { top: 170, left: 194, width: 250, duration: 54, delay: -24 },
];

const MOBILE_REVIEW_INTERVAL_MS = 3000;

const adultHeroVideo = {
  src: "/videos/adult-jiu-jitsu-loop.mp4",
  poster: "/images/training_shots/training-3.jpg",
};

const gymPhotos = [
  {
    title: "Live rounds and coaching",
    description: "Coach-guided sparring sessions with real-time feedback.",
    src: "/images/training_shots/training-1.jpg",
    alt: "Adults drilling Brazilian Jiu Jitsu techniques in Flowood",
  },
  {
    title: "Warm-up and drilling",
    description: "Partner drilling to build muscle memory and timing.",
    src: "/images/training_shots/training-2.jpg",
    alt: "Adult BJJ fundamentals class in Flowood, Mississippi",
  },
  {
    title: "Open mat energy",
    description: "A packed gym with teammates pushing each other.",
    src: "/images/training_shots/training-3.jpg",
    alt: "Brazilian Jiu Jitsu open mat in Flowood for adults",
  },
  {
    title: "Technique instruction",
    description: "Group instruction and concept breakdowns.",
    src: "/images/training_shots/training-4.jpg",
    alt: "Coach teaching BJJ techniques to adults in Flowood",
  },
  {
    title: "Team training",
    description: "The Grapple squad after a hard training session.",
    src: "/images/training_shots/training-5.jpg",
    alt: "Adult Brazilian Jiu Jitsu team training in Flowood",
  },
  {
    title: "Gym atmosphere",
    description: "Multiple pairs rolling in a supportive environment.",
    src: "/images/training_shots/squad-1.jpg",
    alt: "Grapple BJJ gym atmosphere in Flowood, Mississippi",
  },
];

const benefitIcons: Record<PersonaBenefitIcon, LucideIcon> = {
  target: Target,
  trophy: Trophy,
  users: Users,
  dumbbell: Dumbbell,
  clock: Clock,
  "shield-check": ShieldCheck,
  "heart-pulse": HeartPulse,
  shield: Shield,
  siren: Siren,
  stethoscope: Stethoscope,
};

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
  persona: PersonaLanding;
}

export function AdultLandingPage({ persona }: AdultLandingPageProps) {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [mobileReviewIndex, setMobileReviewIndex] = useState(0);
  const isAdult = persona.slug === "adult-jiu-jitsu";

  useEffect(() => {
    const interval = setInterval(() => {
      setMobileReviewIndex((current) => (current + 1) % REVIEWS.length);
    }, MOBILE_REVIEW_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

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
        <FullWidthSection className="relative overflow-hidden py-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/90 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/80 to-transparent" />
              {REVIEWS.map((review, index) => {
                const position = REVIEW_POSITIONS[index];
                if (!position) return null;
                return (
                  <div
                    key={`persona-review-${index}`}
                    className="absolute hidden rounded-lg border border-border/70 bg-background/80 px-4 py-3 text-xs text-foreground/70 shadow-sm opacity-10 backdrop-blur-sm blur-[1px] dark:border-white/20 dark:bg-white/10 dark:text-white/80 dark:opacity-20 sm:block"
                    style={{
                      top: `${position.top}%`,
                      left: `${position.left}%`,
                      width: position.width,
                      animation: `persona-review-float ${position.duration}s linear infinite`,
                      animationDelay: `${position.delay}s`,
                      willChange: "transform",
                    }}
                  >
                    <div className="mb-2 flex items-center gap-1 text-primary/80">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={`persona-star-${index}-${starIndex}`}
                          className="h-3 w-3 fill-current"
                        />
                      ))}
                    </div>
                    <p>&ldquo;{review}&rdquo;</p>
                  </div>
                );
              })}
            </div>
          </div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 space-y-10"
          >
            {!isAdult && (
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                {persona.label}
              </p>
            )}
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                {isAdult ? (
                  <>
                    <Headline as="h1" className="max-w-2xl">
                      Adult Jiu Jitsu in Flowood
                    </Headline>
                    <Headline as="h2" size="h4" className="mt-2 max-w-2xl">
                      {persona.hero.headline}
                    </Headline>
                  </>
                ) : (
                  <Headline as="h1" className="max-w-2xl">
                    {persona.hero.headline}
                  </Headline>
                )}
                <p className="mt-6 text-lg text-muted-foreground">
                  {persona.hero.description}
                </p>
                <div className="mt-6 sm:hidden">
                  <div className="relative h-16 overflow-hidden text-sm text-muted-foreground">
                    <p
                      key={`persona-mobile-review-${mobileReviewIndex}`}
                      className="absolute inset-0 flex flex-col items-start justify-center gap-2 animate-[persona-mobile-review_3s_ease-in-out]"
                    >
                      <span className="flex items-center gap-1 text-primary/80">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star
                            key={`persona-mobile-star-${mobileReviewIndex}-${starIndex}`}
                            className="h-3 w-3 fill-current"
                          />
                        ))}
                      </span>
                      <span>&ldquo;{REVIEWS[mobileReviewIndex]}&rdquo;</span>
                    </p>
                  </div>
                </div>
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
                  {isAdult ? (
                    <video
                      className="h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={adultHeroVideo.poster}
                    >
                      <source src={adultHeroVideo.src} type="video/mp4" />
                    </video>
                  ) : (
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${persona.hero.videoId}?playsinline=1`}
                      title={`${persona.label} Intro`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  )}
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
                <Star
                  key={`trust-star-${index}`}
                  className="h-4 w-4 fill-current"
                />
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
            <div className="text-center max-w-3xl mx-auto">
              <Headline as="h2" size="h2">
                Why students train at Grapple.
              </Headline>
              <p className="mt-4 text-lg text-muted-foreground">
                Expert instruction and a supportive atmosphere that keep you
                consistent.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {persona.benefits.map((benefit) => {
                const Icon = benefitIcons[benefit.icon];
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
            <div className="text-center max-w-3xl mx-auto">
              <Headline as="h2" size="h2">
                Programs that match your goals.
              </Headline>
              <p className="mt-4 text-lg text-muted-foreground">
                Structured coaching and intentional live rounds for every level.
              </p>
              {isAdult && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Our Brazilian Jiu Jitsu (BJJ) curriculum builds confident
                  fundamentals while sharpening your live training.
                </p>
              )}
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

        <FullWidthSection id="photos" className="py-16 md:py-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center max-w-3xl mx-auto">
              <Headline as="h2" size="h2">
                Inside the gym.
              </Headline>
              <p className="mt-4 text-lg text-muted-foreground">
                Get a feel for the space, the training, and the team energy.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {gymPhotos.map((photo, index) => (
                <div
                  key={`persona-photo-${index}`}
                  className="overflow-hidden rounded-2xl border border-border/70 bg-muted/40"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="space-y-1 p-4">
                    <p className="text-sm font-medium text-foreground">
                      {photo.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {photo.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </FullWidthSection>

        <FullWidthSection
          id="schedule"
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
            <p className="mt-4 text-xs text-muted-foreground">
              Beginners are welcome at all Adult classes, though we recommend
              starting with Fundamentals.
            </p>
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
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => setIsTrialModalOpen(true)}
                >
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
            <div className="text-center max-w-3xl mx-auto">
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
            <div className="text-center max-w-3xl mx-auto">
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
      <style jsx>{`
        @keyframes persona-review-float {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-220px);
          }
        }
        @keyframes persona-mobile-review {
          0% {
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
