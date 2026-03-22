/**
 * hooks/useFilters.ts — Filter and sort state + actions from filterStore
 *
 * Returns both state and actions in a single object for convenience.
 */
"use client";

import { useFilterStore, selectHasActiveFilters } from "@/stores/filterStore";
import type { TaskGroupBy } from "@/types/filters";

export function useFilters() {
  const filters         = useFilterStore((s) => s.filters);
  const sort            = useFilterStore((s) => s.sort);
  const groupBy         = useFilterStore((s) => s.groupBy);
  const hasActiveFilters = useFilterStore(selectHasActiveFilters);

  const setSearchQuery      = useFilterStore((s) => s.setSearchQuery);
  const toggleStatusFilter  = useFilterStore((s) => s.toggleStatusFilter);
  const togglePriorityFilter = useFilterStore((s) => s.togglePriorityFilter);
  const toggleAssigneeFilter = useFilterStore((s) => s.toggleAssigneeFilter);
  const toggleLabelFilter   = useFilterStore((s) => s.toggleLabelFilter);
  const setDueBefore        = useFilterStore((s) => s.setDueBefore);
  const setDueAfter         = useFilterStore((s) => s.setDueAfter);
  const toggleOnlyMine      = useFilterStore((s) => s.toggleOnlyMine);
  const toggleHideCompleted = useFilterStore((s) => s.toggleHideCompleted);
  const setSort             = useFilterStore((s) => s.setSort);
  const setGroupBy          = useFilterStore((s) => s.setGroupBy);
  const resetFilters        = useFilterStore((s) => s.resetFilters);

  return {
    // state
    filters,
    sort,
    groupBy: groupBy as TaskGroupBy,
    hasActiveFilters,
    // actions
    setSearchQuery,
    toggleStatusFilter,
    togglePriorityFilter,
    toggleAssigneeFilter,
    toggleLabelFilter,
    setDueBefore,
    setDueAfter,
    toggleOnlyMine,
    toggleHideCompleted,
    setSort,
    setGroupBy,
    resetFilters,
  };
}
