import { getLiveStreamStatus } from "@/lib/youtube";
import { NextResponse } from "next/server";

export const runtime = "edge"; // Optional: Use edge runtime for faster response
export const revalidate = 300; // Revalidate every 5 minutes

export async function GET() {
  try {
    const liveStatus = await getLiveStreamStatus();

    // Add cache control headers
    return NextResponse.json(
      { liveStatus },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=59",
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch live stream status:", error);
    return NextResponse.json(
      { error: "Failed to fetch live stream status" },
      {
        status: 500,
        headers: {
          // Don't cache errors
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
