"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ShoppingBag, Package, Users, TrendingUp, Settings,
  Menu, X, Search, Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin", ready: true },
  { label: "Orders", icon: ShoppingBag, ready: false },
  { label: "Products", icon: Package, ready: false },
  { label: "Customers", icon: Users, ready: false },
  { label: "Analytics", icon: TrendingUp, ready: false },
  { label: "Settings", icon: Settings, ready: false },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* ───── Sidebar ───── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-neutral-900 text-neutral-300 transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-5">
          <span className="font-heading text-lg font-bold text-white">Normadas</span>
          <span className="size-1.5 rounded-full bg-gold" />
          <span className="ml-auto rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-neutral-300">
            Admin
          </span>
          <button className="ml-1 lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
            <X className="size-4" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.ready && pathname === item.href;
            const content = (
              <span
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-white/10 font-medium text-white"
                    : item.ready
                      ? "text-neutral-400 hover:bg-white/5 hover:text-white"
                      : "cursor-default text-neutral-500",
                )}
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
                {active && <span className="ml-auto size-1.5 rounded-full bg-gold" />}
                {!item.ready && (
                  <span className="ml-auto rounded bg-white/5 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-neutral-600">
                    Soon
                  </span>
                )}
              </span>
            );
            return item.ready ? (
              <Link key={item.label} href={item.href!} onClick={() => setOpen(false)}>
                {content}
              </Link>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-full bg-gold text-xs font-bold text-gold-foreground">
              AN
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">Admin</p>
              <p className="truncate text-xs text-neutral-500">admin@normadas.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setOpen(false)} aria-hidden />
      )}

      {/* ───── Main column ───── */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-card/80 px-4 backdrop-blur-md sm:px-6">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="size-5" />
          </button>
          <div>
            <h1 className="font-heading text-base font-bold leading-none sm:text-lg">Dashboard</h1>
            <p className="mt-0.5 hidden text-xs text-muted-foreground sm:block">Welcome back 👋</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search…"
                className="h-9 w-44 rounded-md border bg-background pl-8 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <button className="relative grid size-9 place-items-center rounded-md border bg-background hover:bg-muted" aria-label="Notifications">
              <Bell className="size-4" />
              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-gold" />
            </button>
            <div className="grid size-9 place-items-center rounded-full bg-neutral-900 text-xs font-bold text-white">
              AN
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
}
