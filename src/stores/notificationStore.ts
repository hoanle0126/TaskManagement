/**
 * stores/notificationStore.ts — Zustand 5 store for notifications
 *
 * Initialised from mock data. Supports mark-as-read and clear-all.
 */
"use client";

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { MOCK_NOTIFICATIONS } from "@/lib/data/mock-notifications";
import { CURRENT_USER_ID } from "@/lib/data/mock-users";
import type { Notification } from "@/types/common";

// ─── State & Actions ──────────────────────────────────────────────────────────

interface NotificationState {
  notifications: Notification[];
}

interface NotificationActions {
  markAsRead:    (id: string) => void;
  markAllAsRead: () => void;
  dismiss:       (id: string) => void;
  clearAll:      () => void;
}

export type NotificationStore = NotificationState & NotificationActions;

// ─── Store ────────────────────────────────────────────────────────────────────

export const useNotificationStore = create<NotificationStore>()(
  subscribeWithSelector((set, get) => ({
    // ─── initial state — filter to current user ───────────────────────────
    notifications: MOCK_NOTIFICATIONS.filter(
      (n) => n.recipientId === CURRENT_USER_ID,
    ),

    // ─── actions ──────────────────────────────────────────────────────────
    markAsRead: (id) =>
      set({ notifications: get().notifications.map(
        (n) => n.id === id ? { ...n, isRead: true } : n,
      )}),

    markAllAsRead: () =>
      set({ notifications: get().notifications.map(
        (n) => ({ ...n, isRead: true }),
      )}),

    dismiss: (id) =>
      set({ notifications: get().notifications.filter((n) => n.id !== id) }),

    clearAll: () => set({ notifications: [] }),
  })),
);

// ─── Derived selectors ─────────────────────────────────────────────────────────

export const selectUnreadCount = (s: NotificationStore): number =>
  s.notifications.filter((n) => !n.isRead).length;
