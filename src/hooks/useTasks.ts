/**
 * hooks/useTasks.ts — Derived task data with filtering and sorting applied
 *
 * Reads from taskStore + filterStore and returns a sorted, filtered task list.
 * All heavy computation is in useMemo — the hook only returns stable references.
 */
"use client";

import { useMemo } from "react";
import { useTaskStore } from "@/stores/taskStore";
import { useFilterStore } from "@/stores/filterStore";
import { useProjectStore } from "@/stores/projectStore";
import { CURRENT_USER_ID } from "@/lib/data/mock-users";
import type { Task } from "@/types/task";
import type { TaskFilters, TaskSort } from "@/types/filters";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function applyFilters(tasks: Task[], filters: TaskFilters): Task[] {
  return tasks.filter((task) => {
    if (
      filters.searchQuery &&
      !task.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) return false;

    if (
      filters.statusIds.length > 0 &&
      !filters.statusIds.includes(task.status)
    ) return false;

    if (
      filters.priorities.length > 0 &&
      !filters.priorities.includes(task.priority)
    ) return false;

    if (
      filters.assigneeIds.length > 0 &&
      (task.assigneeId === null ||
        !filters.assigneeIds.includes(task.assigneeId))
    ) return false;

    if (
      filters.labelIds.length > 0 &&
      !task.labels.some((l) => filters.labelIds.includes(l.id))
    ) return false;

    if (filters.onlyMine && task.assigneeId !== CURRENT_USER_ID) return false;

    if (
      filters.hideCompleted &&
      task.completedAt !== null
    ) return false;

    if (
      filters.dueBefore &&
      task.dueDate &&
      new Date(task.dueDate) > new Date(filters.dueBefore)
    ) return false;

    if (
      filters.dueAfter &&
      task.dueDate &&
      new Date(task.dueDate) < new Date(filters.dueAfter)
    ) return false;

    return true;
  });
}

const PRIORITY_ORDER: Record<string, number> = {
  urgent: 5,
  high: 4,
  medium: 3,
  low: 2,
  none: 1,
};

function applySort(tasks: Task[], sort: TaskSort): Task[] {
  return [...tasks].sort((a, b) => {
    const dir = sort.direction === 'asc' ? 1 : -1;

    switch (sort.field) {
      case 'title':
        return dir * a.title.localeCompare(b.title);
      case 'priority':
        return dir * (
          (PRIORITY_ORDER[a.priority] ?? 0) -
          (PRIORITY_ORDER[b.priority] ?? 0)
        );
      case 'dueDate': {
        const da = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const db = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        return dir * (da - db);
      }
      case 'createdAt':
        return dir * (
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
        );
      case 'updatedAt':
        return dir * (
          new Date(a.updatedAt).getTime() -
          new Date(b.updatedAt).getTime()
        );
      default:
        // 'order'
        return dir * (a.order - b.order);
    }
  });
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

interface UseTasksReturn {
  /** Root tasks scoped to active project (or all projects if none active) */
  tasks: Task[];
  /** Lookup by id */
  getTask: (id: string) => Task | undefined;
  selectedTask: Task | null;
  isLoading: false; // always false for mock data
}

export function useTasks(): UseTasksReturn {
  const taskMap        = useTaskStore((s) => s.taskMap);
  const rootTasks      = useTaskStore((s) => s.rootTasks);
  const selectedTaskId = useTaskStore((s) => s.selectedTaskId);
  const filters        = useFilterStore((s) => s.filters);
  const sort           = useFilterStore((s) => s.sort);
  const activeProjectId = useProjectStore((s) => s.activeProjectId);

  const tasks = useMemo(() => {
    const scoped = activeProjectId
      ? rootTasks.filter((t) => t.projectId === activeProjectId)
      : rootTasks;

    const filtered = applyFilters(scoped, filters);
    return applySort(filtered, sort);
  }, [rootTasks, activeProjectId, filters, sort]);

  const getTask = (id: string) => taskMap.get(id);

  const selectedTask = selectedTaskId ? (taskMap.get(selectedTaskId) ?? null) : null;

  return { tasks, getTask, selectedTask, isLoading: false };
}
