/**
 * stores/taskStore.ts — Zustand 5 store for Task state
 *
 * Handles flat task map + optimistic CRUD operations.
 * Recursive children are embedded; the flat map enables O(1) lookup.
 */
"use client";

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { MOCK_TASKS } from "@/lib/data/mock-tasks";
import type { Task, Priority, Label } from "@/types/task";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Build a flat id→Task map from a (possibly nested) task array */
function buildTaskMap(tasks: Task[]): Map<string, Task> {
  const map = new Map<string, Task>();

  function walk(task: Task): void {
    map.set(task.id, task);
    task.children.forEach(walk);
  }

  tasks.forEach(walk);
  return map;
}

// ─── State & Actions ──────────────────────────────────────────────────────────

interface TaskState {
  /** Flat lookup — built from MOCK_TASKS on init */
  taskMap: Map<string, Task>;
  /** Root-level tasks only (parentId === null) */
  rootTasks: Task[];
  selectedTaskId: string | null;
}

interface TaskActions {
  selectTask: (id: string | null) => void;
  updateTaskStatus: (id: string, status: string) => void;
  updateTaskPriority: (id: string, priority: Priority) => void;
  updateTaskTitle: (id: string, title: string) => void;
  addLabel: (taskId: string, label: Label) => void;
  removeLabel: (taskId: string, labelId: string) => void;
  assignTask: (taskId: string, userId: string | null) => void;
  setDueDate: (taskId: string, date: string | null) => void;
}

export type TaskStore = TaskState & TaskActions;

// ─── Store ────────────────────────────────────────────────────────────────────

export const useTaskStore = create<TaskStore>()(
  subscribeWithSelector((set, get) => ({
    // ─── initial state ────────────────────────────────────────────────────
    taskMap:        buildTaskMap(MOCK_TASKS),
    rootTasks:      MOCK_TASKS.filter((t) => t.parentId === null),
    selectedTaskId: null,

    // ─── actions ──────────────────────────────────────────────────────────
    selectTask: (id) => set({ selectedTaskId: id }),

    updateTaskStatus: (id, status) => {
      const { taskMap } = get();
      const task = taskMap.get(id);
      if (!task) return;

      const updated = {
        ...task,
        status,
        completedAt: status === "done" || status === "complete" || status === "shipped"
          ? new Date().toISOString()
          : null,
        updatedAt: new Date().toISOString(),
      };
      set({ taskMap: new Map(taskMap).set(id, updated) });
    },

    updateTaskPriority: (id, priority) => {
      const { taskMap } = get();
      const task = taskMap.get(id);
      if (!task) return;

      const updated = { ...task, priority, updatedAt: new Date().toISOString() };
      set({ taskMap: new Map(taskMap).set(id, updated) });
    },

    updateTaskTitle: (id, title) => {
      const { taskMap } = get();
      const task = taskMap.get(id);
      if (!task) return;

      const updated = { ...task, title, updatedAt: new Date().toISOString() };
      set({ taskMap: new Map(taskMap).set(id, updated) });
    },

    addLabel: (taskId, label) => {
      const { taskMap } = get();
      const task = taskMap.get(taskId);
      if (!task) return;

      const hasLabel = task.labels.some((l) => l.id === label.id);
      if (hasLabel) return;

      const updated = {
        ...task,
        labels: [...task.labels, label],
        updatedAt: new Date().toISOString(),
      };
      set({ taskMap: new Map(taskMap).set(taskId, updated) });
    },

    removeLabel: (taskId, labelId) => {
      const { taskMap } = get();
      const task = taskMap.get(taskId);
      if (!task) return;

      const updated = {
        ...task,
        labels: task.labels.filter((l) => l.id !== labelId),
        updatedAt: new Date().toISOString(),
      };
      set({ taskMap: new Map(taskMap).set(taskId, updated) });
    },

    assignTask: (taskId, userId) => {
      const { taskMap } = get();
      const task = taskMap.get(taskId);
      if (!task) return;

      const updated = { ...task, assigneeId: userId, updatedAt: new Date().toISOString() };
      set({ taskMap: new Map(taskMap).set(taskId, updated) });
    },

    setDueDate: (taskId, date) => {
      const { taskMap } = get();
      const task = taskMap.get(taskId);
      if (!task) return;

      const updated = { ...task, dueDate: date, updatedAt: new Date().toISOString() };
      set({ taskMap: new Map(taskMap).set(taskId, updated) });
    },
  })),
);
