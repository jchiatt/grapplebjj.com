import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-heading text-xl font-semibold">
                Grapple
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              A submission grappling gym in Pearl, Mississippi, dedicated to the
              art of Brazilian Jiu-Jitsu.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/schedule"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/livestream"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Livestream
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/articles"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pearl, Mississippi
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="font-technical text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  (123) 456-7890
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@grapplebjj.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  info@grapplebjj.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Grapple LLC. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
