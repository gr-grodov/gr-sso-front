import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { AppAvatarUploader } from '../AppAvatarUploader';
import { Field, FieldDescription, FieldError, FieldLegend } from '@/components/ui/field';


type AppAvatarUploaderFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  fallbackAvatar: string;
  label?: string;
  description?: string,
  showWithoutErrors?: boolean;
};

export function AppAvatarUploaderField<T extends FieldValues>({
  control,
  name,
  fallbackAvatar,
  label,
  description,
  showWithoutErrors
}: AppAvatarUploaderFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          {!!label && <FieldLegend>{label}</FieldLegend>}
          {!!description && <FieldDescription>{description}</FieldDescription>}
          <Field data-invalid={fieldState.invalid}>
            <AppAvatarUploader
              value={field.value}
              onChange={field.onChange}
              fallback={fallbackAvatar}
            />

            <FieldError
              showWithoutErrors={showWithoutErrors}
              errors={[fieldState.error]}
            />
          </Field>
        </>
      )}
    />
  )
}
