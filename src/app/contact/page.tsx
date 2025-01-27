import { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { MapPin, Phone, Mail, Navigation } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Grapple Jiu Jitsu",
  description:
    "Get in touch with Grapple Jiu Jitsu. Located in Pearl, Mississippi, we're here to answer your questions about no-gi submission grappling training.",
};

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold tracking-tight">Contact Us</h1>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-2xl font-semibold">Get In Touch</h2>
              <p className="text-muted-foreground">
                Have questions about training? Want to learn more about our gym?
                We&apos;re here to help.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Location</p>
                  <a
                    href="https://www.google.com/maps/place/Grapple/@32.2846794,-90.0599141,15z/data=!3m1!4b1!4m6!3m5!1s0x86282be6569a058b:0x6fa2de5de2bfc836!8m2!3d32.2846807!4d-90.0414817!16s%2Fg%2F11k7vbhgm5?entry=ttu&g_ep=EgoyMDI1MDEyMi4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-muted-foreground hover:text-foreground transition-colors inline-flex items-start gap-1"
                  >
                    <span>
                      5709 US 80 E<br />
                      2nd Floor
                      <br />
                      Pearl, MS 39208
                    </span>
                    <Navigation className="h-4 w-4 mt-1 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We are located on the 2nd floor of Focus Fit gym. Walk in,
                    and follow the jiu jitsu signs. Staircase is on the left
                    after you&apos;ve walked all the way back. If you can&apos;t
                    find us, ask the front desk and they&apos;ll be happy to
                    help!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a
                    href="tel:+17692570260"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    (769) 257-0260
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:info@grapplebjj.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    info@grapplebjj.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-lg border bg-card p-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
