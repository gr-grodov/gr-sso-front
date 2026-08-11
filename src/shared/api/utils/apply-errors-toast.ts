import { tError } from "@/shared/i18n";
import type { ErrorResponse } from "../dto/response/error.response";
import { toast } from "@/components/ui/toast";

export function applyApiErrorToToast(response: ErrorResponse) {
  toast.add({
    type: "error",
    description: tError(`global.${response.code}`),
    timeout: 2000
  });
}