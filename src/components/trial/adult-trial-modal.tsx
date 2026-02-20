"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PersonaLanding } from "@/data/persona-landing";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const EXPERIENCE_OPTIONS = [
  { value: "new", label: "New to jiu jitsu" },
  { value: "some", label: "Some training" },
  { value: "regular", label: "Regular training" },
  { value: "competitor", label: "Competition-focused" },
];

type FormStatus = "idle" | "submitting" | "success" | "error";

interface AdultTrialModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  persona: PersonaLanding;
}

export function AdultTrialModal({
  open,
  onOpenChange,
  persona,
}: AdultTrialModalProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});
  const [experienceLevel, setExperienceLevel] = useState("");
  const [goals, setGoals] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (open) return;
    setStatus("idle");
    setErrorMessage("");
    setValidationErrors({});
    setExperienceLevel("");
    setGoals("");
    formRef.current?.reset();
  }, [open]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    setValidationErrors({});

    const formData = new FormData(event.currentTarget);
    const name = (formData.get("name") as string) ?? "";
    const email = (formData.get("email") as string) ?? "";
    const phone = (formData.get("phone") as string) ?? "";
    const errors: { name?: string; email?: string; phone?: string } = {};

    if (!name.trim()) {
      errors.name = "Please enter your name.";
    }

    if (!EMAIL_REGEX.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!phone) {
      errors.phone = "Phone number is required.";
    } else if (!PHONE_REGEX.test(phone)) {
      errors.phone = "Please enter a valid phone number.";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setStatus("idle");
      return;
    }

    const payload = {
      name,
      email,
      phone,
      experienceLevel: experienceLevel || undefined,
      goals: goals || undefined,
      personaSlug: persona.slug,
      personaLabel: persona.label,
      source: "landing-page",
    };

    try {
      const response = await fetch("/api/trial-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setStatus("success");
      formRef.current?.reset();
      setExperienceLevel("");
      setGoals("");
    } catch (error) {
      console.error("Error submitting trial lead:", error);
      setStatus("error");
      setErrorMessage(
        "Sorry, we could not submit your request. Please try again or call us directly."
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        {status === "success" ? (
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle>You are in!</DialogTitle>
                <DialogDescription>
                  Thanks for claiming the 3-Day Trial for {persona.label}.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-start gap-3 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                <p>We will call within 1 business day to schedule your trial.</p>
              </div>
              <Button type="button" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/40 p-4 space-y-3">
              <p className="text-sm font-medium text-foreground">
                Here is a quick video of next steps!
              </p>
              <div className="aspect-[9/16] w-full overflow-hidden rounded-lg border border-border bg-black">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${persona.hero.videoId}?playsinline=1`}
                  title={`${persona.label} Next Steps`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle>{persona.trial.title}</DialogTitle>
              <DialogDescription>
                Share your info and we will call within 1 business day to schedule
                your trial.
              </DialogDescription>
            </DialogHeader>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {status === "error" && (
                <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    disabled={status === "submitting"}
                    aria-invalid={!!validationErrors.name}
                    aria-describedby={
                      validationErrors.name ? "name-error" : undefined
                    }
                  />
                  {validationErrors.name && (
                    <p id="name-error" className="text-sm text-red-500">
                      {validationErrors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    required
                    disabled={status === "submitting"}
                    aria-invalid={!!validationErrors.email}
                    aria-describedby={
                      validationErrors.email ? "email-error" : undefined
                    }
                  />
                  {validationErrors.email && (
                    <p id="email-error" className="text-sm text-red-500">
                      {validationErrors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(601) 673-4320"
                    required
                    disabled={status === "submitting"}
                    aria-invalid={!!validationErrors.phone}
                    aria-describedby={
                      validationErrors.phone ? "phone-error" : undefined
                    }
                  />
                  {validationErrors.phone && (
                    <p id="phone-error" className="text-sm text-red-500">
                      {validationErrors.phone}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience level (optional)</Label>
                  <Select
                    value={experienceLevel}
                    onValueChange={setExperienceLevel}
                  >
                    <SelectTrigger id="experience">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="goals">Goals (optional)</Label>
                  <Textarea
                    id="goals"
                    name="goals"
                    placeholder="Tell us what you want to get out of training"
                    value={goals}
                    onChange={(event) => setGoals(event.target.value)}
                    disabled={status === "submitting"}
                    className="min-h-[120px]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={status === "submitting"}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
