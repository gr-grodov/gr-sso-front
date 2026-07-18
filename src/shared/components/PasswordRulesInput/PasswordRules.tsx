import type { PasswordRule as Rule } from "./types";
import { PasswordRule } from "./PasswordRule";

interface Props {
  password: string;
  rules: Rule[];
}

export function PasswordRules({ password, rules }: Props) {
  return (
    <div className="space-y-1">
      {rules.map((rule) => (
        <PasswordRule
          key={rule.id}
          message={rule.message}
          valid={rule.test(password)}
        />
      ))}
    </div>
  );
}