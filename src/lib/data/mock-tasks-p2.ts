/**
 * lib/data/mock-tasks-p2.ts — Mock tasks for project-2 (Marketing Campaign)
 */
import type { Task } from '@/types/task';

export const MOCK_TASKS_P2: Task[] = [
  {
    id: 'task-5',
    title: 'Create Q1 campaign brief',
    status: 'complete',
    priority: 'high',
    parentId: null,
    projectId: 'project-2',
    assigneeId: 'user-4',
    dueDate: '2024-01-20T00:00:00Z',
    startDate: null,
    labels: [],
    attachments: [],
    dependencies: { blockedBy: [], blocking: [] },
    commentCount: 2,
    completedAt: '2024-01-19T11:00:00Z',
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-19T11:00:00Z',
    order: 0,
    children: [],
  },
  {
    id: 'task-6',
    title: 'Design social media assets',
    status: 'in-progress',
    priority: 'medium',
    parentId: null,
    projectId: 'project-2',
    assigneeId: 'user-4',
    dueDate: '2024-02-05T00:00:00Z',
    startDate: null,
    labels: [{ id: 'lbl-design', name: 'Design', color: 'var(--label-purple)' }],
    attachments: [],
    dependencies: { blockedBy: [], blocking: [] },
    commentCount: 1,
    completedAt: null,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-02-01T08:00:00Z',
    order: 0,
    children: [],
  },
];
