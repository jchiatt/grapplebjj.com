import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Headline } from "@/components/ui/headline";
import { cn } from "@/lib/utils";

interface CoachProfileProps {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
  blurImageUrl: string;
  learnMoreHref: string;
  featured?: boolean;
}

function CoachProfile({
  name,
  role,
  bio,
  imageSrc,
  blurImageUrl,
  learnMoreHref,
  featured = false,
}: CoachProfileProps) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-center gap-8 p-8",
        featured ? "bg-secondary/50" : ""
      )}
    >
      <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/40 via-primary/10 to-transparent dark:from-primary/70 dark:via-primary/20 dark:to-transparent" />
        <Image
          src={imageSrc}
          alt={`Photo of ${name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          blurDataURL={blurImageUrl}
          placeholder="blur"
          className="object-contain rounded-xl"
          loading="lazy"
        />
      </div>
      <div className="flex-1 text-center md:text-left">
        <Headline as="h3" size="h3" className="mb-2">
          {name}
        </Headline>
        <p className="text-lg font-semibold text-primary mb-4">{role}</p>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{bio}</p>
        <Button asChild>
          <Link href={learnMoreHref}>Learn More</Link>
        </Button>
      </div>
    </div>
  );
}

export function CoachProfiles() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Headline as="h2" size="h2" className="text-center">
          Meet Our Coaches
        </Headline>

        <p className="text-center text-lg text-foreground mb-16">
          Our coaches are dedicated to helping you achieve your goals through
          the art of jiu jitsu.
        </p>

        {/* Featured Coach (JC) */}
        <div className="mb-16">
          <CoachProfile
            name="J.C. Hiatt"
            role="Owner & Head Coach"
            bio="I'm passionate about creating an environment where people can learn and grow through the art of submission grappling. With years of experience in no-gi submission grappling and a background in software engineering, I try to bring a systematic, technical approach to both learning and teaching that helps students understand not just the how, but the why behind every technique."
            imageSrc="/images/coaches/jc-hiatt.png"
            blurImageUrl="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCABbAFsDASIAAhEBAxEB/8QAGwAAAwEBAQEBAAAAAAAAAAAAAwQFAgEGAAf/xAAgEAABBAMBAQEBAQAAAAAAAAAAAQIDBBEhMUESIgUT/8QAGQEBAQEBAQEAAAAAAAAAAAAAAgEDAAQF/8QAGhEBAQEBAQEBAAAAAAAAAAAAAAERAgMSIf/aAAwDAQACEQMRAD8A/DoF/SFul4Qa7v0hdorw+X5T9fW9F2rxCjHwm1eIUo+HqjydNrwXmGV4LzJocBMs+kux6VbKEqx6IoSf06w4/pxqmXTaGmKbyAa439GavPVnfpD0FBeHmKjsvQ9H/PXgeOf0/WvRVF0hTi4Sqi6Qqw8Q3jzUVeAJuDHgCYUFMsp0lWU6V7PpJs+iWJ0hhFNS6UDnYbGkphrjf0LNca+jOx2oNNP0ek/n+EGqzDi9QTGBzjC9OtegqeFSHhJqeFSJdFxjpnOgM3DedAZV0WIRsekmz6VLC6UlWV6KKmzdF1XYxN0XXpbHa6incmUQ1gPyP0Xhjw4r024wKxx7KFduMCsK1TraRCjE7RNg8HWO0HA0196ASu0cV+gEr9FxdAsO6TLC9G53k+ZwpHaVk2oLGwrtnzWiSsI018B2sO/5kDRGxjUTcHyMCsaQ6PFoOjgDTX1g7BtEc8WlkPnvFZnlxNYmeJPdk1K8XV2VLhytptQzGgo9qNxNI6tMYb+ArG6CfBwvkabRDhpCLWjLlOqZcKBQZVEpnDcojMIYVkcDRdnZDDenNIah3gfhQQgKEPgKRqNAmDMYQiP/2Q=="
            learnMoreHref="/coach/jc"
            featured
          />
        </div>

        {/* Other Coaches */}
        {/* <div className="grid md:grid-cols-2 gap-8">
          <CoachProfile
            name="Coach Name"
            role="Assistant Coach"
            bio="Bio placeholder text for the assistant coach position. This will be updated with the actual coach's information and background when available."
            imageSrc="/images/coaches/placeholder-1.jpg"
            learnMoreHref="/about/coach-1"
          />
          <CoachProfile
            name="Coach Name"
            role="Assistant Coach"
            bio="Bio placeholder text for the assistant coach position. This will be updated with the actual coach's information and background when available."
            imageSrc="/images/coaches/placeholder-2.jpg"
            learnMoreHref="/about/coach-2"
          />
        </div> */}
      </div>
    </section>
  );
}
