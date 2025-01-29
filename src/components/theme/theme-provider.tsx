"use client";

import * as React from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export type Theme = "purple" | "blue" | "valentine";

const themeColors = {
  purple: "#6236FF",
  blue: "#38BDF8",
  valentine: "#EC4899",
} as const;

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

const ThemeContext = React.createContext<{
  theme: Theme;
  setTheme: (theme: Theme, persist?: boolean) => void;
}>({
  theme: "purple",
  setTheme: () => null,
});

const THEME_STORAGE_KEY = "grapple-color-theme";

export function ThemeProvider({
  children,
  defaultTheme = "purple",
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
  const [mounted, setMounted] = React.useState(false);

  // Initialize theme from localStorage or default
  React.useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
    if (savedTheme && ["purple", "blue", "valentine"].includes(savedTheme)) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", defaultTheme);
    }
  }, [defaultTheme]);

  // Handle theme changes
  const handleThemeChange = React.useCallback(
    (newTheme: Theme, persist: boolean = true) => {
      setThemeState(newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);

      // Update theme-color meta tag
      const themeColor = themeColors[newTheme];
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');

      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", themeColor);
      } else {
        const meta = document.createElement("meta");
        meta.name = "theme-color";
        meta.content = themeColor;
        document.head.appendChild(meta);
      }

      if (persist) {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      }
    },
    []
  );

  // Prevent flash of unstyled content
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
      <NextThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
      >
        {children}
      </NextThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
