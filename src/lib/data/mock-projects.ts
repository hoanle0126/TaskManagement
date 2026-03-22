/**
 * lib/data/mock-projects.ts — Deterministic mock projects
 */

import type { Project } from '@/types/project';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'project-1',
    name: 'TaskFlow Web App',
    description: 'Core SaaS product development',
    color: 'var(--accent-indigo)',
    icon: 'Layers',
    members: [
      { userId: 'user-1', role: 'admin',  joinedAt: '2024-01-01T00:00:00Z' },
      { userId: 'user-2', role: 'member', joinedAt: '2024-01-05T00:00:00Z' },
      { userId: 'user-3', role: 'member', joinedAt: '2024-01-10T00:00:00Z' },
    ],
    statuses: [
      { id: 'todo',        label: 'To Do',      color: 'var(--status-grey)',   order: 0, isDefault: true },
      { id: 'in-progress', label: 'In Progress', color: 'var(--status-blue)',   order: 1 },
      { id: 'in-review',   label: 'In Review',   color: 'var(--status-purple)', order: 2 },
      { id: 'done',        label: 'Done',         color: 'var(--status-green)',  order: 3 },
    ],
    settings: {
      defaultView: 'board',
      enableTimeTracking: true,
      enableDependencies: true,
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-10T08:00:00Z',
  },
  {
    id: 'project-2',
    name: 'Marketing Campaign Q1',
    description: 'Launch campaign for Q1 2025',
    color: 'var(--accent-emerald)',
    icon: 'Megaphone',
    members: [
      { userId: 'user-1', role: 'admin',  joinedAt: '2024-01-12T00:00:00Z' },
      { userId: 'user-4', role: 'member', joinedAt: '2024-01-15T00:00:00Z' },
    ],
    statuses: [
      { id: 'backlog',     label: 'Backlog',     color: 'var(--status-grey)',  order: 0, isDefault: true },
      { id: 'in-progress', label: 'In Progress', color: 'var(--status-blue)',  order: 1 },
      { id: 'complete',    label: 'Complete',    color: 'var(--status-green)', order: 2 },
    ],
    settings: {
      defaultView: 'list',
      enableTimeTracking: false,
      enableDependencies: false,
    },
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-03-08T10:00:00Z',
  },
  {
    id: 'project-3',
    name: 'Design System',
    description: 'Component library & design tokens',
    color: 'var(--accent-violet)',
    icon: 'Palette',
    members: [
      { userId: 'user-1', role: 'admin',  joinedAt: '2024-02-01T00:00:00Z' },
      { userId: 'user-2', role: 'member', joinedAt: '2024-02-03T00:00:00Z' },
      { userId: 'user-3', role: 'member', joinedAt: '2024-02-05T00:00:00Z' },
      { userId: 'user-4', role: 'viewer', joinedAt: '2024-02-06T00:00:00Z' },
    ],
    statuses: [
      { id: 'proposed',    label: 'Proposed',    color: 'var(--status-grey)',   order: 0, isDefault: true },
      { id: 'designing',   label: 'Designing',   color: 'var(--status-purple)', order: 1 },
      { id: 'building',    label: 'Building',    color: 'var(--status-blue)',   order: 2 },
      { id: 'shipped',     label: 'Shipped',     color: 'var(--status-green)',  order: 3 },
    ],
    settings: {
      defaultView: 'board',
      enableTimeTracking: false,
      enableDependencies: true,
    },
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-03-12T09:00:00Z',
  },
];
