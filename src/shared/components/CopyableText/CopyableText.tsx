import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const copyableTextVariants = cva(
  "inline-flex items-center gap-1 bg-transparent shadow-none",
  {
    variants: {
      variant: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        destructive: "text-destructive",
      },
      size: {
        default: "text-xs",
        xs: "text-xs",
        sm: "text-sm",
        lg: "text-lg"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type CopyableTextProps = {
  value: string;
  className?: string;
};

export function CopyableText({
  value,
  variant = "default",
  size = "default",
  className,
}: CopyableTextProps & VariantProps<typeof copyableTextVariants>) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy text", error);
    }
  }

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <div className={cn(copyableTextVariants({ variant, size, className }))}>
      <span className="truncate">{value}</span>

      <Button
        variant="ghost"
        size="icon-sm"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="text-allowed" />
        ) : (
          <Copy className="text-foreground"/>
        )}
      </Button>
    </div>
  );
}