import type { Metadata } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants/site";

/**
 * Root metadata for the application.
 * This acts as the default metadata layer for the full app.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  keywords: [
    "Nepalese herbs",
    "Herbs of Nepal",
    "Ayurvedic herbs",
    "Himalayan herbs",
    "medicinal plants Nepal",
    "traditional herbal uses",
  ],
  authors: [{ name: "Herbs of Nepal" }],
  creator: "Herbs of Nepal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
};

/**
 * Root layout applied to the whole application.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-stone-50 text-stone-900 antialiased">
        {children}
      </body>
    </html>
  );
}