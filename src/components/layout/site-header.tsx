"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SITE_CONFIG } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

/**
 * Main public site header.
 */
export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
      <Container className="relative flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
            <Leaf className="h-5 w-5 text-emerald-700" />
          </span>

          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-stone-900 sm:text-base">
              {SITE_CONFIG.name}
            </span>
            <span className="hidden text-xs text-stone-500 sm:block">
              Nepalese herbal knowledge base.
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {SITE_CONFIG.navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-stone-700 hover:bg-white hover:text-emerald-700"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <MobileNav />
      </Container>
    </header>
  );
}