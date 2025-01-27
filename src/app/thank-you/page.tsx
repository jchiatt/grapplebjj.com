import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="container py-24">
      <div className="mx-auto max-w-2xl md:max-w-3xl text-center">
        <h1 className="font-heading text-4xl font-bold">Thank You!</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Your account has been created successfully. We&apos;ll see you on the
          mats!
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
