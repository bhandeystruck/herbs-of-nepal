import Link from "next/link";
import { Leaf } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SITE_CONFIG } from "@/lib/constants/site";

/**
 * Main public site header.
 * Minimal for now, but already structured for future navigation enhancements.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-emerald-700" />
          <span className="text-base font-semibold tracking-tight text-stone-900">
            {SITE_CONFIG.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {SITE_CONFIG.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stone-700 transition hover:text-emerald-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}