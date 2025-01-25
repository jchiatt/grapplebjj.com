"use client";

import { useLiveStream } from "./livestream-context";
import { CallToAction } from "../ui/call-to-action";
import { Headline } from "../ui/headline";

export default function LiveStreamContent() {
  const { liveStatus, isLoading } = useLiveStream();

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="w-full aspect-video bg-gray-700 rounded-lg mb-8" />
        <div className="h-12 bg-gray-700 rounded w-2/3 mx-auto" />
      </div>
    );
  }

  if (liveStatus?.isLive && liveStatus.videoId) {
    return (
      <div className="space-y-8">
        <Headline as="h1" size="h1" className="text-center my-8 md:my-16">
          Live Stream
        </Headline>
        <div className="w-full aspect-video">
          <iframe
            title="Grapple Live Stream"
            src={`https://www.youtube.com/embed/${liveStatus.videoId}?autoplay=1&mute=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        </div>

        <div className="mt-16 md:mt-24">
          <CallToAction
            title="Tired of just watching?"
            description="Join us on the mats and start your jiu jitsu journey today."
            primaryAction={{
              label: "Start Training Today",
              href: "/trial",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Next Live Class</h1>
        <p className="text-xl text-gray-400">Coming Soon</p>
      </div>

      <div className="mt-16 md:mt-24">
        <CallToAction
          title="Just watching not good enough for you?"
          description="Get off the sidelines and onto the mats. Start your jiu jitsu journey today."
          primaryAction={{
            label: "Start Training Today",
            href: "/trial",
          }}
        />
      </div>
    </div>
  );
}
