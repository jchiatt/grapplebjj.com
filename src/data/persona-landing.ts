export type PersonaBenefitIcon =
  | "target"
  | "trophy"
  | "users"
  | "dumbbell"
  | "clock"
  | "shield-check"
  | "heart-pulse"
  | "shield"
  | "siren"
  | "stethoscope";

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
    icon: PersonaBenefitIcon;
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
      ctaLabel: "Claim Your Trial",
      videoId: "6HPsq1FB8lg",
    },
    benefits: [
      {
        title: "Game-Plan Training",
        description: "Build a clear A-game with feedback each week.",
        icon: "target",
      },
      {
        title: "Live Rounds Culture",
        description: "Intentional sparring that mimics tournament pace.",
        icon: "trophy",
      },
      {
        title: "Accountability Crew",
        description: "Train alongside teammates who keep you consistent.",
        icon: "users",
      },
    ],
    trial: {
      title: "The Trial.",
      description:
        "See what competitive training feels like without the pressure.",
      bullets: [
        "Goal setting and game-plan check-in.",
        "Coach feedback during live rounds.",
        "Find your training group and schedule.",
      ],
      ctaLabel: "Claim Your Trial",
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
      description: "Claim the Trial and start building your game.",
      ctaLabel: "Claim Your Trial",
    },
  },
  {
    slug: "adult-jiu-jitsu",
    label: "Adult Jiu Jitsu",
    hero: {
      headline: "The best hour of your day.",
      description:
        "Get fit, sharpen your mind, and join a welcoming community in Flowood.",
      note: "No experience needed. Start with a trial.",
      ctaLabel: "Claim Your Trial",
      videoId: "6HPsq1FB8lg",
    },
    benefits: [
      {
        title: "Fitness That Sticks",
        description: "Full-body training that is fun and sustainable.",
        icon: "dumbbell",
      },
      {
        title: "Stress Reset",
        description: "Leave the day on the mats and go home clear-headed.",
        icon: "clock",
      },
      {
        title: "Community First",
        description: "Train with coaches and teammates who know your name.",
        icon: "users",
      },
    ],
    trial: {
      title: "The Trial.",
      description: "Try a class and see how jiu jitsu fits your life.",
      bullets: [
        "Beginner-friendly coaching.",
        "Flexible schedule options.",
        "No long-term commitment to start.",
      ],
      ctaLabel: "Claim Your Trial",
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
      {
        question: "How much does membership cost?",
        answer:
          "We have flexible options for every budget. Book your trial to chat with a coach about rates.",
      },
      {
        question: "Do I need to buy gear first?",
        answer:
          "No! For your trial, comfortable activewear is perfect. We can loan you a Gi if needed.",
      },
    ],
    finalCta: {
      title: "Ready to start training?",
      description: "Claim the Trial and meet the Grapple team.",
      ctaLabel: "Claim Your Trial",
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
      ctaLabel: "Claim Your Trial",
      videoId: "6HPsq1FB8lg",
    },
    benefits: [
      {
        title: "Safe, Controlled Training",
        description: "Clear coaching and a respectful training culture.",
        icon: "shield-check",
      },
      {
        title: "Real-World Confidence",
        description: "Build calm, capable self-defense skills over time.",
        icon: "heart-pulse",
      },
      {
        title: "Supportive Coaches",
        description: "We match you with good partners and guide every rep.",
        icon: "users",
      },
    ],
    trial: {
      title: "The Trial.",
      description: "Train at your pace and see how empowering jiu jitsu can be.",
      bullets: [
        "Learn escapes and control positions.",
        "Train with clear coaching and good partners.",
        "Build confidence on and off the mats.",
      ],
      ctaLabel: "Claim Your Trial",
      promiseTitle: "Respect first, always.",
      promiseDescription:
        "We prioritize safety, consent, and supportive training partners.",
    },
    faqs: [
      {
        question: "Do I need experience?",
        answer: "All experience levels welcome.",
      },
      {
        question: "Will I have training partners?",
        answer:
          "Yes. Our coaches help match you with good partners. Or you can bring a friend for their first class to train with you and earn $10!",
      },
      {
        question: "Is this self-defense focused?",
        answer: "Yes. We teach control, escapes, and awareness.",
      },
    ],
    finalCta: {
      title: "Ready to build confidence?",
      description: "Claim the Trial and meet the Grapple team.",
      ctaLabel: "Claim Your Trial",
    },
  },
  {
    slug: "first-responders",
    label: "Jiu Jitsu for Law Enforcement Officers/First Responders",
    hero: {
      headline: "Control first. Go home safe.",
      description:
        "Grappling built for control, restraint, and composure under pressure.",
      note: "Ask about our pay-what-you-can option for first responders.",
      ctaLabel: "Claim Your Get Home Safe Trial",
      videoId: "6HPsq1FB8lg",
    },
    benefits: [
      {
        title: "Control Without Striking",
        description: "Use leverage and positioning to manage conflict safely.",
        icon: "shield",
      },
      {
        title: "Decision-Making Under Pressure",
        description: "Train calm responses that hold up in stressful moments.",
        icon: "target",
      },
      {
        title: "Team Accountability",
        description: "Train with teammates who value safety and respect.",
        icon: "siren",
      },
    ],
    trial: {
      title: "The Get Home Safe Trial.",
      description: "See how grappling supports control and resilience on the job.",
      bullets: [
        "Focus on grips, control, and safe restraint.",
        "Scenario-aware training and live rounds.",
        "Coaching that respects your role.",
      ],
      ctaLabel: "Claim Your Get Home Safe Trial",
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
      description: "Claim the Get Home Safe Trial and meet the Grapple team.",
      ctaLabel: "Claim Your Get Home Safe Trial",
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
      ctaLabel: "Claim Your Safe Shift Trial",
      videoId: "6HPsq1FB8lg",
    },
    benefits: [
      {
        title: "Body Mechanics That Protect You and Your Patients",
        description:
          "Use leverage and positioning to stay calm and safe during stressful patient situations.",
        icon: "stethoscope",
      },
      {
        title: "Calm Under Stress",
        description: "Build composure that helps in high-pressure moments.",
        icon: "heart-pulse",
      },
      {
        title: "Supportive Community",
        description: "Train with people who understand demanding schedules.",
        icon: "users",
      },
    ],
    trial: {
      title: "The 3-Day Safe Shift Trial.",
      description: "A 3-day, structured, safe introduction to jiu jitsu training.",
      bullets: [
        "Learn safe control and escapes.",
        "A positive outlet after long shifts.",
        "Flexible schedule and coaching.",
      ],
      ctaLabel: "Claim Your Safe Shift Trial",
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
      description: "Claim the 3-Day Safe Shift Trial and meet the Grapple team.",
      ctaLabel: "Claim Your Safe Shift Trial",
    },
  },
];

export const personaLandingSlugs = personaLandings.map((persona) => persona.slug);

export function getPersonaLanding(slug: string) {
  return personaLandings.find((persona) => persona.slug === slug);
}
