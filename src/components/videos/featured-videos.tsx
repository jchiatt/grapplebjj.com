"use client";

import { useEffect, useState } from "react";
import type { YouTubeVideo } from "@/lib/youtube";

export function FeaturedVideos() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch("/api/youtube");
        if (!response.ok) throw new Error("Failed to fetch videos");
        const data = await response.json();
        setVideos(data.videos);
      } catch (err) {
        setError("Failed to load videos");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideos();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center">
            <p className="text-muted-foreground">Loading videos...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Videos</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get a glimpse into our training, techniques, and community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="rounded-lg overflow-hidden bg-card shadow-lg"
            >
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                <p className="text-muted-foreground line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.youtube.com/@mississippibjj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
          >
            View more videos on our YouTube channel
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
