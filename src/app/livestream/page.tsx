import { LiveStreamProvider } from "@/components/livestream/livestream-context";
import LiveStreamContent from "@/components/livestream/livestream-content";

export default function Page() {
  return (
    <LiveStreamProvider>
      <LiveStreamContent />
    </LiveStreamProvider>
  );
}
