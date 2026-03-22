"use client";

/**
 * ThemeProvider — G2 leaf client component
 * - Wraps next-themes ThemeProvider for dark/light/system toggle
 * - Reads useThemeStore().accent and applies `accent-{key}` class to <html>
 * - Cleans up on unmount
 */

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useThemeStore, type AccentKey } from "@/stores/useThemeStore";

const ACCENT_CLASSES: Record<AccentKey, string> = {
  indigo:  "accent-indigo",
  violet:  "accent-violet",
  emerald: "accent-emerald",
  amber:   "accent-amber",
  rose:    "accent-rose",
};

function AccentApplier() {
  const accent = useThemeStore((s) => s.accent);

  useEffect(() => {
    const root = document.documentElement;

    // Remove any existing accent class
    Object.values(ACCENT_CLASSES).forEach((cls) => root.classList.remove(cls));

    // Apply the selected accent
    root.classList.add(ACCENT_CLASSES[accent]);

    return () => {
      root.classList.remove(ACCENT_CLASSES[accent]);
    };
  }, [accent]);

  return null;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <AccentApplier />
      {children}
    </NextThemesProvider>
  );
}
