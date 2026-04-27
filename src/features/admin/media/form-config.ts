export type MediaUploadFormState = {
  message: string;
  error: string;
  uploadedPath?: string;
  publicUrl?: string;
};

export const INITIAL_MEDIA_UPLOAD_FORM_STATE: MediaUploadFormState = {
  message: "",
  error: "",
  uploadedPath: "",
  publicUrl: "",
};