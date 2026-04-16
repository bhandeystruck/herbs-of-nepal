/**
 * Central admin navigation configuration.
 * Keeps future admin pages organized and easy to extend.
 */
export const ADMIN_NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/admin",
  },
  {
    label: "Herbs",
    href: "/admin/herbs",
  },
  {
    label: "Categories",
    href: "/admin/categories",
  },
  {
    label: "Sources",
    href: "/admin/sources",
  },
  {
    label: "Blog",
    href: "/admin/blog",
  },
  {
    label: "Media",
    href: "/admin/media",
  },
  {
    label: "Settings",
    href: "/admin/settings",
  },
] as const;