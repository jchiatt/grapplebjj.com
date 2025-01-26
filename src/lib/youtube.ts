const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

if (!YOUTUBE_API_KEY) {
  throw new Error("Missing YOUTUBE_API_KEY environment variable");
}

if (!CHANNEL_ID) {
  throw new Error("Missing YOUTUBE_CHANNEL_ID environment variable");
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
}

export interface LiveStreamStatus {
  isLive: boolean;
  streamUrl?: string;
  videoId?: string;
}

interface YouTubeSearchResponse {
  items: Array<{
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        high: {
          url: string;
        };
      };
      publishedAt: string;
    };
  }>;
}

export async function getFeaturedVideos(limit = 3): Promise<YouTubeVideo[]> {
  if (process.env.NODE_ENV === "development") {
    return [];
  }

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${limit}&type=video`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch videos");
  }

  const data = (await response.json()) as YouTubeSearchResponse;
  return data.items.map((item) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnailUrl: item.snippet.thumbnails.high.url,
    publishedAt: item.snippet.publishedAt,
  }));
}

export async function getLiveStreamStatus(): Promise<LiveStreamStatus> {
  if (process.env.NODE_ENV === "development") {
    return { isLive: false };
    return {
      isLive: true,
      streamUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoId: "dQw4w9WgXcQ",
    };
  }

  try {
    // Fetch the channel's live page
    const response = await fetch(
      `https://www.youtube.com/channel/${CHANNEL_ID}/live`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch live page");
    }

    const html = await response.text();

    // Look for canonical link in the HTML
    const canonicalMatch = html.match(
      /<link\s+rel="canonical"\s+href="(https:\/\/www\.youtube\.com\/watch[^"]+)"/i
    );

    if (!canonicalMatch) {
      return { isLive: false };
    }

    const canonicalUrl = canonicalMatch[1];
    const videoId = new URL(canonicalUrl).searchParams.get("v");

    if (!videoId) {
      return { isLive: false };
    }

    return {
      isLive: true,
      streamUrl: canonicalUrl,
      videoId,
    };
  } catch (error) {
    console.error("Failed to check live status:", error);
    return { isLive: false };
  }
}
