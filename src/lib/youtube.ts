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
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&eventType=live&type=video`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch live stream status");
  }

  const data = (await response.json()) as YouTubeSearchResponse;
  const liveStream = data.items[0];

  if (!liveStream) {
    return { isLive: false };
  }

  return {
    isLive: true,
    streamUrl: `https://www.youtube.com/watch?v=${liveStream.id.videoId}`,
    videoId: liveStream.id.videoId,
  };
}
