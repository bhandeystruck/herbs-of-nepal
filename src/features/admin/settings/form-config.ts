export type SettingsFormState = {
  message: string;
  fieldErrors: Record<string, string>;
};

export const INITIAL_SETTINGS_FORM_STATE: SettingsFormState = {
  message: "",
  fieldErrors: {},
};