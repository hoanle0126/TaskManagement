"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
  /** Compact mode (sidebar collapsed) */
  collapsed?: boolean;
}

export default function NavItem({
  href,
  label,
  icon: Icon,
  badge,
  collapsed = false,
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      aria-label={collapsed ? label : undefined}
      className={cn(
        "group relative flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium",
        "transition-colors duration-150",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isActive
          ? "bg-brand-muted text-brand font-semibold"
          : "text-sidebar-foreground/70",
        collapsed && "justify-center px-2",
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn(
          "h-4 w-4 shrink-0 transition-colors duration-150",
          isActive ? "text-brand" : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground",
        )}
      />

      {!collapsed && (
        <span className="truncate">{label}</span>
      )}

      {badge !== undefined && badge > 0 && (
        <span
          aria-label={`${badge} unread`}
          className={cn(
            "ml-auto flex h-4 min-w-4 items-center justify-center rounded-full px-1",
            "text-[10px] font-semibold leading-none",
            "bg-brand text-brand-foreground",
            collapsed && "absolute right-1 top-1 ml-0",
          )}
        >
          {badge > 99 ? "99+" : badge}
        </span>
      )}

      {/* Active indicator bar */}
      {isActive && (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-0.5 rounded-r-full bg-brand"
        />
      )}
    </Link>
  );
}
