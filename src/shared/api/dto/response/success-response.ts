export interface SuccessResponse<T> {
  success: boolean;
  message: boolean;
  data: T;
}