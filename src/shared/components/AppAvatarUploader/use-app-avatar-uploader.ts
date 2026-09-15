import { AttachmentService } from "@/shared/service/attachment.service";
import { useCallback, useEffect, useState } from "react";
import { ACCEPTED_TYPES, MAX_SIZE } from "./AppAvatarUploader.constant";

export function useAppAvatarUploader(
  value: string | null,
  onChangeValue: (id: string | null) => void
) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const upload = useCallback(async (file: File) => {
    setError(null);
    const fileError = getErrorFromFile(file);
    if (!!fileError) {
      setError(fileError);
      return
    }

    const objectUrlFile = URL.createObjectURL(file);
    setPreview((previous) => {
      if (previous) {
        URL.revokeObjectURL(previous);
      }
      return objectUrlFile;
    });

    try {
      setLoading(true);
      const response = await AttachmentService.upload(file);
      onChangeValue(response.data.id);
    } catch(err) {
      setError("Не удалось загрузить изображение");
      setPreview(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearFile = useCallback(() => {
    setError(null);
    setPreview(null);
  }, [onChangeValue])

  const imageUrl = preview ?? (value ? AttachmentService.getResourceURI(value) : null);

  return {imageUrl, loading, error, upload, clearFile}
}

function getErrorFromFile(file: File): string | null {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return "Поддерживаются JPG, PNG и WEBP";
  }

  if (file.size > MAX_SIZE) {
    return "Максимальный размер файла — 5 МБ";
  }

  return null;
}