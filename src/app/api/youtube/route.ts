import { getFeaturedVideos, getLiveStreamStatus } from "@/lib/youtube";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [videos, liveStatus] = await Promise.all([
      getFeaturedVideos(),
      getLiveStreamStatus(),
    ]);

    return NextResponse.json({ videos, liveStatus });
  } catch (error) {
    console.error("Failed to fetch YouTube data:", error);
    return NextResponse.json(
      { error: "Failed to fetch YouTube data" },
      { status: 500 }
    );
  }
}
