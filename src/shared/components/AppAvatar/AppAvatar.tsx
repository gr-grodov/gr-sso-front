import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useTheme } from "@/features/theme";
import type { Theme } from "@/features/theme/theme-context";
import { AttachmentService } from "@/shared/service/attachment.service";
import type { ComponentPropsWithoutRef } from "react";

interface AppAvatarProps extends ComponentPropsWithoutRef<typeof Avatar> {
  initials: string;
  imageId?: string;
  disabled?: boolean
};

export function AppAvatar({ initials, imageId, disabled , ...props }: AppAvatarProps) {
  const {theme} = useTheme();
  const color = getAppAvatarColor(initials, theme);

  return (
    <Avatar {...props}>
      {!!imageId 
        ? <AvatarImage src={AttachmentService.getResourceURI(imageId)}/>
        : <AvatarFallback style={{background: disabled ? undefined : color}}>
            {getAppAvatarInitials(initials)}
          </AvatarFallback>
      }
    </Avatar>
  );
}

function getAppAvatarInitials(value: string): string {
  const initials = value.split("@")[0].trim();
  const parts = initials.split(/[._\-\s]+/).filter(Boolean);

  if (parts.length >= 2) {
    return (`${parts[0][0]}${parts[1][0]}`).toUpperCase();
  }

  return initials.slice(0, 2).toUpperCase();
}

function getAppAvatarColor(value: string, theme: Theme): string {
  if (!value) {
    return `hsl(0, 0%, ${theme == 'light' ? '90%' : '20%'})`;
  }

  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }

  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 65%, ${theme == 'light' ? '90%' : '20%'})`;
}