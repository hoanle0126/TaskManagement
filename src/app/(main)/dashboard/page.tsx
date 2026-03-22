import Topbar from "@/components/layout/Topbar";

export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col">
      <Topbar title="Dashboard" />
      <div className="flex-1 overflow-y-auto p-6">
        <p className="text-muted-foreground text-sm">
          Dashboard — coming soon.
        </p>
      </div>
    </div>
  );
}
