import type { FieldError } from "./field-error";

export interface ErrorResponse {
  code: string;
  message?: string | null;
  errors?: FieldError[];
}