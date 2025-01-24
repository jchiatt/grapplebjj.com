"use client";

import { Paintbrush2, Orbit, Sun } from "lucide-react";
import { useTheme as useNextTheme } from "next-themes";
import { useTheme } from "./theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { setTheme: setMode, resolvedTheme } = useNextTheme();

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Paintbrush2 className="h-4 w-4" />
            <div
              className={cn(
                "absolute bottom-1 right-1 h-2 w-2 rounded-full",
                theme === "purple" ? "bg-purple-primary" : "bg-blue-primary"
              )}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setTheme("purple")}
            className="flex items-center gap-2"
          >
            <div className="h-4 w-4 rounded-full bg-purple-primary" />
            <span>Enable Purple Theme</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("blue")}
            className="flex items-center gap-2"
          >
            <div className="h-4 w-4 rounded-full bg-blue-primary" />
            <span>Enable Blue Theme</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setMode(resolvedTheme === "dark" ? "light" : "dark")}
      >
        <Orbit className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Sun className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle Galaxy Mode</span>
      </Button>
    </div>
  );
}
