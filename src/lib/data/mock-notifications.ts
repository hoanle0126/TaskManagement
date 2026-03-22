/**
 * lib/data/mock-notifications.ts — Deterministic in-app notifications
 */

import type { Notification } from '@/types/common';

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    recipientId: 'user-1',
    message: 'Ben Nakamura assigned you to "Build task board component"',
    isRead: false,
    href: '/projects/project-1/tasks/task-3',
    createdAt: '2024-03-12T14:00:00Z',
  },
  {
    id: 'notif-2',
    recipientId: 'user-1',
    message: 'Clara Silva completed "Design authentication flow"',
    isRead: false,
    href: '/projects/project-1/tasks/task-1',
    createdAt: '2024-02-14T16:05:00Z',
  },
  {
    id: 'notif-3',
    recipientId: 'user-1',
    message: 'David Osei commented on "Create Q1 campaign brief"',
    isRead: true,
    href: '/projects/project-2/tasks/task-5',
    createdAt: '2024-01-18T10:00:00Z',
  },
  {
    id: 'notif-4',
    recipientId: 'user-1',
    message: '"Define color token schema" is now blocked by a dependency',
    isRead: true,
    href: '/projects/project-3/tasks/task-7',
    createdAt: '2024-02-02T08:00:00Z',
  },
  {
    id: 'notif-5',
    recipientId: 'user-2',
    message: 'Alice Chen assigned you to "Implement login API"',
    isRead: false,
    href: '/projects/project-1/tasks/task-2',
    createdAt: '2024-01-20T02:00:00Z',
  },
];
