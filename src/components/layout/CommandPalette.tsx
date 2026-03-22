"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  Inbox,
  Settings,
  Layers,
  Plus,
  Zap,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useUiStore } from "@/stores/uiStore";
import { useProjectStore } from "@/stores/projectStore";

const STATIC_COMMANDS = [
  { id: "dashboard",    label: "Go to Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "my-tasks",     label: "My Tasks",         icon: CheckSquare,     href: "/my-tasks" },
  { id: "inbox",        label: "Inbox",             icon: Inbox,           href: "/inbox" },
  { id: "settings",     label: "Settings",          icon: Settings,        href: "/settings" },
] as const;

export default function CommandPalette() {
  const open         = useUiStore((s) => s.commandPaletteOpen);
  const closePalette = useUiStore((s) => s.closeCommandPalette);
  const openModalFor = useUiStore((s) => s.openModalFor);
  const projects     = useProjectStore((s) => s.projects);
  const router       = useRouter();

  /* ── Keyboard shortcut ──────────────────────────── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        useUiStore.getState().commandPaletteOpen
          ? closePalette()
          : useUiStore.getState().openCommandPalette();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [closePalette]);

  /* ── Navigate & close ───────────────────────────── */
  const navigate = useCallback(
    (href: string) => {
      closePalette();
      router.push(href);
    },
    [closePalette, router],
  );

  const createTask = useCallback(() => {
    closePalette();
    openModalFor("create-task");
  }, [closePalette, openModalFor]);

  return (
    <CommandDialog open={open} onOpenChange={(v) => !v && closePalette()}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Quick actions */}
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={createTask}>
            <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>Create new task</span>
            <kbd className="ml-auto text-[10px] text-muted-foreground">⌘N</kbd>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Pages */}
        <CommandGroup heading="Pages">
          {STATIC_COMMANDS.map(({ id, label, icon: Icon, href }) => (
            <CommandItem key={id} onSelect={() => navigate(href)}>
              <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>{label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        {/* Projects */}
        {projects.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Projects">
              {projects.map((project) => (
                <CommandItem
                  key={project.id}
                  onSelect={() => navigate(`/projects/${project.id}`)}
                >
                  <Layers
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                    style={{ color: project.color }}
                  />
                  <span>{project.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {/* Productivity */}
        <CommandSeparator />
        <CommandGroup heading="Productivity">
          <CommandItem onSelect={() => navigate("/focus")}>
            <Zap className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>Start Focus Mode</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
