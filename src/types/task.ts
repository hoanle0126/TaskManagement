/**
 * types/task.ts — Core Task entity and related types
 *
 * status is a string referencing ProjectStatus.id (not a fixed enum).
 * children supports unlimited recursive depth.
 */

export type Priority = 'none' | 'low' | 'medium' | 'high' | 'urgent';

export interface Label {
  id: string;
  name: string;
  /** CSS variable reference, e.g. "var(--label-red)" */
  color: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  /** MIME type */
  type: string;
  /** File size in bytes */
  size: number;
  /** ISO 8601 */
  uploadedAt: string;
}

export interface TaskDependencies {
  /** Task IDs this task is blocked by */
  blockedBy: string[];
  /** Task IDs this task blocks */
  blocking: string[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  /** References ProjectStatus.id — NOT a fixed enum */
  status: string;
  priority: Priority;
  /** null = root-level task */
  parentId: string | null;
  /** Recursive — unlimited depth */
  children: Task[];
  projectId: string;
  assigneeId: string | null;
  /** ISO 8601 */
  dueDate: string | null;
  /** ISO 8601 — for timeline/calendar view */
  startDate: string | null;
  labels: Label[];
  attachments: Attachment[];
  dependencies: TaskDependencies;
  commentCount: number;
  /** For Focus Mode timer, in minutes */
  estimatedMinutes?: number;
  /** ISO 8601 */
  completedAt: string | null;
  /** ISO 8601 */
  createdAt: string;
  /** ISO 8601 */
  updatedAt: string;
  /** Sort order within parent/column */
  order: number;
}
