"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useMemo } from "react";
import { FloatingHearts } from "@/components/ui/floating-hearts";
import Image from "next/image";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  gender: z.enum(["male", "female"], {
    required_error: "Please select a gender.",
  }),
  address: z.string().min(5, {
    message: "Please enter your street address.",
  }),
  city: z.string().min(2, {
    message: "Please enter your city.",
  }),
  state: z.string().length(2, {
    message: "Please enter your state (2-letter code).",
  }),
  zipCode: z.string().length(5, {
    message: "Please enter a valid ZIP code.",
  }),
  birthday: z.string().min(1, {
    message: "Please enter your birthday.",
  }),
  couponCode: z.string().optional(),
});

export default function BeminePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: undefined,
      address: "",
      city: "",
      state: "",
      zipCode: "",
      birthday: "",
      couponCode: "ANTHONYMITCHELL",
    },
  });

  const onSubmit = useMemo(
    () => async (values: z.infer<typeof formSchema>) => {
      try {
        setIsSubmitting(true);

        // Format the birthday to mm/dd/yyyy
        const birthdayDate = new Date(values.birthday);
        const formattedBirthday = `${(birthdayDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${birthdayDate
          .getDate()
          .toString()
          .padStart(2, "0")}/${birthdayDate.getFullYear()}`;

        // Create the URL with query parameters
        const baseUrl = "https://members.grapplejj.com/signup";
        const queryParams = new URLSearchParams({
          membership_id: "6823",
          type: "2",
          first_name: values.firstName,
          last_name: values.lastName,
          gender: values.gender === "male" ? "m" : "f",
          phone: values.phone,
          gd_email: values.email,
          dob: formattedBirthday,
          address_street: values.address,
          address_city: values.city,
          address_state: values.state,
          address_zip: values.zipCode,
          address_country: "US",
          discount_code: values.couponCode || "",
        });

        const redirectUrl = `${baseUrl}?${queryParams.toString()}`;

        // Show alert before redirecting
        alert(
          "You will now be redirected to complete your registration and sign our waiver."
        );

        // Redirect to the gym software signup page
        window.location.href = redirectUrl;
      } catch (error) {
        console.error("Error processing form:", error);
        alert("There was an error processing your form. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  return (
    <div className="container py-24">
      <FloatingHearts />
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h1 className="font-heading my-4 text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Oh, hey Precision.
          </h1>

          <p className="mt-4 text-xl text-muted-foreground">
            Roses are red
            <br />
            Violets are blue,
            <br />
            We may be blind,
            <br />
            But we see the value in you.
          </p>

          <p className="my-8 text-lg text-pink-500">
            Get 100% off 2025 using coupon code{" "}
            <span className="font-bold text-black dark:text-white">
              ANTHONYMITCHELL.
            </span>
          </p>

          <div className="w-full aspect-square my-12 relative max-w-xl mx-auto">
            <Image
              src="/bemine.jpg"
              alt="Valentine's Day Special"
              fill
              className="object-cover rounded-lg"
              style={{ objectPosition: "center 25%" }}
              priority
            />
          </div>
        </div>

        <div className="mt-8 p-8 rounded-lg bg-white dark:bg-black shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="couponCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Coupon Code
                        <span className="text-red-500 font-bold text-sm">
                          (100% off! 💋)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter coupon code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(555) 555-5555"
                        type="tel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birthday</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="TX"
                          maxLength={2}
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.toUpperCase())
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input placeholder="12345" maxLength={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </div>

        <div className="mt-16 space-y-8">
          <div className="w-full aspect-square relative max-w-xl mx-auto">
            <Image
              src="/bemine1.png"
              alt="Valentine's Day Special 1"
              fill
              className="object-cover rounded-lg"
              style={{ objectPosition: "center center" }}
            />
          </div>

          <div className="w-full aspect-square relative max-w-xl mx-auto">
            <Image
              src="/bemine2.png"
              alt="Valentine's Day Special 2"
              fill
              className="object-cover rounded-lg"
              style={{ objectPosition: "center center" }}
            />
          </div>

          <div className="w-full aspect-square relative max-w-xl mx-auto">
            <Image
              src="/bemine3.png"
              alt="Valentine's Day Special 3"
              fill
              className="object-cover rounded-lg"
              style={{ objectPosition: "center center" }}
            />
          </div>
        </div>

        <div className="text-center mt-16 mb-8">
          <h2 className="font-heading text-6xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            XOXO,
            <br />
            &mdash; Grapple
          </h2>
        </div>
      </div>
    </div>
  );
}
