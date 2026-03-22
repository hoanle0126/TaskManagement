/**
 * stores/filterStore.ts — Zustand 5 store for task filters, sort, and grouping
 *
 * View configuration is per-project. Defaults apply to "all" scope.
 */
"use client";

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { TaskFilters, TaskSort, TaskGroupBy } from "@/types/filters";
import {
  DEFAULT_TASK_FILTERS,
  DEFAULT_TASK_SORT,
} from "@/types/filters";
import type { Priority } from "@/types/task";

// ─── State & Actions ──────────────────────────────────────────────────────────

interface FilterState {
  filters:  TaskFilters;
  sort:     TaskSort;
  groupBy:  TaskGroupBy;
}

interface FilterActions {
  setSearchQuery: (query: string) => void;
  toggleStatusFilter: (statusId: string) => void;
  togglePriorityFilter: (priority: Priority) => void;
  toggleAssigneeFilter: (userId: string) => void;
  toggleLabelFilter: (labelId: string) => void;
  setDueBefore: (date: string | null) => void;
  setDueAfter: (date: string | null) => void;
  toggleOnlyMine: () => void;
  toggleHideCompleted: () => void;
  setSort: (sort: TaskSort) => void;
  setGroupBy: (groupBy: TaskGroupBy) => void;
  resetFilters: () => void;
}

export type FilterStore = FilterState & FilterActions;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toggle<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useFilterStore = create<FilterStore>()(
  subscribeWithSelector((set) => ({
    // ─── initial state ────────────────────────────────────────────────────
    filters: { ...DEFAULT_TASK_FILTERS },
    sort:    { ...DEFAULT_TASK_SORT },
    groupBy: "status",

    // ─── actions ──────────────────────────────────────────────────────────
    setSearchQuery: (query) =>
      set((s) => ({ filters: { ...s.filters, searchQuery: query } })),

    toggleStatusFilter: (statusId) =>
      set((s) => ({
        filters: { ...s.filters, statusIds: toggle(s.filters.statusIds, statusId) },
      })),

    togglePriorityFilter: (priority) =>
      set((s) => ({
        filters: { ...s.filters, priorities: toggle(s.filters.priorities, priority) },
      })),

    toggleAssigneeFilter: (userId) =>
      set((s) => ({
        filters: { ...s.filters, assigneeIds: toggle(s.filters.assigneeIds, userId) },
      })),

    toggleLabelFilter: (labelId) =>
      set((s) => ({
        filters: { ...s.filters, labelIds: toggle(s.filters.labelIds, labelId) },
      })),

    setDueBefore: (date) =>
      set((s) => ({ filters: { ...s.filters, dueBefore: date } })),

    setDueAfter: (date) =>
      set((s) => ({ filters: { ...s.filters, dueAfter: date } })),

    toggleOnlyMine: () =>
      set((s) => ({ filters: { ...s.filters, onlyMine: !s.filters.onlyMine } })),

    toggleHideCompleted: () =>
      set((s) => ({
        filters: { ...s.filters, hideCompleted: !s.filters.hideCompleted },
      })),

    setSort: (sort) => set({ sort }),

    setGroupBy: (groupBy) => set({ groupBy }),

    resetFilters: () =>
      set({ filters: { ...DEFAULT_TASK_FILTERS } }),
  })),
);

// ─── Derived selectors ─────────────────────────────────────────────────────────

/** Returns true when any filter differs from default */
export const selectHasActiveFilters = (s: FilterStore): boolean => {
  const { filters } = s;
  return (
    filters.searchQuery !== ''     ||
    filters.statusIds.length > 0   ||
    filters.priorities.length > 0  ||
    filters.assigneeIds.length > 0 ||
    filters.labelIds.length > 0    ||
    filters.dueBefore !== null      ||
    filters.dueAfter  !== null      ||
    filters.onlyMine               ||
    filters.hideCompleted
  );
};
