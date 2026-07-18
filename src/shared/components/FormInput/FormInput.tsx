import {type Control, Controller, type FieldPath, type FieldValues,} from "react-hook-form";
import {Field, FieldError, FieldLabel,} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as React from "react";

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;

  label: string;
  placeholder?: string;
  showWithoutErrors?: boolean;

  type?: React.HTMLInputTypeAttribute;

  autoComplete?: string;
};

export function FormInput<T extends FieldValues>(
  {control, name, label, placeholder, showWithoutErrors, type = "text", autoComplete}: FormInputProps<T>
) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>

          <Input
            {...field}
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
        </Field>
      )}
    />
  );
}