/**
 * lib/data/mock-activities.ts — Deterministic activity feed events
 */

import type { ActivityEvent } from '@/types/common';

export const MOCK_ACTIVITIES: ActivityEvent[] = [
  {
    id: 'act-1',
    entityId: 'task-1',
    entityType: 'task',
    actorId: 'user-3',
    action: 'created',
    createdAt: '2024-01-20T00:00:00Z',
  },
  {
    id: 'act-2',
    entityId: 'task-1',
    entityType: 'task',
    actorId: 'user-1',
    action: 'assigned',
    payload: { assigneeId: 'user-3' },
    createdAt: '2024-01-20T01:00:00Z',
  },
  {
    id: 'act-3',
    entityId: 'task-2',
    entityType: 'task',
    actorId: 'user-2',
    action: 'status_changed',
    payload: { from: 'todo', to: 'in-progress' },
    createdAt: '2024-02-15T09:00:00Z',
  },
  {
    id: 'act-4',
    entityId: 'task-3',
    entityType: 'task',
    actorId: 'user-1',
    action: 'commented',
    createdAt: '2024-03-05T14:30:00Z',
  },
  {
    id: 'act-5',
    entityId: 'task-1',
    entityType: 'task',
    actorId: 'user-3',
    action: 'status_changed',
    payload: { from: 'in-review', to: 'done' },
    createdAt: '2024-02-14T16:00:00Z',
  },
  {
    id: 'act-6',
    entityId: 'project-1',
    entityType: 'project',
    actorId: 'user-1',
    action: 'created',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'act-7',
    entityId: 'task-7',
    entityType: 'task',
    actorId: 'user-1',
    action: 'status_changed',
    payload: { from: 'designing', to: 'shipped' },
    createdAt: '2024-02-18T12:00:00Z',
  },
  {
    id: 'act-8',
    entityId: 'task-3',
    entityType: 'task',
    actorId: 'user-2',
    action: 'attachment_added',
    payload: { fileName: 'board-mockup.fig' },
    createdAt: '2024-03-10T11:00:00Z',
  },
];
