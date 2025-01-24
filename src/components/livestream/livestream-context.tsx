"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { LiveStreamStatus } from "@/lib/youtube";

interface LiveStreamContextType {
  liveStatus: LiveStreamStatus | null;
  isLoading: boolean;
  error: string | null;
}

const LiveStreamContext = createContext<LiveStreamContextType | undefined>(
  undefined
);

export function LiveStreamProvider({ children }: { children: ReactNode }) {
  const [liveStatus, setLiveStatus] = useState<LiveStreamStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkLiveStatus() {
      try {
        const response = await fetch("/api/youtube");
        if (!response.ok) throw new Error("Failed to fetch live status");
        const data = await response.json();
        setLiveStatus(data.liveStatus);
      } catch (err) {
        setError("Failed to check live status");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    checkLiveStatus();

    // Check live status every 5 minutes
    const interval = setInterval(checkLiveStatus, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <LiveStreamContext.Provider value={{ liveStatus, isLoading, error }}>
      {children}
    </LiveStreamContext.Provider>
  );
}

export function useLiveStream() {
  const context = useContext(LiveStreamContext);
  if (context === undefined) {
    throw new Error("useLiveStream must be used within a LiveStreamProvider");
  }
  return context;
}
