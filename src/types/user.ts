/**
 * types/user.ts — User entity
 */

export interface User {
  id: string;
  name: string;
  email: string;
  /** URL — e.g. ui-avatars.com/api */
  avatar: string;
  /** Global role */
  role: 'admin' | 'member';
  /** ISO 8601 */
  createdAt: string;
}
