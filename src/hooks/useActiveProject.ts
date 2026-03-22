/**
 * hooks/useActiveProject.ts — Active project and board column helpers
 *
 * Returns the active project's full object, statuses as board columns,
 * and view override management.
 */
"use client";

import { useMemo } from "react";
import {
  useProjectStore,
  selectActiveProject,
  selectProjectView,
} from "@/stores/projectStore";
import type { Project, ProjectStatus, ProjectView } from "@/types/project";

interface UseActiveProjectReturn {
  project:    Project | null;
  statuses:   ProjectStatus[];
  activeView: ProjectView;
  setView:    (view: ProjectView) => void;
}

export function useActiveProject(): UseActiveProjectReturn {
  const project    = useProjectStore(selectActiveProject);
  const activeProjectId = useProjectStore((s) => s.activeProjectId);
  const setProjectView  = useProjectStore((s) => s.setProjectView);
  const viewOverrides   = useProjectStore((s) => s.viewOverrides);

  const activeView = useMemo((): ProjectView =>
    selectProjectView(
      {
        projects: [],
        activeProjectId,
        viewOverrides,
        setActiveProject: () => undefined,
        setProjectView:   () => undefined,
        updateProjectName: () => undefined,
      },
      activeProjectId ?? '',
    ) ?? project?.settings.defaultView ?? 'board',
  [activeProjectId, viewOverrides, project]);

  const setView = (view: ProjectView) => {
    if (activeProjectId) setProjectView(activeProjectId, view);
  };

  const statuses = useMemo(
    () => (project?.statuses ?? []).slice().sort((a, b) => a.order - b.order),
    [project],
  );

  return { project, statuses, activeView, setView };
}
