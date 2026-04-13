/**
 * Central site-wide configuration.
 * Keeping this in one place prevents hardcoded values across the codebase.
 */
export const SITE_CONFIG = {
  name: "Herbs of Nepal",
  description:
    "A modern educational platform exploring Nepalese herbs, their benefits, traditional uses, preparation methods, and safety guidance.",
  url: "http://localhost:3000",
  navLinks: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Herbs",
      href: "/herbs",
    },
    {
      label: "Categories",
      href: "/categories",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Safety",
      href: "/safety",
    },
  ],
} as const;