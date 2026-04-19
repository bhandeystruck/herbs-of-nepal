export const ADMIN_SOURCE_TYPE_OPTIONS = [
  { value: "GOVERNMENT_FACT_SHEET", label: "Government fact sheet" },
  { value: "PEER_REVIEWED_REVIEW", label: "Peer-reviewed review" },
  { value: "SYSTEMATIC_REVIEW", label: "Systematic review" },
  { value: "META_ANALYSIS", label: "Meta-analysis" },
  { value: "CLINICAL_TRIAL", label: "Clinical trial" },
  { value: "JOURNAL_ARTICLE", label: "Journal article" },
  { value: "UNIVERSITY_ARTICLE", label: "University article" },
  { value: "ETHNOBOTANICAL_REFERENCE", label: "Ethnobotanical reference" },
  { value: "BOOK", label: "Book" },
  { value: "INSTITUTIONAL_PDF", label: "Institutional PDF" },
  { value: "ORGANIZATION_PAGE", label: "Organization page" },
  { value: "OTHER", label: "Other" },
] as const;

export type SourceFormState = {
  message: string;
  fieldErrors: Record<string, string>;
};

export const INITIAL_SOURCE_FORM_STATE: SourceFormState = {
  message: "",
  fieldErrors: {},
};