import { tError } from "@/shared/i18n";
import type { ErrorResponse } from "../dto/response/error-response";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { TFunction } from "i18next";
import type { Dispatch, SetStateAction } from "react";

export function applyApiErrors<T extends FieldValues>(
  response: ErrorResponse,
  setFieldError: UseFormSetError<T>,
  setGlobalError: Dispatch<SetStateAction<string>>
) {
  console.log('AAAAAAAAAAAAAAAAAaa');
  
  if (Array.isArray(response.errors) && response.errors.length > 0) {
    console.log(response.errors);

    response.errors.forEach((err) => {
      setFieldError(err.field as Path<T>, {
        type: "server",
        message: tError(`${err.field}.${err.code}`),
      });
  });
  } else {
    setGlobalError(tError(`global.${response.code}`))
  }
}