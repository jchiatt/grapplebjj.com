"use client";

import dynamic from "next/dynamic";

const LiveStreamContent = dynamic(() => import("./livestream-content"), {
  ssr: false,
});

export function LiveStreamPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <LiveStreamContent />
    </main>
  );
}
