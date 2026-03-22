/**
 * types/project.ts — Project entity and related types
 *
 * ProjectStatus defines custom per-project status columns.
 * Project does NOT use a hardcoded status enum.
 */

export type ProjectView = 'board' | 'list' | 'calendar' | 'timeline';

export interface ProjectStatus {
  id: string;
  label: string;
  color: string;
  order: number;
  /** The status assigned to new tasks */
  isDefault?: boolean;
}

export interface ProjectMember {
  userId: string;
  role: 'admin' | 'member' | 'viewer';
  /** ISO 8601 */
  joinedAt: string;
}

export interface ProjectSettings {
  defaultView: ProjectView;
  enableTimeTracking: boolean;
  enableDependencies: boolean;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  /** Accent color token */
  color: string;
  /** Lucide icon name */
  icon?: string;
  members: ProjectMember[];
  /** Custom status columns per project */
  statuses: ProjectStatus[];
  settings: ProjectSettings;
  /** ISO 8601 */
  createdAt: string;
  /** ISO 8601 */
  updatedAt: string;
  /** ISO 8601 */
  archivedAt?: string;
}
