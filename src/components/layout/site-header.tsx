"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HeaderSearch } from "@/components/layout/header-search";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Container } from "@/components/layout/container";
import { SITE_CONFIG } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

/**
 * Main public site header.
 */
export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
      <Container className="relative flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full">
            <Image
            src="/branding/herbs-of-nepal-logo.svg"
            alt="Herbs of Nepal logo"
            height={200}
            width={200}
            />
          </span>

          <div className="flex flex-col">
            <span className="text-md font-semibold tracking-normal text-stone-900 sm:text-base">
              {SITE_CONFIG.name}
            </span>
            <span className="text-sm text-stone-500 sm:block">
              Nepalese herbal knowledge base.
            </span>
          </div>
        </Link>

        <div className="hidden flex-1 justify-center xl:flex">
          <HeaderSearch />
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <nav className="hidden items-center gap-2 xl:flex">
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
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}