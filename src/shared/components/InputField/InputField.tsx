import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Field, FieldError, FieldLegend } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as React from "react";

type InputFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;

  label?: string;
  placeholder?: string;
  showWithoutErrors?: boolean;

  afterInput?: (value: string) => React.ReactNode;
  type?: React.HTMLInputTypeAttribute;

  autoComplete?: string;
};

export function InputField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  showWithoutErrors,
  afterInput,
  type = "text",
  autoComplete
}: InputFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          {!!label && <FieldLegend>{label}</FieldLegend>}
          <Field data-invalid={fieldState.invalid}>
          <Input
            {...field}
            value={field.value ?? ""}
            id={name}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            aria-invalid={fieldState.invalid}
          />

          <FieldError
            showWithoutErrors={showWithoutErrors}
            errors={[fieldState.error]}
          />

          {afterInput?.(field.value ?? "")}
        </Field>
        </>
      )}
    />
  );
}
