/**
 * lib/data/mock-users.ts — Deterministic mock user records
 */

import type { User } from '@/types/user';

export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Alice Chen',
    email: 'alice@taskflow.dev',
    avatar: 'https://ui-avatars.com/api/?name=Alice+Chen&background=6366f1&color=fff',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-2',
    name: 'Ben Nakamura',
    email: 'ben@taskflow.dev',
    avatar: 'https://ui-avatars.com/api/?name=Ben+Nakamura&background=8b5cf6&color=fff',
    role: 'member',
    createdAt: '2024-01-05T00:00:00Z',
  },
  {
    id: 'user-3',
    name: 'Clara Silva',
    email: 'clara@taskflow.dev',
    avatar: 'https://ui-avatars.com/api/?name=Clara+Silva&background=10b981&color=fff',
    role: 'member',
    createdAt: '2024-01-10T00:00:00Z',
  },
  {
    id: 'user-4',
    name: 'David Osei',
    email: 'david@taskflow.dev',
    avatar: 'https://ui-avatars.com/api/?name=David+Osei&background=f59e0b&color=fff',
    role: 'member',
    createdAt: '2024-01-15T00:00:00Z',
  },
];

/** The "logged in" user for demo purposes */
export const CURRENT_USER_ID = 'user-1';
