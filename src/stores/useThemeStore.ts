/**
 * useThemeStore — Zustand 5 theme + accent store (G11, G2)
 * Persisted to localStorage via "persist" middleware.
 * Applied to <html> element in ThemeProvider.tsx.
 */
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type AccentKey = "indigo" | "violet" | "emerald" | "amber" | "rose";
export type ThemeKey = "light" | "dark" | "system";

interface ThemeState {
  theme: ThemeKey;
  accent: AccentKey;
  setTheme: (theme: ThemeKey) => void;
  setAccent: (accent: AccentKey) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme:     "system",
      accent:    "indigo",
      setTheme:  (theme)  => set({ theme }),
      setAccent: (accent) => set({ accent }),
    }),
    {
      name:    "taskflow-theme",
      storage: createJSONStorage(() => localStorage),
      // Only persist theme + accent, not functions
      partialize: (state) => ({
        theme:  state.theme,
        accent: state.accent,
      }),
    },
  ),
);
