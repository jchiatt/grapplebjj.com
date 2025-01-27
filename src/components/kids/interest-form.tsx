"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2 } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

export function InterestForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    phone?: string;
  }>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    setValidationErrors({});

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const errors: { email?: string; phone?: string } = {};

    // Validate email
    if (!EMAIL_REGEX.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    // Validate phone
    if (!phone) {
      errors.phone = "Phone number is required";
    } else if (!PHONE_REGEX.test(phone)) {
      errors.phone = "Please enter a valid phone number (e.g., 769-257-0260)";
    }

    // If there are validation errors, stop submission
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setStatus("idle");
      return;
    }

    const data = {
      parentName: formData.get("parentName"),
      email,
      phone,
      childName: formData.get("childName"),
      childAge: formData.get("childAge"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/kids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setStatus("success");
      formRef.current?.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setErrorMessage(
        "Sorry, we couldn't submit your interest form. Please try again or call us directly."
      );
    }
  }

  return (
    <section className="max-w-xl mx-auto space-y-8 bg-card p-8 rounded-lg">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold font-heading">Express Interest</h2>
        <p className="text-muted-foreground">
          Be one of our first students! Fill out this form to express interest
          in our kids program.
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {status === "success" && (
          <div className="flex items-center gap-2 p-3 text-sm text-green-600 bg-green-50 dark:bg-green-950/50 dark:text-green-400 rounded-md">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <p>
              Thanks for your interest! We&apos;ll be in touch soon about kids
              classes.
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/50 dark:text-red-400 rounded-md">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p>{errorMessage}</p>
          </div>
        )}

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="parentName">Parent&apos;s Name</Label>
            <Input
              id="parentName"
              name="parentName"
              placeholder="Your name"
              required
              disabled={status === "submitting"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              required
              disabled={status === "submitting"}
              aria-invalid={!!validationErrors.email}
              aria-describedby={
                validationErrors.email ? "email-error" : undefined
              }
            />
            {validationErrors.email && (
              <p id="email-error" className="text-sm text-red-500 mt-1">
                {validationErrors.email}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(769) 257-0260"
              required
              disabled={status === "submitting"}
              aria-invalid={!!validationErrors.phone}
              aria-describedby={
                validationErrors.phone ? "phone-error" : undefined
              }
            />
            {validationErrors.phone && (
              <p id="phone-error" className="text-sm text-red-500 mt-1">
                {validationErrors.phone}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="childName">Child&apos;s Name</Label>
            <Input
              id="childName"
              name="childName"
              placeholder="Child's name"
              required
              disabled={status === "submitting"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="childAge">Child&apos;s Age (Age 4 Minimum)</Label>
            <Input
              id="childAge"
              name="childAge"
              type="number"
              min="4"
              max="17"
              placeholder="Age"
              required
              disabled={status === "submitting"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Additional Information (Optional)</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Any additional information you'd like us to know?"
              disabled={status === "submitting"}
              className="min-h-[120px]"
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Submitting..." : "Express Interest"}
        </Button>
      </form>
    </section>
  );
}
