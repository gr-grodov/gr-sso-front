import {Field, FieldError, FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {type Control, Controller, type FieldPath, type FieldValues,} from "react-hook-form";
import * as React from "react";

type PasswordInputWithRulesProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;

  label: string;
  placeholder?: string;
  showWithoutErrors?: boolean;
  rules: Array<{rule: RegExp, message: string}>;

  type?: React.HTMLInputTypeAttribute;

  autoComplete?: string;
};

export function PasswordInputWithRules<T extends FieldValues>(
  {control, name, label, placeholder, showWithoutErrors, type = "text", autoComplete}: PasswordInputWithRulesProps<T>
) {
  

  return (
    <div>
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

      <div>

      </div>

    </div>
  );
}