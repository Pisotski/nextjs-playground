export type ApiResponse<T = unknown> = {
  data?: T;
  success: boolean;
  error?: string | null;
};
