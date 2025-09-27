export interface Event {
  id: string;
  title: string;
  description: string;
  longDescription?: string[];
  date: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  featured?: boolean;
  // Additional metadata
  location: {
    name: string;
    address?: string;
    instructions?: string;
    mapsLink?: string;
  };
  price:
    | {
        amount?: number;
        currency: string;
        description?: string;
        payWhatYouWant?: {
          enabled: true;
          minimumAmount?: number;
          suggestedAmount?: number;
          availableUntil?: string; // ISO date string
        };
      }
    | {
        type: "free";
      };
  time: {
    start: string; // ISO time string
    end?: string; // ISO time string
  };
  category: "tournament" | "seminar" | "camp" | "social";
  registrationDeadline?: string;
  capacity?: number;
}

export const upcomingEvents: Event[] = [
  {
    id: "mason-fowler-no-gi-seminar",
    title: "Mason Fowler No-Gi Seminar",
    description:
      "🔥 Dont miss your chance to train with Mason Fowler — the UFC BJJ Light Heavyweight Champion and two-time ADCC veteran. He's bringing world-class no-gi techniques and championship-level strategy straight to Pearl, MS. Spots are limited — secure yours now!",
    longDescription: [
      "Train with one of the best in the world. Mason Fowler, the current UFC BJJ Light Heavyweight Champion and a two-time ADCC veteran, is coming to Pearl, MS for an exclusive no-gi seminar.",
      "Mason has competed at the highest levels of submission grappling, earning wins over some of the sport's biggest names. His technical precision, relentless pace, and proven strategies make him one of the most respected competitors in modern jiu jitsu. This is your chance to learn directly from an elite athlete who has tested his skills on the biggest stages in the world.",
      "Event Details:",
      "📅 Date: Wednesday, October 9, 2025",
      "🕕 Time: 6:00 PM",
      "📍 Location: Grapple Jiu Jitsu, Pearl, MS",
      "Why You Should Attend:",
      "Learn from the UFC BJJ Light Heavyweight Champion",
      "Gain insights from a two-time ADCC veteran with years of world-class experience",
      "Discover competition-tested no-gi techniques and strategies you can apply immediately",
      "Train alongside a motivated community of grapplers",
      "Spots are limited — reserve your spot today and don't miss this rare opportunity to level up your jiu jitsu with one of the best in the game.",
    ],
    date: "2025-10-09",
    imageUrl: "/images/events/mason-fowler-oct-2025.jpg",
    ctaText: "Reserve Your Spot",
    ctaLink: "https://www.grapple.store/events/mason-fowler-no-gi-seminar",
    featured: true,
    location: {
      name: "Grapple Jiu Jitsu",
      address: "5709 US-80 E, Pearl, MS 39208",
      mapsLink:
        "https://www.google.com/maps/place/Grapple/@32.2846794,-90.0599141,15z/data=!3m1!4b1!4m6!3m5!1s0x86282be6569a058b:0x6fa2de5de2bfc836!8m2!3d32.2846807!4d-90.0414817!16s%2Fg%2F11k7vbhgm5?entry=ttu&g_ep=EgoyMDI1MDEyMi4wIKXMDSoASAFQAw%3D%3D",
      instructions:
        "We're located inside Focus Fit gym, on the second floor. Follow the jiu jitsu signs inside.",
    },
    price: {
      amount: 80,
      currency: "USD",
      description:
        "Registration is $80 per participant and is limited to 60 attendees. Note: If you register for the October 11 MSGF tournament, you can get 50% off (reach out for coupon code after registering for MSGF).",
    },
    time: {
      start: "2025-10-09T18:00:00-05:00",
      end: "2025-10-09T20:00:00-05:00",
    },
    category: "seminar",
    capacity: 60,
  },
];
