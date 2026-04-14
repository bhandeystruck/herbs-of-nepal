/**
 * Supported herb sort options for the public herb directory.
 */
export type HerbSort =
  | "featured"
  | "newest"
  | "name-asc"
  | "name-desc";


/**
 * Search-ready herb filter shape used across the page and query layer.
 */
export type HerbFilters = {
  query?: string;
  category?: string;
  featured?: boolean;
  sort?: HerbSort;
};