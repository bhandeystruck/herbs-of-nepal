export type CategoryFormState = {
  message: string;
  fieldErrors: Record<string, string>;
};

export const INITIAL_CATEGORY_FORM_STATE: CategoryFormState = {
  message: "",
  fieldErrors: {},
};