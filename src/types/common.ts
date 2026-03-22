/**
 * types/common.ts — Shared utility types and domain types
 * used across multiple features.
 */

/** Activity feed event */
export interface ActivityEvent {
  id: string;
  /** The entity being acted upon */
  entityId: string;
  entityType: 'task' | 'project';
  actorId: string;
  action:
    | 'created'
    | 'updated'
    | 'deleted'
    | 'status_changed'
    | 'assigned'
    | 'commented'
    | 'attachment_added';
  /** Structured payload for the action */
  payload?: Record<string, string | number | boolean | null>;
  /** ISO 8601 */
  createdAt: string;
}

/** In-app notification */
export interface Notification {
  id: string;
  /** Who receives this notification */
  recipientId: string;
  /** Notification copy text (i18n key or resolved string) */
  message: string;
  isRead: boolean;
  /** Deep-link within the app */
  href?: string;
  /** ISO 8601 */
  createdAt: string;
}

/** Generic paginated response wrapper */
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
}

/** Sort direction */
export type SortDirection = 'asc' | 'desc';

/** Reusable select option */
export interface SelectOption {
  value: string;
  label: string;
}
