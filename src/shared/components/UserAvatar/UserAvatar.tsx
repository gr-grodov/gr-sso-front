import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import type { ComponentPropsWithoutRef } from "react";

interface UserAvatarProps extends ComponentPropsWithoutRef<typeof Avatar> {
  email: string;
};

export function UserAvatar({ email, ...props }: UserAvatarProps) {
  const initials = getAvatarInitials(email);

  return (
    <Avatar {...props}>
      <AvatarFallback>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}

export function getAvatarInitials(email: string): string {
  const username = email.split("@")[0].trim();

  const parts = username.split(/[._\-\s]+/).filter(Boolean);

  if (parts.length >= 2) {
    return (`${parts[0][0]}${parts[1][0]}`).toUpperCase();
  }

  return username.slice(0, 2).toUpperCase();
}