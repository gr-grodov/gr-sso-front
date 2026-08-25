import { tError } from "@/shared/i18n";
import type { ErrorResponse } from "../dto/response/error.response";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { Dispatch, SetStateAction } from "react";

export function applyApiErrorsToForm<T extends FieldValues>(
  response: ErrorResponse,
  setFieldError: UseFormSetError<T>,
  setGlobalError: Dispatch<SetStateAction<string>>
) {
  if (Array.isArray(response.errors) && response.errors.length > 0) {
    console.log(response.errors);

    response.errors.forEach((err) => {
      const field = err.field.split('.').at(-1)
      
      setFieldError(field as Path<T>, {
        type: "server",
        message: tError(`${err.field}.${err.code}`),
      });
    });
  } else {
    setGlobalError(tError(`global.${response.code}`))
  }
}