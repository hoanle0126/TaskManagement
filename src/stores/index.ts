/**
 * stores/index.ts — Barrel re-export for all Zustand stores
 */

export { useTaskStore } from "./taskStore";
export { useProjectStore, selectActiveProject, selectProjectView } from "./projectStore";
export { useFilterStore, selectHasActiveFilters } from "./filterStore";
export { useUiStore } from "./uiStore";
export { useNotificationStore, selectUnreadCount } from "./notificationStore";
