export interface Event {
  id: string;
  title: string;
  description: string;
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
    id: "2",
    title: "Placido Santos No-Gi Seminar",
    description:
      "Come hang out and learn from the world's most famous uke, owner of Five Stones Jiu Jitsu, and purple belt under John Danaher, Placido Santos!",
    date: "2025-03-24",
    imageUrl: "/images/placido-santos-03-24-25.png",
    ctaText: "Get Tickets",
    ctaLink: "https://www.grapple.store/events/placido-santos-no-gi-seminar",
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
      amount: 60,
      currency: "USD",
      description: ``,
      payWhatYouWant: {
        enabled: true,
        suggestedAmount: 49,
        availableUntil: "2025-02-21T00:00:00-06:00",
      },
    },
    time: {
      start: "2025-03-24T13:00:00-06:00",
      end: "2025-03-24T16:00:00-06:00",
    },
    category: "seminar",
    capacity: 100,
  },
];
