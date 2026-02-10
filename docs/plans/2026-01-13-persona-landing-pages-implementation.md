# Persona Landing Pages Implementation Plan

> **For Claude:** Spawn `plan-executor` agent to implement this plan task-by-task.

**Goal:** Add five persona landing pages with a shared adult template, a short trial lead modal, and a lead capture endpoint.

**Architecture:** Use a dynamic route (`/jiu-jitsu-programs/[slug]`) backed by a typed TS data file. Render the layout in a shared client component and reuse existing UI primitives. Lead submissions post to a new API route that forwards to Zapier via an env var.

**Tech Stack:** Next.js App Router, TypeScript, React, Tailwind CSS, Framer Motion, Lucide icons, shadcn/ui components.

---

### Task 1: Add persona landing content data

**Parallel:** yes
**Blocked by:** none
**Owned files:** `src/data/persona-landing.ts`

**Files:**
- Create: `src/data/persona-landing.ts`

**Step 1: Write the failing test**
No tests are configured for this repo. Skip.

**Step 2: Implement the data file**
```ts
import {
  Clock,
  Dumbbell,
  HeartPulse,
  Shield,
  ShieldCheck,
  Siren,
  Stethoscope,
  Target,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

export type PersonaLanding = {
  slug: string;
  label: string;
  hero: {
    headline: string;
    description: string;
    note: string;
    ctaLabel: string;
    videoId: string;
  };
  benefits: Array<{
    title: string;
    description: string;
    icon: LucideIcon;
  }>;
  trial: {
    title: string;
    description: string;
    bullets: string[];
    ctaLabel: string;
    promiseTitle: string;
    promiseDescription: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  finalCta: {
    title: string;
    description: string;
    ctaLabel: string;
  };
};

export const personaLandings: PersonaLanding[] = [
  {
    slug: "competition-team",
    label: "Grapple Competition Team",
    hero: {
      headline: "Train with a team built for competition.",
      description:
        "Structured live rounds, focused drilling, and coaches who care about your brackets. Build a game you can trust under pressure.",
      note: "All levels welcome. Tournaments are optional, not required.",
      ctaLabel: "Claim Your Competition Team Trial",
      videoId: "6HPsq1FB8lg",
    },
    benefits: [
      {
        title: "Game-Plan Training",
        description: "Build a clear A-game with feedback each week.",
        icon: Target,
      },
      {
        title: "Live Rounds Culture",
        description: "Intentional sparring that mimics tournament pace.",
        icon: Trophy,
      },
      {
        title: "Accountability Crew",
        description: "Train alongside teammates who keep you consistent.",
        icon: Users,
      },
    ],
    trial: {
      title: "The 3-Day Team Trial.",
      description: "See what competitive training feels like without the pressure.",
      bullets: [
        "Goal setting and game-plan check-in.",
        "Coach feedback during live rounds.",
        "Find your training group and schedule.",
      ],
      ctaLabel: "Claim Your Competition Team Trial",
      promiseTitle: "Comp coaching, no ego.",
      promiseDescription:
        "We push hard and support harder. Everyone helps everyone get better.",
    },
    faqs: [
      {
        question: "Do I need to be a competitor already?",
        answer: "No. We welcome future competitors and motivated students.",
      },
      {
        question: "How often should I train?",
        answer: "Most competitors train 3 to 5 days per week. We help you plan a schedule.",
      },
      {
        question: "Is there gi training?",
        answer: "Grapple focuses on no-gi with a strong wrestling and submission base.",
      },
    ],
    finalCta: {
      title: "Ready to train like a competitor?",
      description: "Claim the 3-Day Team Trial and start building your game.",
      ctaLabel: "Claim Your Competition Team Trial",
    },
  },
  {
    slug: "adult-jiu-jitsu",
    label: "Adult Jiu Jitsu",
    hero: {
      headline: "The best hour of your day.",
      description:
        "Get fit, sharpen your mind, and join a welcoming adult team in Flowood.",
      note: "No experience needed. Start with the 3-Day Trial.",
      ctaLabel: "Claim Your Adult Jiu Jitsu Trial",
      videoId: "6HPsq1FB8lg",
    },
    benefits: [
      {
        title: "Fitness That Sticks",
        description: "Full-body training that is fun and sustainable.",
        icon: Dumbbell,
      },
      {
        title: "Stress Reset",
        description: "Leave the day on the mats and go home clear-headed.",
        icon: Clock,
      },
      {
        title: "Community First",
        description: "Train with coaches and teammates who know your name.",
        icon: Users,
      },
    ],
    trial: {
      title: "The 3-Day Adult Trial.",
      description: "Try three classes and see how jiu jitsu fits your life.",
      bullets: [
        "Beginner-friendly coaching.",
        "Flexible schedule options.",
        "No long-term commitment to start.",
      ],
      ctaLabel: "Claim Your Adult Jiu Jitsu Trial",
      promiseTitle: "Welcome from day one.",
      promiseDescription:
        "We keep classes structured, safe, and supportive for every level.",
    },
    faqs: [
      {
        question: "What should I wear?",
        answer: "Shorts and a t-shirt are perfect for your first class.",
      },
      {
        question: "Am I too out of shape?",
        answer: "No. We scale training to your level and build from there.",
      },
      {
        question: "How fast will I learn?",
        answer: "You will learn something useful on day one. Progress builds weekly.",
      },
    ],
    finalCta: {
      title: "Ready to start training?",
      description: "Claim the 3-Day Adult Trial and meet the Grapple team.",
      ctaLabel: "Claim Your Adult Jiu Jitsu Trial",
    },
  },
  {
    slug: "womens-jiu-jitsu",
    label: "Women's Jiu Jitsu",
    hero: {
      headline: "Confidence you can feel in every room.",
      description:
        "Train in a respectful, supportive environment where technique and control come first.",
      note: "Beginner-friendly and coach-led.",
      ctaLabel: "Claim Your Women's Jiu Jitsu Trial",
      videoId: "6HPsq1FB8lg",
    },
    benefits: [
      {
        title: "Safe, Controlled Training",
        description: "Clear coaching and a respectful training culture.",
        icon: ShieldCheck,
      },
      {
        title: "Real-World Confidence",
        description: "Build calm, capable self-defense skills over time.",
        icon: HeartPulse,
      },
      {
        title: "Supportive Coaches",
        description: "We match you with good partners and guide every rep.",
        icon: Users,
      },
    ],
    trial: {
      title: "The 3-Day Women's Trial.",
      description: "Train at your pace and see how empowering jiu jitsu can be.",
      bullets: [
        "Learn escapes and control positions.",
        "Train with clear coaching and good partners.",
        "Build confidence on and off the mats.",
      ],
      ctaLabel: "Claim Your Women's Jiu Jitsu Trial",
      promiseTitle: "Respect first, always.",
      promiseDescription:
        "We prioritize safety, consent, and supportive training partners.",
    },
    faqs: [
      {
        question: "Do I need experience?",
        answer: "No. Most women start as beginners.",
      },
      {
        question: "Will I have training partners?",
        answer: "Yes. Our coaches help match you with good partners.",
      },
      {
        question: "Is this self-defense focused?",
        answer: "Yes. We teach control, escapes, and awareness.",
      },
    ],
    finalCta: {
      title: "Ready to build confidence?",
      description: "Claim the 3-Day Trial and meet the Grapple team.",
      ctaLabel: "Claim Your Women's Jiu Jitsu Trial",
    },
  },
  {
    slug: "first-responders",
    label: "Jiu Jitsu for LEO/First Responders",
    hero: {
      headline: "Control first. Go home safe.",
      description:
        "Grappling built for control, restraint, and composure under pressure.",
      note: "Ask about our pay-what-you-can option for first responders.",
      ctaLabel: "Claim Your First Responder Trial",
      videoId: "6HPsq1FB8lg",
    },
    benefits: [
      {
        title: "Control Without Striking",
        description: "Use leverage and positioning to manage conflict safely.",
        icon: Shield,
      },
      {
        title: "Decision-Making Under Pressure",
        description: "Train calm responses that hold up in stressful moments.",
        icon: Target,
      },
      {
        title: "Team Accountability",
        description: "Train with teammates who value safety and respect.",
        icon: Siren,
      },
    ],
    trial: {
      title: "The 3-Day First Responder Trial.",
      description: "See how grappling supports control and resilience on the job.",
      bullets: [
        "Focus on grips, control, and safe restraint.",
        "Scenario-aware training and live rounds.",
        "Coaching that respects your role.",
      ],
      ctaLabel: "Claim Your First Responder Trial",
      promiseTitle: "Built for real-world pressure.",
      promiseDescription:
        "We emphasize control, not aggression, in a safe training environment.",
    },
    faqs: [
      {
        question: "Is this a tactics class?",
        answer:
          "It is jiu jitsu training that supports control and restraint skills.",
      },
      {
        question: "Do I need prior martial arts training?",
        answer: "No. We start with fundamentals and build from there.",
      },
      {
        question: "Can I train around shift work?",
        answer: "Yes. We offer morning, midday, and evening classes.",
      },
    ],
    finalCta: {
      title: "Ready to train with control?",
      description: "Claim the 3-Day Trial and meet the Grapple team.",
      ctaLabel: "Claim Your First Responder Trial",
    },
  },
  {
    slug: "hospital-workers",
    label: "Jiu Jitsu for Hospital Workers",
    hero: {
      headline: "Stay composed under pressure.",
      description:
        "Learn body mechanics, control, and calm focus that carry into demanding shifts.",
      note: "Hospital staff can use our pay-what-you-can discount.",
      ctaLabel: "Claim Your Hospital Worker Trial",
      videoId: "6HPsq1FB8lg",
    },
    benefits: [
      {
        title: "Body Mechanics That Protect You",
        description: "Move efficiently and reduce wear and tear over time.",
        icon: Stethoscope,
      },
      {
        title: "Calm Under Stress",
        description: "Build composure that helps in high-pressure moments.",
        icon: HeartPulse,
      },
      {
        title: "Supportive Community",
        description: "Train with people who understand demanding schedules.",
        icon: Users,
      },
    ],
    trial: {
      title: "The 3-Day Hospital Worker Trial.",
      description: "A structured, safe introduction to jiu jitsu training.",
      bullets: [
        "Learn safe control and escapes.",
        "A positive outlet after long shifts.",
        "Flexible schedule and coaching.",
      ],
      ctaLabel: "Claim Your Hospital Worker Trial",
      promiseTitle: "A reset that builds resilience.",
      promiseDescription: "You leave training stronger, clearer, and supported.",
    },
    faqs: [
      {
        question: "Is this only for hospital workers?",
        answer:
          "No, but hospital staff are welcome and qualify for a discount.",
      },
      {
        question: "Is it beginner-friendly?",
        answer: "Yes. We start with fundamentals and support every level.",
      },
      {
        question: "Will I get hurt?",
        answer: "We focus on safety and controlled training at all times.",
      },
    ],
    finalCta: {
      title: "Ready to reset and train?",
      description: "Claim the 3-Day Trial and meet the Grapple team.",
      ctaLabel: "Claim Your Hospital Worker Trial",
    },
  },
];

export const personaLandingSlugs = personaLandings.map((persona) => persona.slug);

export function getPersonaLanding(slug: string) {
  return personaLandings.find((persona) => persona.slug === slug);
}
```

