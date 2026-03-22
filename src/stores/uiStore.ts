/**
 * stores/uiStore.ts — Zustand 5 store for UI transient state
 *
 * Manages modals, panels, command palette, and focus mode.
 * No persistence — resets on page reload.
 */
"use client";

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

// ─── Types ─────────────────────────────────────────────────────────────────

export type ModalId =
  | 'create-task'
  | 'edit-task'
  | 'create-project'
  | 'delete-confirm'
  | 'invite-member'
  | 'task-detail';

export interface FocusSession {
  taskId: string;
  /** Duration in minutes */
  durationMinutes: number;
  /** Epoch ms when the session started */
  startedAt: number;
}

// ─── State & Actions ──────────────────────────────────────────────────────────

interface UiState {
  /** Currently open modal, or null */
  openModal:          ModalId | null;
  /** Entity ID passed to the open modal */
  modalEntityId:      string | null;
  /** Whether the left sidebar is expanded */
  sidebarOpen:        boolean;
  /** Whether the command palette is active */
  commandPaletteOpen: boolean;
  /** Whether the right detail panel is open */
  detailPanelOpen:    boolean;
  /** Active focus mode session, or null when inactive */
  focusSession:       FocusSession | null;
}

interface UiActions {
  openModalFor:       (modal: ModalId, entityId?: string) => void;
  closeModal:         () => void;
  toggleSidebar:      () => void;
  setSidebarOpen:     (open: boolean) => void;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  openDetailPanel:    () => void;
  closeDetailPanel:   () => void;
  startFocusSession:  (taskId: string, durationMinutes: number) => void;
  endFocusSession:    () => void;
}

export type UiStore = UiState & UiActions;

// ─── Store ────────────────────────────────────────────────────────────────────

export const useUiStore = create<UiStore>()(
  subscribeWithSelector((set) => ({
    // ─── initial state ────────────────────────────────────────────────────
    openModal:           null,
    modalEntityId:       null,
    sidebarOpen:         true,
    commandPaletteOpen:  false,
    detailPanelOpen:     false,
    focusSession:        null,

    // ─── actions ──────────────────────────────────────────────────────────
    openModalFor: (modal, entityId) =>
      set({ openModal: modal, modalEntityId: entityId ?? null }),

    closeModal: () =>
      set({ openModal: null, modalEntityId: null }),

    toggleSidebar: () =>
      set((s) => ({ sidebarOpen: !s.sidebarOpen })),

    setSidebarOpen: (open) =>
      set({ sidebarOpen: open }),

    openCommandPalette: () =>
      set({ commandPaletteOpen: true }),

    closeCommandPalette: () =>
      set({ commandPaletteOpen: false }),

    openDetailPanel: () =>
      set({ detailPanelOpen: true }),

    closeDetailPanel: () =>
      set({ detailPanelOpen: false }),

    startFocusSession: (taskId, durationMinutes) =>
      set({ focusSession: { taskId, durationMinutes, startedAt: Date.now() } }),

    endFocusSession: () =>
      set({ focusSession: null }),
  })),
);
