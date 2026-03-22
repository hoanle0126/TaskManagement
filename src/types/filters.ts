/**
 * types/filters.ts — Filter, sort, and grouping state types
 * for Board, List, Calendar, and Timeline views.
 */

import type { Priority } from './task';
import type { SortDirection } from './common';

/** Task field by which results can be sorted */
export type TaskSortField =
  | 'title'
  | 'priority'
  | 'dueDate'
  | 'createdAt'
  | 'updatedAt'
  | 'order';

/** Column field for grouping tasks on the board/list */
export type TaskGroupBy = 'status' | 'priority' | 'assignee' | 'label' | 'dueDate';

/** Active filters for the task list */
export interface TaskFilters {
  searchQuery: string;
  /** Filter to one or more status IDs */
  statusIds: string[];
  priorities: Priority[];
  /** Filter to one or more assignee IDs */
  assigneeIds: string[];
  /** Filter to one or more label IDs */
  labelIds: string[];
  /** ISO 8601 date string — include tasks due on or before */
  dueBefore: string | null;
  /** ISO 8601 date string — include tasks due on or after */
  dueAfter: string | null;
  /** When true, only show tasks assigned to the current user */
  onlyMine: boolean;
  /** When true, hide completed tasks */
  hideCompleted: boolean;
}

/** Task sort configuration */
export interface TaskSort {
  field: TaskSortField;
  direction: SortDirection;
}

/** Complete view configuration combining filters + sort + grouping */
export interface ViewConfig {
  filters: TaskFilters;
  sort: TaskSort;
  groupBy: TaskGroupBy;
}

/** Default filter state to use when resetting filters */
export const DEFAULT_TASK_FILTERS: TaskFilters = {
  searchQuery: '',
  statusIds: [],
  priorities: [],
  assigneeIds: [],
  labelIds: [],
  dueBefore: null,
  dueAfter: null,
  onlyMine: false,
  hideCompleted: false,
};

/** Default sort */
export const DEFAULT_TASK_SORT: TaskSort = {
  field: 'order',
  direction: 'asc',
};
