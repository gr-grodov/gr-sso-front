import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

type DurationUnit = {
  key: string;
  seconds: number;
};

const DURATION_UNITS: DurationUnit[] = [
  {
    key: "months",
    seconds: 30 * 24 * 60 * 60,
  },
  {
    key: "days",
    seconds: 24 * 60 * 60,
  },
  {
    key: "hours",
    seconds: 60 * 60,
  },
  {
    key: "minutes",
    seconds: 60,
  },
  {
    key: "seconds",
    seconds: 1,
  },
];

interface FormatDurationTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  seconds: number
}

export function FormatDurationText({seconds, className, ...props}: FormatDurationTextProps) {
  const {t} = useTranslation("common", {keyPrefix: "duration"})

  return (
    <span className={className} {...props}>
      {formatDuration(seconds, t)}
    </span>
  )
}

function formatDuration(seconds: number, t: TFunction): string {
  if (seconds <= 0) {
    return t("seconds", {count: 0,});
  }

  let remainingSeconds = Math.floor(seconds);

  const parts: string[] = [];
  for (const unit of DURATION_UNITS) {
    const value = Math.floor(remainingSeconds / unit.seconds);

    if (value > 0) {
      parts.push(t(unit.key, {count: value,}));
      remainingSeconds %= unit.seconds;
    }
  }

  return parts.join(" ");
}

