import { NextResponse } from "next/server";

const ZAPIER_WEBHOOK_URL =
  "https://hooks.zapier.com/hooks/catch/1776164/2fbwlmp/";

export async function POST(request: Request) {
  try {
    const body = await request.json();

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
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
