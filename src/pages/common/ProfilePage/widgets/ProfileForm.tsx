import { useAuth } from '@/features/auth'
import type { ProfileInfoSchema } from '@/features/schemas/profile-info.schema'
import { AppAvatarUploaderField } from '@/shared/components/AppAvatarUploaderField'
import { FieldGroupForm } from '@/shared/components/FieldGroupForm'
import { InputField } from '@/shared/components/InputField'
import type { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface ProfileFormProps {
  form: UseFormReturn<ProfileInfoSchema>,
  errorMessage: string,
  submit: (data: ProfileInfoSchema) => void
}

export function ProfileForm({
  form,
  errorMessage,
  submit
}: ProfileFormProps) {
  const {user} = useAuth();
  const {t} = useTranslation("common", {keyPrefix: "profile.fields"});
  
  return (
    <form id="profile-form" onSubmit={form.handleSubmit(submit)}>
      <FieldGroupForm errorMessage={errorMessage}>
        <AppAvatarUploaderField
          fallbackAvatar={user?.email ?? ""}
          control={form.control}
          name='avatarId'
        />
        <br/>
        <InputField
          control={form.control}
          name="firstName"
          label={t("firstName.label")}
          placeholder={t("firstName.hint")}
          showWithoutErrors={true}
        />
        <InputField
          control={form.control}
          name="lastName"
          label={t("lastName.label")}
          placeholder={t("lastName.hint")}
          showWithoutErrors={true}
        />
        <InputField
          control={form.control}
          name="patronymic"
          label={t("patronymic.label")}
          placeholder={t("patronymic.hint")}
          showWithoutErrors={true}
        />
      </FieldGroupForm>
    </form>
  )
}
