import { useRef } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppAvatarUploader } from "./use-app-avatar-uploader";
import { ACCEPTED_TYPES } from "./AppAvatarUploader.constant";
import { AppAvatar } from "../AppAvatar";
import { Spinner } from "@/components/ui/spinner";
import { useTranslation } from "react-i18next";

export interface AppAvatarUploaderProps {
  value: string | null;
  onChange: (value: string | null) => void;
  disabled?: boolean;
  fallback: string;
}

export function AppAvatarUploader({
  value,
  onChange,
  disabled = false,
  fallback
}: AppAvatarUploaderProps) {
  const {t} = useTranslation("common", {keyPrefix: "avatar_uploader"});
  const inputRef = useRef<HTMLInputElement>(null);
  const {imageUrl, loading, error, upload, clearFile} = useAppAvatarUploader(value, onChange)

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (disabled || loading) {
      return;
    }

    const file = event.dataTransfer.files[0];
    if (file) {
      void upload(file);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>,) => {
    const file = event.target.files?.[0];
    if (file) {
      void upload(file);
    }
    event.target.value = "";
  };

  const handleClick = () => {
    if (!disabled && !loading) {
      inputRef.current?.click();
    }
  }

  const deleteFile = () => {
    onChange(null);
    clearFile();
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row px-2 items-center justify-between gap-2">
        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          className={cn(
            "relative",
            "rounded-full",
            "cursor-pointer",
            disabled && "cursor-not-allowed opacity-50",
          )}
          onClick={handleClick}
        >
          {!!imageUrl 
            ? <Avatar size="2xl">
                <AvatarImage src={imageUrl} alt="Avatar" className="object-cover"/>
              </Avatar>
            : <AppAvatar initials={fallback} size="2xl"/>
          }

          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            className="hidden"
            disabled={disabled || loading}
            onChange={handleFileChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs text-muted-foreground text-right">
            {t("description")}
          </span>
          
          <div className="flex flex-row-reverse gap-2">
            <Button variant='outline' onClick={handleClick} disabled={disabled || loading}>
              {loading && <Spinner/>}
              {t("actions.upload")}
            </Button>
            {value && !loading && (
              <Button variant="destructive" onClick={deleteFile} disabled={disabled}>
                {t("actions.delete")}
              </Button>
            )}
          </div>

          {error && <span className="text-xs text-destructive text-right w-full">{error}</span>}
        </div>
      </div>
    </div>
  );
}