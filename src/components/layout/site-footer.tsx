import Link from "next/link";
import { Leaf } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SITE_CONFIG } from "@/lib/constants/site";

/**
 * Main public site footer.
 * Redesigned to feel more premium, calm, and editorial.
 */
export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-stone-200 bg-gradient-to-b from-stone-50 to-white">
      <Container className="py-14">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 ring-1 ring-emerald-200">
                <Leaf className="h-5 w-5 text-emerald-700" />
              </span>

              <div>
                <h2 className="text-lg font-semibold tracking-tight text-stone-900">
                  {SITE_CONFIG.name}
                </h2>
                <p className="text-sm text-stone-500">
                  Nepalese herbal knowledge
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-stone-600">
              A modern educational platform exploring Nepalese herbs, their
              traditional uses, cultural significance, and responsible safety
              guidance in a clear and accessible format.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-900">
              Explore
            </h3>

            <nav className="mt-5 flex flex-col gap-3">
              {SITE_CONFIG.footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-stone-600 transition hover:translate-x-0.5 hover:text-emerald-700"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-900">
              Safety Notice
            </h3>

            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm leading-7 text-amber-950/90">
                This platform is for educational purposes only and does not
                replace professional medical advice, diagnosis, or treatment.
              </p>

              <Link
                href="/safety"
                className="mt-4 inline-flex text-sm font-semibold text-amber-900 transition hover:text-amber-700"
              >
                Read full safety guidance →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-stone-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>

          <p className="text-xs text-stone-500">
            Built to preserve and present herbal knowledge with clarity and respect.
          </p>
        </div>
      </Container>
    </footer>
  );
}