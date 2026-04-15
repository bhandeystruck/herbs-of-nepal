import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SITE_CONFIG } from "@/lib/constants/site";
import Image from "next/image";

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
              <span className="flex h-11 w-11 items-center justify-center rounded-full ">
                  <Link href={"/"}>
                     <Image
                    src="/branding/herbs-of-nepal-logo.svg"
                    alt="Herbs of Nepal logo"
                    height={200}
                    width={200}
                  /></Link>
               
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

             <p className="mt-4 max-w-md text-xs leading-6 text-stone-500">
              We aim to present herbal information with sourcing, review context,
              and clear distinctions between traditional use and evidence-aware
              interpretation.
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
              <p className="text-sm leading-7 text-amber-950/90 mb-2">
                This platform is for educational purposes only and does not
                replace professional medical advice, diagnosis, or treatment.
              </p>

              <div className="flex flex-col gap-2">
                <Link
                  href="/safety"
                  className="text-sm font-semibold text-amber-900 transition hover:text-amber-700"
                >
                  Read safety guidance →
                </Link>

                <Link
                  href="/editorial-standards"
                  className="text-sm font-semibold text-stone-800 transition hover:text-emerald-700"
                >
                  Read editorial standards →
                </Link>
              </div>
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