import { NextResponse } from "next/server";

const ZAPIER_WEBHOOK_URL =
  "https://hooks.zapier.com/hooks/catch/1776164/2ftpg2q/";

interface Child {
  name: string;
  age: number;
}

interface FormData {
  parentName: string;
  email: string;
  phone: string;
  children: Child[];
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as FormData;

    // Validate the request body
    if (
      !body.parentName ||
      !body.email ||
      !body.phone ||
      !body.children?.length
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate each child
    for (const child of body.children) {
      if (!child.name || !child.age || child.age < 4 || child.age > 17) {
        return NextResponse.json(
          { error: "Invalid child information" },
          { status: 400 }
        );
      }
    }

    const response = await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting kids interest form:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
