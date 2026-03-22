"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, Megaphone, Palette, type LucideIcon } from "lucide-react";
import { useProjectStore } from "@/stores/projectStore";
import { MOTION, getMotionSafe } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Map project icon name -> Lucide component */
const PROJECT_ICON_MAP: Record<string, LucideIcon> = {
  Layers,
  Megaphone,
  Palette,
};

interface SidebarProjectListProps {
  collapsed?: boolean;
}

export default function SidebarProjectList({ collapsed = false }: SidebarProjectListProps) {
  const projects = useProjectStore((s) => s.projects);
  const pathname = usePathname();

  const stagger = getMotionSafe(MOTION.stagger);

  return (
    <section aria-label="Projects">
      {!collapsed && (
        <p className="mb-1.5 px-2.5 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40 select-none">
          Projects
        </p>
      )}

      <motion.ul
        variants={stagger}
        initial="initial"
        animate="animate"
        className="flex flex-col gap-0.5 list-none p-0 m-0"
      >
        {projects.map((project) => {
          const Icon = PROJECT_ICON_MAP[project.icon ?? "Layers"] ?? Layers;
          const href = `/projects/${project.id}`;
          const isActive = pathname.startsWith(href);

          return (
            <motion.li
              key={project.id}
              variants={getMotionSafe(MOTION.staggerItem)}
            >
              <Link
                href={href}
                aria-label={collapsed ? project.name : undefined}
                className={cn(
                  "group relative flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors duration-150",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive
                    ? "bg-brand-muted text-brand font-semibold"
                    : "text-sidebar-foreground/70",
                  collapsed && "justify-center px-2",
                )}
              >
                {/* Colour dot */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded",
                    isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100",
                  )}
                  style={{ color: project.color }}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>

                {!collapsed && (
                  <span className="truncate">{project.name}</span>
                )}

                {/* Active indicator */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-0.5 rounded-r-full bg-brand"
                  />
                )}
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
