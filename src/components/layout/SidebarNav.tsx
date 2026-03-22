"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CheckSquare,
  Inbox,
  Settings,
} from "lucide-react";
import NavItem from "@/components/layout/NavItem";
import { MOTION, getMotionSafe } from "@/lib/motion";
import { useNotificationStore, selectUnreadCount } from "@/stores/notificationStore";

const NAV_ITEMS = [
  { href: "/dashboard",  label: "Dashboard", icon: LayoutDashboard },
  { href: "/my-tasks",   label: "My Tasks",  icon: CheckSquare },
  { href: "/inbox",      label: "Inbox",     icon: Inbox },
  { href: "/settings",   label: "Settings",  icon: Settings },
] as const;

interface SidebarNavProps {
  collapsed?: boolean;
}

export default function SidebarNav({ collapsed = false }: SidebarNavProps) {
  const unreadCount = useNotificationStore(selectUnreadCount);

  const stagger = getMotionSafe(MOTION.stagger);

  return (
    <nav aria-label="Main navigation">
      <AnimatePresence mode="wait">
        <motion.ul
          key={collapsed ? "collapsed" : "expanded"}
          variants={stagger}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-col gap-0.5 list-none p-0 m-0"
        >
          {NAV_ITEMS.map(({ href, label, icon }) => (
            <motion.li
              key={href}
              variants={getMotionSafe(MOTION.staggerItem)}
            >
              <NavItem
                href={href}
                label={label}
                icon={icon}
                collapsed={collapsed}
                badge={href === "/inbox" ? (unreadCount as number) : undefined}
              />
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </nav>
  );
}
