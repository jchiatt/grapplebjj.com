"use client";

import { useEffect, useState } from "react";

interface Heart {
  id: number;
  x: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  rotation: number;
}

const COLORS = [
  // Pinks
  "#ff69b4",
  "#ff1493",
  "#db7093",
  "#ffb6c1",
  // Reds
  "#ff0000",
  "#dc143c",
  "#cd5c5c",
  "#ff4444",
  // Purples
  "#800080",
  "#9400d3",
  "#8a2be2",
  "#9370db",
];

const HeartSVG = ({
  color,
  size,
  rotation,
}: {
  color: string;
  size: number;
  rotation: number;
}) => (
  <svg
    style={{
      width: `${size}px`,
      height: `${size}px`,
      transform: `rotate(${rotation}deg)`,
    }}
    viewBox="0 0 24 24"
    fill={color}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Create initial batch of hearts
    const initialHearts = Array.from({ length: 20 }, () => createHeart());
    setHearts(initialHearts);

    const interval = setInterval(() => {
      // Add new hearts more frequently
      const newHeart = createHeart();
      setHearts((prevHearts) => [...prevHearts, newHeart]);

      // Clean up hearts that have floated away
      setHearts((prevHearts) =>
        prevHearts.filter((heart) => heart.opacity > 0)
      );
    }, 300); // Create a new heart every 300ms

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(function animate() {
      setHearts((prevHearts) =>
        prevHearts.map((heart) => ({
          ...heart,
          opacity: heart.opacity - 0.001, // Even slower fade out for longer journey
        }))
      );
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  function createHeart(): Heart {
    return {
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      size: Math.random() * 30 + 15, // Size between 15-45px
      speed: Math.random() * 1.5 + 0.5, // Random speed
      opacity: 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 30 - 15, // Random rotation between -15 and 15 degrees
    };
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute will-change-transform"
          style={{
            left: `${heart.x}%`,
            bottom: "0",
            transform: `translateY(${
              -200 + heart.opacity * 200
            }vh) translateZ(0)`,
            transition: `transform ${35 / heart.speed}s linear`,
            opacity: heart.opacity,
          }}
        >
          <HeartSVG
            color={heart.color}
            size={heart.size}
            rotation={heart.rotation}
          />
        </div>
      ))}
    </div>
  );
}
