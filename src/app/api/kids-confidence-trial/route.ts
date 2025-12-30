import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

interface ConfidenceTrialPayload {
  parentFirstName: string;
  parentLastName: string;
  email: string;
  phone: string;
}

export async function POST(request: Request) {
  try {
    const webhookUrl = process.env.ZAPIER_WEBHOOK_URL_KIDS_CONFIDENCE_TRIAL;

    if (!webhookUrl) {
      return NextResponse.json(
        { error: "Missing webhook configuration" },
        { status: 500 }
      );
    }

    const body = (await request.json()) as ConfidenceTrialPayload;

    if (
      !body.parentFirstName ||
      !body.parentLastName ||
      !body.email ||
      !body.phone
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (!PHONE_REGEX.test(body.phone)) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        source: "kids-confidence-trial",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting kids confidence trial form:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
