export const ADMIN_HERB_EVIDENCE_OPTIONS = [
  { value: "TRADITIONAL_USE", label: "Traditional use documented" },
  { value: "LIMITED_EVIDENCE", label: "Limited evidence" },
  { value: "EMERGING_EVIDENCE", label: "Emerging evidence" },
  { value: "MODERATE_EVIDENCE", label: "Moderate evidence" },
  { value: "STRONG_EVIDENCE", label: "Strong evidence" },
  { value: "SAFETY_DATA_LIMITED", label: "Safety data limited" },
] as const;

export type HerbFormState = {
  message: string;
  fieldErrors: Record<string, string>;
};

export const INITIAL_HERB_FORM_STATE: HerbFormState = {
  message: "",
  fieldErrors: {},
};