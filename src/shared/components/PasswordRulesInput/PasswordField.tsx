import type { PasswordFieldProps } from "./types.ts";
import { PasswordRules } from "./PasswordRules";
import { FormInput } from "@/shared/components/FormInput";
import type { FieldValues } from "react-hook-form";

export function PasswordField<T extends FieldValues>(
  props: PasswordFieldProps<T>,
) {
  return (
    <FormInput
      {...props}
      type="password"
      autoComplete="new-password"
      afterInput={(password: string) => (
        <div className="pt-4">
          <PasswordRules password={password} rules={props.rules} />
        </div>
      )}
    />
  );
}
