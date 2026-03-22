"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function BreadcrumbNav({ items, className }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
      <ol className="flex items-center gap-1 text-xs text-muted-foreground">
        <li>
          <Link
            href="/dashboard"
            aria-label="Home"
            className="flex items-center rounded-sm p-0.5 hover:text-foreground transition-colors"
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className="max-w-[160px] truncate rounded-sm px-0.5 hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className="max-w-[160px] truncate font-medium text-foreground"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
