import {type Control, type FieldPath, type FieldValues,} from "react-hook-form";

export interface PasswordRule {
  id: string;
  message: string;
  test: (password: string) => boolean;
}

export type PasswordFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;

  label: string;
  placeholder?: string;
  autoComplete?: string;
  showWithoutErrors?: boolean;

  rules: PasswordRule[];
};