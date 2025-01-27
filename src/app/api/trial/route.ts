import { NextResponse } from "next/server";

const ZAPIER_WEBHOOK_URL =
  "https://hooks.zapier.com/hooks/catch/1776164/2fbwlmp/";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const response = await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    const result = await response.json();

    return NextResponse.json(
      { message: "Form submitted successfully", id: result.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { message: "Failed to submit form" },
      { status: 500 }
    );
  }
}
