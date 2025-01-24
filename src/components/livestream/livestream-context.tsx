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

interface StoredLiveStreamData {
  status: LiveStreamStatus;
  timestamp: number;
}

const CACHE_KEY = "livestream_cache";
const CACHE_DURATION = 30 * 1000; // 30 seconds in milliseconds

const LiveStreamContext = createContext<LiveStreamContextType | undefined>(
  undefined
);

function getStoredLiveStreamData(): StoredLiveStreamData | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(CACHE_KEY);
  if (!stored) return null;

  try {
    const data = JSON.parse(stored) as StoredLiveStreamData;
    const age = Date.now() - data.timestamp;

    // Return null if cache is expired
    if (age > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data;
  } catch {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
}

export function LiveStreamProvider({ children }: { children: ReactNode }) {
  const [liveStatus, setLiveStatus] = useState<LiveStreamStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkLiveStatus() {
      // Check cache first
      const cachedData = getStoredLiveStreamData();
      if (cachedData) {
        setLiveStatus(cachedData.status);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/livestream");
        if (!response.ok) throw new Error("Failed to fetch live status");
        const data = await response.json();

        // Store in localStorage with timestamp
        const storageData: StoredLiveStreamData = {
          status: data.liveStatus,
          timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(storageData));

        setLiveStatus(data.liveStatus);
      } catch (err) {
        setError("Failed to check live status");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    checkLiveStatus();
  }, []); // Only run once on mount

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
