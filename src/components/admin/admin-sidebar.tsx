"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  FileText,
  FolderTree,
  LayoutDashboard,
  Library,
  Settings,
  Upload,
} from "lucide-react";
import { ADMIN_NAV_ITEMS } from "@/lib/constants/admin";
import { cn } from "@/lib/utils/cn";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Dashboard: LayoutDashboard,
  Herbs: Library,
  Categories: FolderTree,
  Sources: BookOpen,
  Blog: FileText,
  Media: Upload,
  Settings: Settings,
};

/**
 * Shared sidebar for the admin area.
 */
export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-stone-200 bg-white xl:block">
      <div className="flex h-full flex-col">
        <div className="border-b border-stone-200 px-6 py-6">
          <Link href="/admin" className="block">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Admin
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-stone-900">
              Herbs of Nepal
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-500">
              Content management workspace
            </p>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-5">
          <div className="space-y-2">
            {ADMIN_NAV_ITEMS.map((item) => {
              const Icon = iconMap[item.label];
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                  )}
                >
                  {Icon ? <Icon className="h-4 w-4" /> : null}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-stone-200 px-6 py-5">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-400">
            Current phase
          </p>
          <p className="mt-2 text-sm font-medium text-stone-700">
            Admin shell setup
          </p>
        </div>
      </div>
    </aside>
  );
}