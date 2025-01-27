"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function InterestForm() {
  return (
    <section className="max-w-xl mx-auto space-y-8 bg-card p-8 rounded-lg">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold font-heading">Express Interest</h2>
        <p className="text-muted-foreground">
          Be one of our first students! Fill out this form to express interest
          in our kids program.
        </p>
      </div>

      <form className="space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="parentName">Parent&apos;s Name</Label>
            <Input id="parentName" placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" placeholder="(555) 555-5555" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="childName">Child&apos;s Name</Label>
            <Input id="childName" placeholder="Child's name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="childAge">Child&apos;s Age</Label>
            <Input
              id="childAge"
              type="number"
              min="4"
              max="17"
              placeholder="Age"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Additional Information</Label>
            <Textarea
              id="message"
              placeholder="Any questions or additional information you'd like to share?"
            />
          </div>
        </div>
        <Button type="submit" className="w-full">
          Submit Interest
        </Button>
      </form>
    </section>
  );
}
