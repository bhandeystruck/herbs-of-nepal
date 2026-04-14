"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { SITE_CONFIG } from "@/lib/constants/site";

/**
 * Simple mobile navigation for smaller screens.
 */
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 transition hover:border-emerald-300 hover:text-emerald-700"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen ? (
        <div className="absolute inset-x-0 top-full z-50 border-b border-stone-200 bg-stone-50 shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <nav className="flex flex-col gap-2">
              {SITE_CONFIG.navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href || pathname.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-sm font-medium transition",
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
          </div>
        </div>
      ) : null}
    </div>
  );
}