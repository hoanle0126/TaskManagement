/**
 * stores/projectStore.ts — Zustand 5 store for Project state
 *
 * Manages the full project list and the current active project.
 */
"use client";

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { MOCK_PROJECTS } from "@/lib/data/mock-projects";
import type { Project, ProjectView } from "@/types/project";

// ─── State & Actions ──────────────────────────────────────────────────────────

interface ProjectState {
  projects: Project[];
  /** The project currently open, or null on the dashboard */
  activeProjectId: string | null;
  /** Per-project active view override — falls back to project.settings.defaultView */
  viewOverrides: Record<string, ProjectView>;
}

interface ProjectActions {
  setActiveProject: (id: string | null) => void;
  setProjectView: (projectId: string, view: ProjectView) => void;
  updateProjectName: (id: string, name: string) => void;
}

export type ProjectStore = ProjectState & ProjectActions;

// ─── Store ────────────────────────────────────────────────────────────────────

export const useProjectStore = create<ProjectStore>()(
  subscribeWithSelector((set, get) => ({
    // ─── initial state ────────────────────────────────────────────────────
    projects:        MOCK_PROJECTS,
    activeProjectId: null,
    viewOverrides:   {},

    // ─── actions ──────────────────────────────────────────────────────────
    setActiveProject: (id) => set({ activeProjectId: id }),

    setProjectView: (projectId, view) => {
      const { viewOverrides } = get();
      set({ viewOverrides: { ...viewOverrides, [projectId]: view } });
    },

    updateProjectName: (id, name) => {
      const { projects } = get();
      const index = projects.findIndex((p) => p.id === id);
      if (index === -1) return;

      const updated = projects.slice();
      updated[index] = {
        ...updated[index]!,
        name,
        updatedAt: new Date().toISOString(),
      };
      set({ projects: updated });
    },
  })),
);

// ─── Derived selectors ─────────────────────────────────────────────────────────

/** Returns the active project object, or null */
export const selectActiveProject = (s: ProjectStore): Project | null =>
  s.activeProjectId ? (s.projects.find((p) => p.id === s.activeProjectId) ?? null) : null;

/** Returns the effective view for a project */
export const selectProjectView = (
  s: ProjectStore,
  projectId: string,
): ProjectView =>
  s.viewOverrides[projectId] ??
  (s.projects.find((p) => p.id === projectId)?.settings.defaultView ?? "board");
