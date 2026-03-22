/**
 * hooks/useTaskMutations.ts — Task mutation actions from taskStore
 *
 * Thin wrapper that returns only the action callbacks,
 * preventing unnecessary re-renders from state changes.
 */
"use client";

import { useTaskStore } from "@/stores/taskStore";
import type { Priority, Label } from "@/types/task";

export interface TaskMutations {
  selectTask:           (id: string | null) => void;
  updateTaskStatus:     (id: string, status: string) => void;
  updateTaskPriority:   (id: string, priority: Priority) => void;
  updateTaskTitle:      (id: string, title: string) => void;
  addLabel:             (taskId: string, label: Label) => void;
  removeLabel:          (taskId: string, labelId: string) => void;
  assignTask:           (taskId: string, userId: string | null) => void;
  setDueDate:           (taskId: string, date: string | null) => void;
}

export function useTaskMutations(): TaskMutations {
  const selectTask         = useTaskStore((s) => s.selectTask);
  const updateTaskStatus   = useTaskStore((s) => s.updateTaskStatus);
  const updateTaskPriority = useTaskStore((s) => s.updateTaskPriority);
  const updateTaskTitle    = useTaskStore((s) => s.updateTaskTitle);
  const addLabel           = useTaskStore((s) => s.addLabel);
  const removeLabel        = useTaskStore((s) => s.removeLabel);
  const assignTask         = useTaskStore((s) => s.assignTask);
  const setDueDate         = useTaskStore((s) => s.setDueDate);

  return {
    selectTask,
    updateTaskStatus,
    updateTaskPriority,
    updateTaskTitle,
    addLabel,
    removeLabel,
    assignTask,
    setDueDate,
  };
}
