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
    },
    time: {
      start: "2025-03-24T16:30:00-06:00",
      end: "2025-03-24T19:00:00-06:00",
    },
    category: "seminar",
    capacity: 100,
  },
  {
    id: "3",
    title:
      "[Hess Family Benefit] Odie Delaney & Bobby Emmons Wrestling Seminar",
    description: `SEMINAR IS FREE TO ANYONE WHO MAKES A DONATION OF ANY AMOUNT. Baby Levi, born February 17th, was diagnosed with Transposition of the Great Arteries (TGA) and will undergo open-heart surgery on February 25th, followed by 4-8 weeks in the MUSC Shawn Jenkins Children's Hospital NICU in Charleston, South Carolina. Cassidi and Austin Hess will remain by Levi's side facing financial burdens for medical bills, lodging, and daily expenses, all while caring for their 2-year-old daughter, Brinley hours from home. Join us on March 8th for a donation-based seminar to help ease their burden. Can't make it? We'll also be livestreaming on YouTube!

We really appreciate your help and kindness towards the Hess family. ANY donation of ANY AMOUNT helps!`,
    date: "2025-03-08",
    imageUrl: "/images/seminars/odie-delaney-03-08-25.jpeg",
    ctaText: "Get Tickets",
    ctaLink:
      "https://www.grapple.store/events/hess-family-benefit-odie-delaney-bobby-emmons-wrestling-seminar",
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
      amount: 0,
      currency: "USD",
      description: `Please make a donation of any amount to the Hess family. All proceeds go to the Hess family, and a donation of any amount helps!`,
    },
    time: {
      start: "2025-03-08T10:30:00-06:00",
      end: "2025-03-08T12:00:00-06:00",
    },
    category: "seminar",
    capacity: 100,
  },
];
