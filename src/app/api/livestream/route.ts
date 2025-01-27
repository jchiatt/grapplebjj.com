import { getLiveStreamStatus } from "@/lib/youtube";
import { NextResponse } from "next/server";

export const runtime = "edge"; // Optional: Use edge runtime for faster response
export const revalidate = 300; // Revalidate every 5 minutes

export async function GET() {
  try {
    const liveStatus = await getLiveStreamStatus();
    return NextResponse.json({ liveStatus });
  } catch (error) {
    console.error("Failed to fetch live stream status:", error);
    return NextResponse.json(
      { error: "Failed to fetch live stream status" },
      { status: 500 }
    );
  }
}
