"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type FormStatus = "idle" | "submitting" | "success" | "error";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

interface ConfidenceTrialModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConfidenceTrialModal({
  open,
  onOpenChange,
}: ConfidenceTrialModalProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    phone?: string;
  }>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (open) return;
    setStatus("idle");
    setErrorMessage("");
    setValidationErrors({});
    formRef.current?.reset();
  }, [open]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    setValidationErrors({});

    const formData = new FormData(event.currentTarget);
    const parentFirstName = (formData.get("parentFirstName") as string) ?? "";
    const parentLastName = (formData.get("parentLastName") as string) ?? "";
    const email = (formData.get("email") as string) ?? "";
    const phone = (formData.get("phone") as string) ?? "";
    const errors: { email?: string; phone?: string } = {};

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
      parentFirstName,
      parentLastName,
      email,
      phone,
    };

    try {
      const response = await fetch("/api/kids-confidence-trial", {
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
    } catch (error) {
      console.error("Error submitting confidence trial form:", error);
      setStatus("error");
      setErrorMessage(
        "Sorry, we couldn't submit your trial request. Please try again or call us directly."
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
                <DialogTitle>You&apos;re in!</DialogTitle>
                <DialogDescription>
                  Thanks for claiming the 3-Day Confidence Trial.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-start gap-3 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                <p>
                  We&apos;ll give you a call within 1 business day to schedule
                  your trial.
                </p>
              </div>
              <Button type="button" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/40 p-4 space-y-3">
              <p className="text-sm font-medium text-foreground">
                Here&apos;s a quick video of next steps!
              </p>
              <div className="aspect-[9/16] w-full overflow-hidden rounded-lg border border-border bg-black">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/KDpqRLrvq0U?playsinline=1"
                  title="3-Day Confidence Trial Thank You"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle>Claim Your 3-Day Confidence Trial</DialogTitle>
              <DialogDescription>
                Share your info and we&apos;ll call within 1 business day to
                schedule your trial.
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
                  <Label htmlFor="parentFirstName">Parent first name</Label>
                  <Input
                    id="parentFirstName"
                    name="parentFirstName"
                    placeholder="First name"
                    required
                    disabled={status === "submitting"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentLastName">Parent last name</Label>
                  <Input
                    id="parentLastName"
                    name="parentLastName"
                    placeholder="Last name"
                    required
                    disabled={status === "submitting"}
                  />
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
