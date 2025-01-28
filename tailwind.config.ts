import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Theme colors (HSL for dynamic themes)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        // Brand colors - Purple theme (default)
        purple: {
          primary: "#6236ff",
          secondary: "#7f6bff",
          accent: "#FF1D8D",
          accent2: "#c3b3ff",
          accent3: "#f1d1ff",
        },

        // Brand colors - Blue theme
        blue: {
          primary: "#38b6ff",
          secondary: "#00aaff",
          accent: "#0092e0",
          accent2: "#0077b8",
          accent3: "#005e8a",
        },

        // Semantic colors
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      fontSize: {
        // Desktop
        h1: ["48px", { lineHeight: "1.1" }],
        h2: ["36px", { lineHeight: "1.2" }],
        h3: ["24px", { lineHeight: "1.3" }],
        body: ["16px", { lineHeight: "1.5" }],
        small: ["14px", { lineHeight: "1.5" }],
        // Mobile
        "mobile-h1": ["36px", { lineHeight: "1.1" }],
        "mobile-h2": ["28px", { lineHeight: "1.2" }],
        "mobile-h3": ["20px", { lineHeight: "1.3" }],
        "mobile-body": ["16px", { lineHeight: "1.5" }],
        "mobile-small": ["14px", { lineHeight: "1.5" }],
      },
      spacing: {
        "4xs": "0.125rem",
        "3xs": "0.25rem",
        "2xs": "0.375rem",
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.25rem",
        xl: "1.5rem",
        "2xl": "2rem",
        "3xl": "2.5rem",
        "4xl": "3rem",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "slide-out": "slide-out 0.3s ease-out",
        "spin-slow": "spin 8s linear infinite",
        "spin-reverse-slower": "spin-reverse 12s linear infinite",
        fadeIn: "fadeIn 0.6s ease-out forwards",
        highlightSlide: "highlightSlide 0.6s ease-out forwards",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "spin-reverse": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "0.8" },
        },
        highlightSlide: {
          "0%": {
            transform: "scaleX(0) skewY(-2deg)",
            opacity: "0",
          },
          "100%": {
            transform: "scaleX(1) skewY(-2deg)",
            opacity: "1",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
        technical: ["var(--font-metrophobic)", "system-ui", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
      },
    },
  },
  plugins: [animate, typography],
} satisfies Config;
