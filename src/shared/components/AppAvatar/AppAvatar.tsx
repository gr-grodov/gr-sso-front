import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { useTheme } from "@/features/theme";
import type { Theme } from "@/features/theme/theme-context";
import type { ComponentPropsWithoutRef } from "react";

interface AppAvatarProps extends ComponentPropsWithoutRef<typeof Avatar> {
  value: string;
  disabled?: boolean;
};

export function AppAvatar({ value, disabled, ...props }: AppAvatarProps) {
  const { theme } = useTheme();
  const initials = getAppAvatarInitials(value);
  const color = getAppAvatarColor(value, theme);

  return (
    <Avatar {...props}>
      <AvatarFallback style={{background: disabled ? undefined : color}}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}

function getAppAvatarInitials(value: string): string {
  const username = value.split("@")[0].trim();

  const parts = username.split(/[._\-\s]+/).filter(Boolean);

  if (parts.length >= 2) {
    return (`${parts[0][0]}${parts[1][0]}`).toUpperCase();
  }

  return username.slice(0, 2).toUpperCase();
}

function getAppAvatarColor(value: string, theme: Theme): string {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }

  const hue = Math.abs(hash) % 360;

  return `hsl(${hue}, 65%, ${theme == 'light' ? '90%' : '20%'})`;
}