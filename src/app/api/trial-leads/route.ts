import { NextResponse } from "next/server";

const ZAPIER_TRIAL_LEADS_WEBHOOK_URL =
  process.env.ZAPIER_TRIAL_LEADS_WEBHOOK_URL;

export async function POST(request: Request) {
  try {
    if (!ZAPIER_TRIAL_LEADS_WEBHOOK_URL) {
      return NextResponse.json(
        { error: "Missing ZAPIER_TRIAL_LEADS_WEBHOOK_URL" },
        { status: 500 }
      );
    }

    const body = await request.json();

    const response = await fetch(ZAPIER_TRIAL_LEADS_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to submit trial lead");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting trial lead:", error);
    return NextResponse.json(
      { error: "Failed to submit trial lead" },
      { status: 500 }
    );
  }
}
