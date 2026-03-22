"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/stores/uiStore";
import { MOCK_USERS, CURRENT_USER_ID } from "@/lib/data/mock-users";
import { MOTION, HOVER, TAP, DURATION, getMotionSafe } from "@/lib/motion";
import SidebarNav from "@/components/layout/SidebarNav";
import SidebarProjectList from "@/components/layout/SidebarProjectList";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const SIDEBAR_EXPANDED_W  = 240;
const SIDEBAR_COLLAPSED_W = 56;

const currentUser = MOCK_USERS.find((u) => u.id === CURRENT_USER_ID)!;

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Sidebar() {
  const sidebarOpen   = useUiStore((s) => s.sidebarOpen);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const openModalFor  = useUiStore((s) => s.openModalFor);
  const openPalette   = useUiStore((s) => s.openCommandPalette);
  const router        = useRouter();

  const collapsed = !sidebarOpen;

  return (
    <TooltipProvider delay={400}>
      <motion.aside
        aria-label="Application sidebar"
        animate={{ width: collapsed ? SIDEBAR_COLLAPSED_W : SIDEBAR_EXPANDED_W }}
        transition={{ duration: DURATION.base, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "relative z-20 flex h-full shrink-0 flex-col",
          "border-r border-sidebar-border bg-sidebar",
        )}
      >
        {/* ── Header ─────────────────────────────────── */}
        <div
          className={cn(
            "flex h-14 items-center border-b border-sidebar-border px-3",
            collapsed ? "justify-center" : "justify-between",
          )}
        >
          <AnimatePresence mode="wait">
            {!collapsed ? (
              <motion.div
                key="logo-full"
                {...getMotionSafe(MOTION.fadeIn)}
                className="flex items-center gap-2"
              >
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-brand-foreground"
                >
                  <Zap className="h-4 w-4" />
                </span>
                <span className="font-heading text-sm font-bold tracking-tight text-foreground">
                  TaskFlow
                </span>
              </motion.div>
            ) : (
              <motion.span
                key="logo-icon"
                {...getMotionSafe(MOTION.fadeIn)}
                aria-label="TaskFlow"
                className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-brand-foreground"
              >
                <Zap className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>

          {!collapsed && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <motion.button
                    type="button"
                    aria-label="Collapse sidebar"
                    onClick={toggleSidebar}
                    whileHover={HOVER.scale}
                    whileTap={TAP.scale}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-sidebar-foreground/50 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  >
                    <PanelLeftClose className="h-4 w-4" />
                  </motion.button>
                }
              />
              <TooltipContent side="right">Collapse sidebar</TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* ── Quick Actions ───────────────────────────── */}
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-3",
            collapsed && "justify-center flex-col",
          )}
        >
          {/* New task button */}
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  size="sm"
                  aria-label="Create new task"
                  onClick={() => openModalFor("create-task")}
                  className={cn(
                    "h-8 bg-brand text-brand-foreground hover:opacity-90",
                    collapsed ? "w-8 px-0" : "flex-1 gap-1.5",
                  )}
                >
                  <Plus className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {!collapsed && <span>New Task</span>}
                </Button>
              }
            />
            {collapsed && <TooltipContent side="right">New Task</TooltipContent>}
          </Tooltip>

          {/* Search / command palette trigger */}
          {!collapsed && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    type="button"
                    aria-label="Open command palette (⌘K)"
                    onClick={openPalette}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <kbd className="text-[10px] font-semibold leading-none">⌘K</kbd>
                  </button>
                }
              />
              <TooltipContent side="right">Command palette</TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* ── Navigation ─────────────────────────────── */}
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-2 py-1">
          <SidebarNav collapsed={collapsed} />
          <SidebarProjectList collapsed={collapsed} />
        </div>

        {/* ── Footer — user ──────────────────────────── */}
        <div className="border-t border-sidebar-border px-2 py-3">
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    type="button"
                    aria-label={`${currentUser.name} — User settings`}
                    onClick={() => router.push("/settings")}
                    className="flex w-full items-center justify-center rounded-md py-1 hover:bg-sidebar-accent"
                  >
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                      <AvatarFallback className="text-[10px]">
                        {getInitials(currentUser.name)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                }
              />
              <TooltipContent side="right">{currentUser.name}</TooltipContent>
            </Tooltip>
          ) : (
            <Link
              href="/settings"
              aria-label="User settings"
              className="flex items-center gap-2.5 rounded-md px-2 py-2 transition-colors hover:bg-sidebar-accent"
            >
              <Avatar className="h-7 w-7 shrink-0">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="text-[10px]">
                  {getInitials(currentUser.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-foreground">
                  {currentUser.name}
                </p>
                <p className="truncate text-[10px] text-muted-foreground">
                  {currentUser.email}
                </p>
              </div>
            </Link>
          )}
        </div>

        {/* ── Expand tab (only when collapsed) ──────── */}
        {collapsed && (
          <button
            type="button"
            aria-label="Expand sidebar"
            onClick={toggleSidebar}
            className="absolute -right-3 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface-elevated shadow-sm transition-colors hover:bg-accent"
          >
            <PanelLeftOpen className="h-3 w-3 text-muted-foreground" />
          </button>
        )}
      </motion.aside>
    </TooltipProvider>
  );
}
