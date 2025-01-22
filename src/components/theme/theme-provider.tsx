"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

type Theme = "purple" | "blue";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: "purple",
  setTheme: () => null,
});

export function ThemeProvider({
  children,
  defaultTheme = "system",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("purple");

  useEffect(() => {
    const savedTheme = localStorage.getItem("color-theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(`theme-${savedTheme}`);
    }
  }, []);

  return (
    <ThemeProviderContext.Provider
      value={{
        theme,
        setTheme: (newTheme) => {
          // Remove previous theme class
          document.documentElement.classList.remove(`theme-${theme}`);
          // Add new theme class
          document.documentElement.classList.add(`theme-${newTheme}`);
          // Save to localStorage
          localStorage.setItem("color-theme", newTheme);
          setTheme(newTheme);
        },
      }}
    >
      <NextThemeProvider
        attribute="class"
        defaultTheme={defaultTheme}
        enableSystem
        {...props}
      >
        {children}
      </NextThemeProvider>
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
