"use client";

import dynamic from "next/dynamic";

const LiveStreamContent = dynamic(() => import("./livestream-content"), {
  ssr: false,
});

export function LiveStreamPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <LiveStreamContent />
    </div>
  );
}
