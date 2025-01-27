"use client";

import { useTheme } from "@/components/theme/theme-provider";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme as useNextTheme } from "next-themes";
import debounce from "lodash/debounce";

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
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);

    if (!rendererRef.current) {
      rendererRef.current = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        powerPreference: "high-performance",
      });
    }

    const renderer = rendererRef.current;

    // Function to update sizes
    const updateSizes = () => {
      const container = canvas.parentElement;
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      // Update camera
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    // Initial size setup
    updateSizes();

    // Handle resize with debounce
    const debouncedResize = debounce(() => {
      updateSizes();
    }, 250);

    window.addEventListener("resize", debouncedResize);

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
      count: theme === "valentine" ? 10000 : 100000,
      size: theme === "valentine" ? 0.04 : 0.01,
      radius: 5,
      branches: 3,
      spin: 1,
      randomness: 0.2,
      randomnessPower: 3,
      // Theme-aware colors using the brand color palette
      insideColor:
        theme === "purple"
          ? "#6236ff"
          : theme === "blue"
          ? "#38b6ff"
          : "#ff66c4",
      outsideColor:
        theme === "purple"
          ? "#c3b3ff"
          : theme === "blue"
          ? "#0077b8"
          : "#ff3366",
      middleColor:
        theme === "purple"
          ? "#7f6bff"
          : theme === "blue"
          ? "#00aaff"
          : "#ff4d6d",
    };

    // Generate galaxy
    const generateGalaxy = () => {
      // Create heart sprite texture for Valentine theme
      let material;
      if (theme === "valentine") {
        const canvas = document.createElement("canvas");
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.beginPath();
          ctx.moveTo(16, 8);
          ctx.bezierCurveTo(16, 7, 14, 4, 10, 4);
          ctx.bezierCurveTo(4, 4, 4, 12, 4, 12);
          ctx.bezierCurveTo(4, 18, 16, 24, 16, 24);
          ctx.bezierCurveTo(16, 24, 28, 18, 28, 12);
          ctx.bezierCurveTo(28, 12, 28, 4, 22, 4);
          ctx.bezierCurveTo(18, 4, 16, 7, 16, 8);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
        }
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.SpriteMaterial({
          map: texture,
          color: parameters.insideColor,
          transparent: true,
          blending: THREE.AdditiveBlending,
        });
      } else {
        material = new THREE.PointsMaterial({
          size: parameters.size,
          sizeAttenuation: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          vertexColors: true,
        });
      }

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(parameters.count * 3);
      const colors = new Float32Array(parameters.count * 3);

      const colorInside = new THREE.Color(parameters.insideColor);
      const colorMiddle = new THREE.Color(parameters.middleColor);
      const colorOutside = new THREE.Color(parameters.outsideColor);

      let points;

      if (theme === "valentine") {
        const group = new THREE.Group();

        for (let i = 0; i < parameters.count; i++) {
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

          const x = Math.cos(branchAngle + spinAngle) * radius + randomX;
          const y = randomY;
          const z = Math.sin(branchAngle + spinAngle) * radius + randomZ;

          const heartMaterial = material as THREE.SpriteMaterial;
          const sprite = new THREE.Sprite(heartMaterial.clone());
          sprite.position.set(x, y, z);
          sprite.scale.set(parameters.size, parameters.size, 1);

          // Color based on radius
          const mixedColor = colorInside.clone();
          if (radius < parameters.radius * 0.5) {
            mixedColor.lerp(colorMiddle, radius / (parameters.radius * 0.5));
          } else {
            mixedColor.lerp(
              colorOutside,
              (radius - parameters.radius * 0.5) / (parameters.radius * 0.5)
            );
          }
          sprite.material.color = mixedColor;

          group.add(sprite);
        }
        points = group;
      } else {
        // Original circle particles logic
        for (let i = 0; i < parameters.count; i++) {
          const i3 = i * 3;
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
        points = new THREE.Points(geometry, material);
      }

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

    // Cleanup
    return () => {
      window.removeEventListener("resize", debouncedResize);
      debouncedResize.cancel();
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

      if (rendererRef.current && !canvas) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
    };
  }, [theme, isDark]);

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
