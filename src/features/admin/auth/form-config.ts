export type AdminLoginState = {
  message: string;
  fieldErrors: Record<string, string>;
};

export const INITIAL_ADMIN_LOGIN_STATE: AdminLoginState = {
  message: "",
  fieldErrors: {},
};