import Link from "next/link";
import Image from "next/image";
import testimonialData from "@/data/testimonials.json";

export function Testimonials() {
  return (
    <section className="container py-24">
      <h2 className="mb-12 text-center font-heading text-3xl font-bold">
        What Our Students Say
      </h2>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonialData.testimonials.slice(0, 5).map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-accent/80 ${
              // Make the middle testimonials span 2 rows on larger screens
              index === 1 || index === 3 ? "lg:col-span-1 lg:row-span-2" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
            <blockquote className="mt-4">
              <p className="text-muted-foreground">{testimonial.content}</p>
            </blockquote>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/testimonials"
          className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          See more testimonials →
        </Link>
      </div>
    </section>
  );
}
