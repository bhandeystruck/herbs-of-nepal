export type BlogFormState = {
  message: string;
  fieldErrors: Record<string, string>;
};

export const INITIAL_BLOG_FORM_STATE: BlogFormState = {
  message: "",
  fieldErrors: {},
};