import Link from "next/link";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FullWidthSection } from "@/components/ui/full-width-section";
import { Headline } from "@/components/ui/headline";
import { CallToAction } from "@/components/ui/call-to-action";

export const metadata = {
  title: "The Grapple Standard: Our Hygiene Promise",
  description:
    "Hospital-grade hygiene and daily protocols that keep kids safe on the mats in Flowood, MS.",
};

const studentStandards = [
  "Trimmed nails are mandatory.",
  "Fresh gear only. No re-wearing used uniforms.",
  "Fever or cough? Stay home. We credit your time.",
];

export default function HygienePromisePage() {
  return (
    <div className="relative overflow-hidden bg-background">
      <FullWidthSection className="py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Hygiene Promise
            </p>
            <Headline as="h1" className="mt-4 max-w-2xl">
              The Grapple Standard: Our Hygiene Promise
            </Headline>
            <p className="mt-6 text-lg text-muted-foreground">
              A lab, not a locker room. Parents trust Grapple because we treat
              cleanliness like a core discipline, not an afterthought.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/jiu-jitsu-programs/kids#trial">
                  Train Safe. Claim Your Trial.
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Ask a question</Link>
              </Button>
            </div>
          </div>
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-xl">A Lab, Not a Locker Room.</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              We keep the Grapple environment clean, calm, and safe so parents
              feel confident and kids can focus on learning.
            </CardContent>
          </Card>
        </div>
      </FullWidthSection>

      <FullWidthSection className="bg-muted/40 py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-border/60">
            <CardHeader>
              <div className="flex items-center gap-3 text-primary">
                <ShieldCheck className="h-5 w-5" />
                <CardTitle>The Chemistry</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              We exclusively use Virex II 256, a hospital-grade quaternary
              disinfectant trusted in medical environments.
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardHeader>
              <div className="flex items-center gap-3 text-primary">
                <ShieldCheck className="h-5 w-5" />
                <CardTitle>The Protocol</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Mats are sanitized immediately after every single class block.
              Hygiene is non-negotiable.
            </CardContent>
          </Card>
        </div>
      </FullWidthSection>

      <FullWidthSection className="py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-xl">The Student Standard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              {studentStandards.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <div>
            <Headline as="h2" size="h2">
              A cleaner gym builds more confident kids.
            </Headline>
            <p className="mt-4 text-lg text-muted-foreground">
              Parents in Flowood, Brandon, and Pearl choose Grapple because we
              protect families with real standards.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/jiu-jitsu-programs/kids#trial">
                  Train Safe. Claim Your Trial.
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </FullWidthSection>

      <FullWidthSection className="py-16 md:py-24">
        <CallToAction
          title="Train Safe. Claim Your Trial."
          description="Experience the Grapple difference with a clean, coach-led kids program."
          primaryAction={{
            label: "Claim Your Trial",
            href: "/jiu-jitsu-programs/kids#trial",
          }}
          secondaryAction={{
            label: "Contact Us",
            href: "/contact",
          }}
        />
      </FullWidthSection>
    </div>
  );
}
