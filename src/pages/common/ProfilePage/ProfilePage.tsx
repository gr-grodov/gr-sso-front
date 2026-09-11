import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/features/auth";
import { AppCardBlock } from "@/shared/widgets/AppCardBlock";
import { UserInformationBlock } from "@/shared/widgets/UserInformationBlock";
import { useTranslation } from "react-i18next";
import { useProfileInfoForm } from "./hooks/use-profile-info-form";
import { ProfileFormLoading } from "./widgets/ProfileFormLoading";
import { ProfileForm } from "./widgets/ProfileForm";


export function ProfilePage() {
  const {t} = useTranslation("common", {keyPrefix: "profile"});
  const {user} = useAuth();

  const {form, errorMessage, submit} = useProfileInfoForm();
  const {formState: { isSubmitting, isLoading } } = form;

  return (
    <AppCardBlock>
      <CardHeader>
        <h3 className="font-semibold">{t("title")}</h3>
        <p>{t("subtitle", {email: user?.email})}</p>
      </CardHeader>

      <CardContent>
        {isLoading 
          ? <ProfileFormLoading/> 
          : <ProfileForm form={form} submit={submit} errorMessage={errorMessage}/>
        }
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <Button type="submit" className="w-full" disabled={isSubmitting || isLoading} form="profile-form">
          {t("actions.submit")}
          {isSubmitting && <Spinner data-icon="inline-start" />}
        </Button>
        <UserInformationBlock/>
      </CardFooter>
    </AppCardBlock>
  )
}