**Step 3: Run lint**
Skip for now; run once after Task 7.

**Step 4: Return diff summary**
Return diff summary for orchestrator review (no commit).

---

### Task 2: Add adult trial modal component

**Parallel:** yes
**Blocked by:** Task 1
**Owned files:** `src/components/trial/adult-trial-modal.tsx`

**Files:**
- Create: `src/components/trial/adult-trial-modal.tsx`

**Step 1: Write the failing test**
No tests are configured for this repo. Skip.

**Step 2: Implement the modal component**
```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PersonaLanding } from "@/data/persona-landing";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const EXPERIENCE_OPTIONS = [
  { value: "new", label: "New to jiu jitsu" },
  { value: "some", label: "Some training" },
  { value: "regular", label: "Regular training" },
  { value: "competitor", label: "Competition-focused" },
];

type FormStatus = "idle" | "submitting" | "success" | "error";

interface AdultTrialModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  persona: PersonaLanding;
}

export function AdultTrialModal({
  open,
  onOpenChange,
  persona,
}: AdultTrialModalProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});
  const [experienceLevel, setExperienceLevel] = useState("");
  const [goals, setGoals] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (open) return;
    setStatus("idle");
    setErrorMessage("");
    setValidationErrors({});
    setExperienceLevel("");
    setGoals("");
    formRef.current?.reset();
  }, [open]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    setValidationErrors({});

    const formData = new FormData(event.currentTarget);
    const name = (formData.get("name") as string) ?? "";
    const email = (formData.get("email") as string) ?? "";
    const phone = (formData.get("phone") as string) ?? "";
    const errors: { name?: string; email?: string; phone?: string } = {};

    if (!name.trim()) {
      errors.name = "Please enter your name.";
    }

    if (!EMAIL_REGEX.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!phone) {
      errors.phone = "Phone number is required.";
    } else if (!PHONE_REGEX.test(phone)) {
      errors.phone = "Please enter a valid phone number.";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setStatus("idle");
      return;
    }

    const payload = {
      name,
      email,
      phone,
      experienceLevel: experienceLevel || undefined,
      goals: goals || undefined,
      personaSlug: persona.slug,
      personaLabel: persona.label,
      source: "landing-page",
    };

    try {
      const response = await fetch("/api/trial-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setStatus("success");
      formRef.current?.reset();
      setExperienceLevel("");
      setGoals("");
    } catch (error) {
      console.error("Error submitting trial lead:", error);
      setStatus("error");
      setErrorMessage(
        "Sorry, we could not submit your request. Please try again or call us directly."
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        {status === "success" ? (
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle>You are in!</DialogTitle>
                <DialogDescription>
                  Thanks for claiming the 3-Day Trial for {persona.label}.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-start gap-3 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                <p>We will call within 1 business day to schedule your trial.</p>
              </div>
              <Button type="button" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/40 p-4 space-y-3">
              <p className="text-sm font-medium text-foreground">
                Here is a quick video of next steps!
              </p>
              <div className="aspect-[9/16] w-full overflow-hidden rounded-lg border border-border bg-black">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${persona.hero.videoId}?playsinline=1`}
                  title={`${persona.label} Next Steps`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle>{persona.trial.title}</DialogTitle>
              <DialogDescription>
                Share your info and we will call within 1 business day to schedule
                your trial.
              </DialogDescription>
            </DialogHeader>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {status === "error" && (
                <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    disabled={status === "submitting"}
                    aria-invalid={!!validationErrors.name}
                    aria-describedby={
                      validationErrors.name ? "name-error" : undefined
                    }
                  />
                  {validationErrors.name && (
                    <p id="name-error" className="text-sm text-red-500">
                      {validationErrors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    required
                    disabled={status === "submitting"}
                    aria-invalid={!!validationErrors.email}
                    aria-describedby={
                      validationErrors.email ? "email-error" : undefined
                    }
                  />
                  {validationErrors.email && (
                    <p id="email-error" className="text-sm text-red-500">
                      {validationErrors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(601) 673-4320"
                    required
                    disabled={status === "submitting"}
                    aria-invalid={!!validationErrors.phone}
                    aria-describedby={
                      validationErrors.phone ? "phone-error" : undefined
                    }
                  />
                  {validationErrors.phone && (
                    <p id="phone-error" className="text-sm text-red-500">
                      {validationErrors.phone}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience level (optional)</Label>
                  <Select
                    value={experienceLevel}
                    onValueChange={setExperienceLevel}
                  >
                    <SelectTrigger id="experience">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="goals">Goals (optional)</Label>
                  <Textarea
                    id="goals"
                    name="goals"
                    placeholder="Tell us what you want to get out of training"
                    value={goals}
                    onChange={(event) => setGoals(event.target.value)}
                    disabled={status === "submitting"}
                    className="min-h-[120px]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={status === "submitting"}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
```

**Step 3: Run lint**
Skip for now; run once after Task 7.

**Step 4: Return diff summary**
Return diff summary for orchestrator review (no commit).

---

### Task 3: Add trial lead API endpoint

**Parallel:** yes
**Blocked by:** none
**Owned files:** `src/app/api/trial-leads/route.ts`

**Files:**
- Create: `src/app/api/trial-leads/route.ts`

**Step 1: Write the failing test**
No tests are configured for this repo. Skip.

**Step 2: Implement the API route**
```ts
import { NextResponse } from "next/server";

const ZAPIER_TRIAL_LEADS_WEBHOOK_URL =
  process.env.ZAPIER_TRIAL_LEADS_WEBHOOK_URL;

export async function POST(request: Request) {
  try {
    if (!ZAPIER_TRIAL_LEADS_WEBHOOK_URL) {
      return NextResponse.json(
        { error: "Missing ZAPIER_TRIAL_LEADS_WEBHOOK_URL" },
        { status: 500 }
      );
    }

    const body = await request.json();

    const response = await fetch(ZAPIER_TRIAL_LEADS_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to submit trial lead");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting trial lead:", error);
    return NextResponse.json(
      { error: "Failed to submit trial lead" },
      { status: 500 }
    );
  }
}
```

**Step 3: Configure env var locally**
Add `ZAPIER_TRIAL_LEADS_WEBHOOK_URL=...` to `.env.local` for local testing (do not commit).

**Step 4: Return diff summary**
Return diff summary for orchestrator review (no commit).

---

### Task 4: Add shared adult landing page component

**Parallel:** no
**Blocked by:** Task 1, Task 2
**Owned files:** `src/components/landing/adult-landing-page.tsx`

**Files:**
- Create: `src/components/landing/adult-landing-page.tsx`

**Step 1: Write the failing test**
No tests are configured for this repo. Skip.

**Step 2: Implement the shared landing page**
```tsx
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
import type { PersonaLanding } from "@/data/persona-landing";

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
  persona: PersonaLanding;
}

export function AdultLandingPage({ persona }: AdultLandingPageProps) {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

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
            <p>Trusted by students in Flowood, Brandon, and the surrounding area.</p>
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
            <div className="text-center max-w-3xl mx-auto">
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
                        <CardTitle className="text-lg">{benefit.title}</CardTitle>
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
                      <CardTitle className="text-xl">{program.tagline}</CardTitle>
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
                <CardDescription>{persona.trial.promiseDescription}</CardDescription>
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
    </div>
  );
}
```

**Step 3: Run lint**
Skip for now; run once after Task 7.

**Step 4: Commit**
```bash
git add src/components/landing/adult-landing-page.tsx
git commit -m "add adult landing page component"
```

---

### Task 5: Add dynamic persona route page

**Parallel:** no
**Blocked by:** Task 1, Task 4
**Owned files:** `src/app/jiu-jitsu-programs/[slug]/page.tsx`

**Files:**
- Create: `src/app/jiu-jitsu-programs/[slug]/page.tsx`

**Step 1: Write the failing test**
No tests are configured for this repo. Skip.

**Step 2: Implement the route page**
```tsx
import { notFound } from "next/navigation";
import { AdultLandingPage } from "@/components/landing/adult-landing-page";
import {
  getPersonaLanding,
  personaLandingSlugs,
} from "@/data/persona-landing";

export function generateStaticParams() {
  return personaLandingSlugs.map((slug) => ({ slug }));
}

export default function PersonaLandingPage({
  params,
}: {
  params: { slug: string };
}) {
  const persona = getPersonaLanding(params.slug);

  if (!persona) {
    return notFound();
  }

  return <AdultLandingPage persona={persona} />;
}
```

**Step 3: Run lint**
Skip for now; run once after Task 7.

**Step 4: Commit**
```bash
git add src/app/jiu-jitsu-programs/[slug]/page.tsx
git commit -m "add persona landing route"
```

---

### Task 6: Update header, mobile nav, and footer programs lists

**Parallel:** no
**Blocked by:** Task 5
**Owned files:** `src/components/layout/header.tsx`, `src/components/layout/mobile-nav.tsx`, `src/components/layout/footer.tsx`

**Files:**
- Modify: `src/components/layout/header.tsx:42-46`
- Modify: `src/components/layout/mobile-nav.tsx:84-91`
- Modify: `src/components/layout/footer.tsx:66-76`

**Step 1: Write the failing test**
No tests are configured for this repo. Skip.

**Step 2: Update Programs lists**
`src/components/layout/header.tsx` (replace the `DropdownMenuContent` block):
```tsx
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/jiu-jitsu-programs/kids">Kids Jiu Jitsu</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/jiu-jitsu-programs/adult-jiu-jitsu">
                    Adult Jiu Jitsu
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/jiu-jitsu-programs/womens-jiu-jitsu">
                    Women's Jiu Jitsu
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/jiu-jitsu-programs/competition-team">
                    Grapple Competition Team
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/jiu-jitsu-programs/first-responders">
                    Jiu Jitsu for LEO/First Responders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/jiu-jitsu-programs/hospital-workers">
                    Jiu Jitsu for Hospital Workers
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
```

`src/components/layout/mobile-nav.tsx` (replace the `Programs` list contents):
```tsx
            <div className="mt-3 flex flex-col gap-2 pl-4">
              <NavLink
                href="/jiu-jitsu-programs/kids"
                className="block text-base font-medium text-foreground/80"
              >
                Kids Jiu Jitsu
              </NavLink>
              <NavLink
                href="/jiu-jitsu-programs/adult-jiu-jitsu"
                className="block text-base font-medium text-foreground/80"
              >
                Adult Jiu Jitsu
              </NavLink>
              <NavLink
                href="/jiu-jitsu-programs/womens-jiu-jitsu"
                className="block text-base font-medium text-foreground/80"
              >
                Women's Jiu Jitsu
              </NavLink>
              <NavLink
                href="/jiu-jitsu-programs/competition-team"
                className="block text-base font-medium text-foreground/80"
              >
                Grapple Competition Team
              </NavLink>
              <NavLink
                href="/jiu-jitsu-programs/first-responders"
                className="block text-base font-medium text-foreground/80"
              >
                Jiu Jitsu for LEO/First Responders
              </NavLink>
              <NavLink
                href="/jiu-jitsu-programs/hospital-workers"
                className="block text-base font-medium text-foreground/80"
              >
                Jiu Jitsu for Hospital Workers
              </NavLink>
            </div>
```

`src/components/layout/footer.tsx` (replace the Programs list):
```tsx
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/jiu-jitsu-programs/kids"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Kids Jiu Jitsu
                </Link>
              </li>
              <li>
                <Link
                  href="/jiu-jitsu-programs/adult-jiu-jitsu"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Adult Jiu Jitsu
                </Link>
              </li>
              <li>
                <Link
                  href="/jiu-jitsu-programs/womens-jiu-jitsu"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Women's Jiu Jitsu
                </Link>
              </li>
              <li>
                <Link
                  href="/jiu-jitsu-programs/competition-team"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Grapple Competition Team
                </Link>
              </li>
              <li>
                <Link
                  href="/jiu-jitsu-programs/first-responders"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Jiu Jitsu for LEO/First Responders
                </Link>
              </li>
              <li>
                <Link
                  href="/jiu-jitsu-programs/hospital-workers"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Jiu Jitsu for Hospital Workers
                </Link>
              </li>
            </ul>
```

**Step 3: Run lint**
Skip for now; run once after Task 7.

**Step 4: Commit**
```bash
git add src/components/layout/header.tsx src/components/layout/mobile-nav.tsx src/components/layout/footer.tsx
git commit -m "update programs navigation links"
```

---

### Task 7: Update home page audiences and run lint

**Parallel:** no
**Blocked by:** Task 6
**Owned files:** `src/app/page.tsx`

**Files:**
- Modify: `src/app/page.tsx:185-220`

**Step 1: Write the failing test**
No tests are configured for this repo. Skip.

**Step 2: Update audiences list**
Replace the `audiences` array with:
```ts
const audiences = [
  {
    title: "Kids",
    description:
      "Build confidence, discipline, and healthy habits from an early age.",
    link: "/jiu-jitsu-programs/kids",
  },
  {
    title: "Adult Jiu Jitsu",
    description:
      "Challenge yourself, get fit, and join a community of lifelong learners.",
    link: "/jiu-jitsu-programs/adult-jiu-jitsu",
  },
  {
    title: "Women's Jiu Jitsu",
    description:
      "Train in a supportive environment and build real-world confidence.",
    link: "/jiu-jitsu-programs/womens-jiu-jitsu",
  },
  {
    title: "Jiu Jitsu for LEO/First Responders",
    description:
      "Enhance control and composure with proven grappling techniques.",
    link: "/jiu-jitsu-programs/first-responders",
  },
  {
    title: "Jiu Jitsu for Hospital Workers",
    description:
      "Learn practical skills for managing challenging situations safely.",
    link: "/jiu-jitsu-programs/hospital-workers",
  },
  {
    title: "Grapple Competition Team",
    description:
      "Train with others who are dedicated to improving and prepare for tournaments.",
    link: "/jiu-jitsu-programs/competition-team",
  },
];
```

**Step 3: Run lint**
Run: `npm run lint`
Expected: ESLint completes with no errors.

**Step 4: Commit**
```bash
git add src/app/page.tsx
git commit -m "update home audiences links"
```

---

## Verification Checklist
- Visit `/jiu-jitsu-programs/competition-team`, `/adult-jiu-jitsu`, `/womens-jiu-jitsu`, `/first-responders`, `/hospital-workers`.
- Confirm hero CTA opens the short trial modal and validates fields.
- Confirm adult schedule grid excludes kids classes.
- Submit the form and confirm API returns 200 once `ZAPIER_TRIAL_LEADS_WEBHOOK_URL` is set.
- Confirm nav and footer Programs lists include new pages.
