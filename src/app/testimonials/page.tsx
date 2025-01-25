"use client";

import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { CallToAction } from "@/components/ui/call-to-action";
import testimonialData from "@/data/testimonials.json";
import { motion } from "framer-motion";

export default function TestimonialsPage() {
  return (
    <div className="container py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-heading text-4xl font-bold">
          Student Testimonials
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Discover how jiu jitsu has benefitted our members
        </p>
      </div>

      <motion.div
        className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        layout
      >
        {testimonialData.testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            name={testimonial.name}
            role={testimonial.role}
            content={testimonial.content}
            image={testimonial.image}
          />
        ))}
      </motion.div>

      <CallToAction
        title="Ready to start your own journey?"
        description="Join us on the mats and see how jiu jitsu can transform your life."
        primaryAction={{
          label: "Schedule Free Class",
          href: "/trial",
        }}
        secondaryAction={{
          label: "FAQ",
          href: "/faq",
        }}
      />
    </div>
  );
}
