/**
 * lib/data/mock-tasks.ts — Re-exports combined from split task data files
 *
 * Split by project to keep files ≤ 200 lines (G1):
 *   mock-tasks-a.ts  → project-1
 *   mock-tasks-p2.ts → project-2
 *   mock-tasks-b.ts  → project-3
 */

import { MOCK_TASKS_A } from './mock-tasks-a';
import { MOCK_TASKS_P2 } from './mock-tasks-p2';
import { MOCK_TASKS_B } from './mock-tasks-b';

export const MOCK_TASKS = [...MOCK_TASKS_A, ...MOCK_TASKS_P2, ...MOCK_TASKS_B];
