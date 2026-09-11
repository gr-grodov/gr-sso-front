import { toast } from "@/components/ui/toast";
import { profileInfo, type ProfileInfoSchema } from "@/features/schemas/profile-info.schema";
import { applyApiErrorsToForm } from "@/shared/api/utils/apply-errors-form";
import { ErrorUtils } from "@/shared/api/utils/error-utils";
import { UserInfoService } from "@/shared/service/user-info.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export function useProfileInfoForm() {
  const {t} = useTranslation("common", {keyPrefix: "profile"});
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<ProfileInfoSchema>({
    resolver: zodResolver(profileInfo),

    defaultValues: async () => {
      try {
        const response = await UserInfoService.userInfo();
        return {
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          patronymic: response.data.patronymic
        };
      } catch (err) {
        const error = await ErrorUtils.getErrorResponse(err);
        applyApiErrorsToForm(error, form.setError, setErrorMessage);
        return {};
      }
    },
  });

  async function submit(data: ProfileInfoSchema) {
    setErrorMessage("");
    try {
      UserInfoService.editProfile(data);
      toast.add({type: "success", description: t("actions.submit_success")})
    } catch (err) {
      const error = await ErrorUtils.getErrorResponse(err);
      applyApiErrorsToForm(error, form.setError, setErrorMessage);
    }
  }

  return {form, errorMessage, submit};
}