import { verifyEmailShema, type VerifyEmailForm } from "@/features/schemas/verify-email.schema";
import type { ErrorResponse } from "@/shared/api/dto/response";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";

export type VerifyEmailInitState = {
  userEmail: string,
  verifyId: string
}

export function useVerifyEmailForm(failInitForm: (error: ErrorResponse) => void) {
  const [verifyEmailInfo, setVerifyEmailInfo] = useState<VerifyEmailInitState | null>(null);
  const locationState = useLocation().state as VerifyEmailInitState | null;

  console.log(locationState);
  
  useEffect(() => {
    setVerifyEmailInfo(locationState);

    if (!locationState || !locationState.userEmail || !locationState.verifyId) {
      failInitForm({code: "verify_email_init_not_found"});
    }
  }, [locationState])

  const form = useForm<VerifyEmailForm>({
    resolver: zodResolver(verifyEmailShema),
    defaultValues: {
      verifyCode: ""
    },
  });

  return {verifyEmailInfo, form}
}