import { Check, X } from "lucide-react";

interface Props {
    valid: boolean;
    message: string;
}

export function PasswordRule({ valid, message }: Props) {
  return (
    <div
      className={`flex items-center gap-2 text-xs transition-colors ${
        valid
          ? "text-green-600 dark:text-green-400"
          : "text-destructive"
      }`}
    >
      {valid ? <Check className="size-3" /> : <X className="size-3" />}

      <span>{message}</span>
    </div>
  );
}
