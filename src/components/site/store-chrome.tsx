"use client";

import { usePathname } from "next/navigation";

/**
 * Decides whether to wrap the page in the storefront chrome (Navbar + Footer).
 * Admin routes (/admin/*) render full-bleed with their own dashboard shell.
 *
 * Navbar/Footer are passed in as slots from the (server) root layout so this
 * client component never has to import server components directly.
 */
export function StoreChrome({
  navbar,
  footer,
  children,
}: {
  navbar: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  if (isAdmin) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      {navbar}
      <main className="flex-1">{children}</main>
      {footer}
    </>
  );
}
