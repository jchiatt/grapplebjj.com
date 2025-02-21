"use client";

import { useTheme } from "@/components/theme/theme-provider";
import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { useTheme as useNextTheme } from "next-themes";

interface GalaxyBackgroundProps {
  className?: string;
}

// Moved outside component to avoid recreation
const CHUNK_SIZE = 5000;
const RESIZE_DELAY = 250;

// Fallback for browsers that don't support requestIdleCallback
const requestIdleCallbackPolyfill = (
  callback: IdleRequestCallback,
  options?: IdleRequestOptions
): number => {
  const start = Date.now();
  return window.setTimeout(() => {
    callback({
      didTimeout: false,
      timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
    });
  }, options?.timeout || 1);
};

const requestIdle =
  typeof window !== "undefined" && window.requestIdleCallback
    ? window.requestIdleCallback
    : requestIdleCallbackPolyfill;

export function GalaxyBackground({ className }: GalaxyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { theme } = useTheme();
  const { resolvedTheme } = useNextTheme();
  const isDark = resolvedTheme === "dark";
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  // Memoize the resize handler
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const renderer = rendererRef.current;
    const camera = cameraRef.current;
    if (!canvas || !renderer || !camera) return;

    const container = canvas.parentElement;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Update camera aspect ratio
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // Update renderer size
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }, []);

  useEffect(() => {
    // Set a timeout to indicate full load after initial render
    const timer = setTimeout(() => setIsFullyLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !isDark) {
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);

    // Store refs for resize handler
    sceneRef.current = scene;
    cameraRef.current = camera;

    if (!rendererRef.current) {
      rendererRef.current = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        powerPreference: "high-performance",
        antialias: false, // Disable antialiasing for better performance
      });
    }

    const renderer = rendererRef.current;

    // Initial size setup
    handleResize();

    // Efficient resize handler with debounce
    const onResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(handleResize, RESIZE_DELAY);
    };

    window.addEventListener("resize", onResize);

    // Galaxy parameters with optimized initial state
    const parameters = {
      count: isFullyLoaded ? 100000 : 20000,
      size: 0.01,
      radius: 5,
      branches: 3,
      spin: 1,
      randomness: 0.2,
      randomnessPower: 3,
      insideColor: theme === "purple" ? "#6236ff" : "#38b6ff",
      outsideColor: theme === "purple" ? "#c3b3ff" : "#0077b8",
      middleColor: theme === "purple" ? "#7f6bff" : "#00aaff",
    };

    // Generate galaxy in chunks to avoid long tasks
    const generateGalaxyChunked = async () => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(parameters.count * 3);
      const colors = new Float32Array(parameters.count * 3);

      const material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
      });

      const colorInside = new THREE.Color(parameters.insideColor);
      const colorMiddle = new THREE.Color(parameters.middleColor);
      const colorOutside = new THREE.Color(parameters.outsideColor);

      // Process particles in chunks
      for (let i = 0; i < parameters.count; i += CHUNK_SIZE) {
        const chunkEnd = Math.min(i + CHUNK_SIZE, parameters.count);

        await new Promise((resolve) => {
          requestIdle(() => {
            for (let j = i; j < chunkEnd; j++) {
              const i3 = j * 3;
              const radius = Math.random() * parameters.radius;
              const spinAngle = radius * parameters.spin;
              const branchAngle =
                ((j % parameters.branches) / parameters.branches) * Math.PI * 2;

              const randomX =
                Math.pow(Math.random(), parameters.randomnessPower) *
                (Math.random() < 0.5 ? 1 : -1);
              const randomY =
                Math.pow(Math.random(), parameters.randomnessPower) *
                (Math.random() < 0.5 ? 1 : -1);
              const randomZ =
                Math.pow(Math.random(), parameters.randomnessPower) *
                (Math.random() < 0.5 ? 1 : -1);

              positions[i3] =
                Math.cos(branchAngle + spinAngle) * radius + randomX;
              positions[i3 + 1] = randomY;
              positions[i3 + 2] =
                Math.sin(branchAngle + spinAngle) * radius + randomZ;

              const mixedColor = colorInside.clone();
              if (radius < parameters.radius * 0.5) {
                mixedColor.lerp(
                  colorMiddle,
                  radius / (parameters.radius * 0.5)
                );
              } else {
                mixedColor.lerp(
                  colorOutside,
                  (radius - parameters.radius * 0.5) / (parameters.radius * 0.5)
                );
              }

              colors[i3] = mixedColor.r;
              colors[i3 + 1] = mixedColor.g;
              colors[i3 + 2] = mixedColor.b;
            }
            resolve(null);
          });
        });
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      return { geometry, material, points };
    };

    // Generate galaxy and start animation
    let cleanup: (() => void) | undefined;
    generateGalaxyChunked().then(({ geometry, material, points }) => {
      const clock = new THREE.Clock();
      let animationFrameId: number;

      const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        points.rotation.y = elapsedTime * 0.05;
        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };
      animate();

      // Setup cleanup function
      cleanup = () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        scene.remove(points);
        geometry.dispose();
        material.dispose();
      };
    });

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      if (cleanup) {
        cleanup();
      }
      if (rendererRef.current && !canvas) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
    };
  }, [theme, isDark, resolvedTheme, isFullyLoaded, handleResize]);

  if (!isDark) return null;

  return (
    <div className={`fixed inset-0 -z-10 ${className ?? ""}`}>
      <div className="absolute inset-0">
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/50 to-background/80" />
    </div>
  );
}
