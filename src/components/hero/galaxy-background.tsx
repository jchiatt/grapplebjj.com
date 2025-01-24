"use client";

import { useTheme } from "@/components/theme/theme-provider";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme as useNextTheme } from "next-themes";

interface GalaxyBackgroundProps {
  className?: string;
}

export function GalaxyBackground({ className }: GalaxyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const { theme } = useTheme();
  const { resolvedTheme } = useNextTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    if (!canvasRef.current || !isDark) return;

    // Store canvas reference
    const canvas = canvasRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    // Position camera to better center the galaxy
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);

    if (!rendererRef.current) {
      rendererRef.current = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        powerPreference: "high-performance",
      });
    }

    const renderer = rendererRef.current;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Check if context is lost
    const handleContextLost = (event: Event): boolean => {
      event.preventDefault();
      console.log("WebGL context lost. Stopping render loop.");
      return false;
    };

    const handleContextRestored = () => {
      console.log("WebGL context restored. Restarting render loop.");
      animate();
    };

    canvasRef.current.addEventListener("webglcontextlost", handleContextLost);
    canvasRef.current.addEventListener(
      "webglcontextrestored",
      handleContextRestored
    );

    // Galaxy parameters
    const parameters = {
      count: 100000,
      size: 0.01,
      radius: 4,
      branches: 3,
      spin: 1,
      randomness: 0.2,
      randomnessPower: 3,
      // Theme-aware colors using the brand color palette
      insideColor:
        theme === "purple"
          ? "#6236ff" // Purple primary
          : "#38b6ff", // Blue primary
      outsideColor:
        theme === "purple"
          ? "#c3b3ff" // Purple accent2
          : "#0077b8", // Blue accent2
      middleColor:
        theme === "purple"
          ? "#7f6bff" // Purple secondary
          : "#00aaff", // Blue secondary
    };

    // Generate galaxy
    const generateGalaxy = () => {
      // Geometry
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(parameters.count * 3);
      const colors = new Float32Array(parameters.count * 3);

      const colorInside = new THREE.Color(parameters.insideColor);
      const colorMiddle = new THREE.Color(parameters.middleColor);
      const colorOutside = new THREE.Color(parameters.outsideColor);

      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;

        // Position
        const radius = Math.random() * parameters.radius;
        const spinAngle = radius * parameters.spin;
        const branchAngle =
          ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

        const randomX =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1);
        const randomY =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1);
        const randomZ =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1);

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] =
          Math.sin(branchAngle + spinAngle) * radius + randomZ;

        // Color
        const mixedColor = colorInside.clone();
        if (radius < parameters.radius * 0.5) {
          mixedColor.lerp(colorMiddle, radius / (parameters.radius * 0.5));
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

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      // Material
      const material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
      });

      // Points
      const points = new THREE.Points(geometry, material);
      scene.add(points);

      return { geometry, material, points };
    };

    const { geometry, material, points } = generateGalaxy();

    // Animation
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      points.rotation.y = elapsedTime * 0.05;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      canvas?.removeEventListener("webglcontextlost", handleContextLost);
      canvas?.removeEventListener(
        "webglcontextrestored",
        handleContextRestored
      );

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      scene.remove(points);
      geometry.dispose();
      material.dispose();

      // Don't dispose of the renderer on cleanup since we're keeping it in the ref
      // Only dispose when component is fully unmounted
      if (rendererRef.current && !canvas) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
    };
  }, [theme, isDark]); // Regenerate galaxy when theme changes or dark mode changes

  if (!isDark) return null;

  return (
    <div className={`fixed inset-0 -z-10 ${className ?? ""}`}>
      <canvas ref={canvasRef} className="h-screen w-screen" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/50 to-background/80" />
    </div>
  );
}
