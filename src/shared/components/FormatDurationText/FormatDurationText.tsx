import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

type DurationKey = "years" | "months" | "days" | "hours" | "minutes" | "seconds";

type DurationUnit = {
  key: DurationKey;
  seconds: number;
};

const DURATION_UNITS: DurationUnit[] = [
  {
    key: "years",
    seconds: 365 * 24 * 60 * 60,
  },
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
  seconds: number,
  withoutUnit?: DurationKey[];
  message?: (duration: string) => string
}

export function FormatDurationText({seconds, withoutUnit, message, className, ...props}: FormatDurationTextProps) {
  const {t} = useTranslation("common", {keyPrefix: "duration"});
  const durationUnits = DURATION_UNITS.filter((unit) => !withoutUnit?.includes(unit.key))

  return (
    <span className={className} {...props}>
      {!!message ? message(formatDuration(seconds, durationUnits, t)) : formatDuration(seconds, durationUnits, t)}
    </span>
  )
}

function formatDuration(seconds: number, durationUnits: DurationUnit[], t: TFunction): string {
  if (seconds <= 0) {
    return t("seconds", {count: 0,});
  }

  let remainingSeconds = Math.floor(seconds);

  const parts: string[] = [];
  for (const unit of durationUnits) {
    const value = Math.floor(remainingSeconds / unit.seconds);

    if (value > 0) {
      parts.push(t(unit.key, {count: value}));
      remainingSeconds %= unit.seconds;
    }
  }

  return parts.join(" ");
}

