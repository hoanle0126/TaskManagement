"use client";

import Sidebar from "@/components/layout/Sidebar";
import CommandPalette from "@/components/layout/CommandPalette";

interface AppShellProps {
  children: React.ReactNode;
}

/**
 * AppShell — Root layout shell.
 * Renders Sidebar + main content area + global overlays (CommandPalette).
 * Does NOT include Topbar — pages render their own topbar via <Topbar />.
 */
export default function AppShell({ children }: AppShellProps) {
  return (
    <>
      <div className="flex h-screen w-full overflow-hidden bg-surface">
        <Sidebar />

        <main
          id="main-content"
          className="flex min-w-0 flex-1 flex-col overflow-hidden"
        >
          {children}
        </main>
      </div>

      {/* Global overlays */}
      <CommandPalette />
    </>
  );
}
