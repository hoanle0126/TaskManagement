"use client";

import { Search, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useUiStore } from "@/stores/uiStore";
import { useNotificationStore, selectUnreadCount } from "@/stores/notificationStore";
import { HOVER, TAP } from "@/lib/motion";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface TopbarProps {
  /** Optional page title to display */
  title?: string;
  /** Slot for breadcrumb or additional header content */
  children?: React.ReactNode;
}

export default function Topbar({ title, children }: TopbarProps) {
  const openPalette  = useUiStore((s) => s.openCommandPalette);
  const unreadCount  = useNotificationStore(selectUnreadCount) as number;

  return (
    <TooltipProvider delay={400}>
      <header
        role="banner"
        className={cn(
          "flex h-14 shrink-0 items-center gap-4",
          "border-b border-border bg-surface-elevated px-4",
        )}
      >
        {/* Left — breadcrumb / title slot */}
        <div className="flex flex-1 items-center gap-2 min-w-0">
          {children ?? (
            title && (
              <h1 className="truncate text-sm font-semibold text-foreground">
                {title}
              </h1>
            )
          )}
        </div>

        {/* Right — action bar */}
        <div className="flex items-center gap-1">
          {/* Search trigger */}
          <Tooltip>
            <TooltipTrigger
              render={
                <motion.button
                  type="button"
                  aria-label="Search (⌘K)"
                  onClick={openPalette}
                  whileHover={HOVER.scale}
                  whileTap={TAP.scale}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-2.5 py-1.5",
                    "text-xs text-muted-foreground",
                    "border border-border bg-surface transition-colors",
                    "hover:bg-accent hover:text-foreground",
                  )}
                >
                  <Search className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Search...</span>
                  <kbd className="hidden rounded border border-border bg-surface px-1 py-0.5 text-[10px] sm:inline">
                    ⌘K
                  </kbd>
                </motion.button>
              }
            />
            <TooltipContent>Open command palette</TooltipContent>
          </Tooltip>

          {/* Notification bell */}
          <Tooltip>
            <TooltipTrigger
              render={
                <motion.button
                  type="button"
                  aria-label={`Notifications${unreadCount ? ` (${unreadCount} unread)` : ""}`}
                  whileHover={HOVER.scale}
                  whileTap={TAP.scale}
                  className="relative flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Bell className="h-4 w-4" aria-hidden="true" />
                  {unreadCount > 0 && (
                    <span
                      aria-hidden="true"
                      className="absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand text-[9px] font-bold leading-none text-brand-foreground"
                    >
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </motion.button>
              }
            />
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>
        </div>
      </header>
    </TooltipProvider>
  );
}
