import { cn } from "@/lib/utils"
import { LoaderCircle, RefreshCw } from "lucide-react"

type SpinnerType = "LOAD" | "REFRESH";

type SpinnerProps = React.ComponentProps<"svg"> & {
  type?: SpinnerType;
  enabled?: boolean;
};

function Spinner({
  type = "LOAD",
  enabled = true,
  className,
  ...props
}: SpinnerProps) {
  const Icon = type === "REFRESH" ? RefreshCw : LoaderCircle;

  return (
    <Icon
      role="status"
      aria-label="Loading"
      className={cn(`size-4 ${enabled && 'animate-spin'}`, className)}
      {...props}
    />
  );
}

export { Spinner };
