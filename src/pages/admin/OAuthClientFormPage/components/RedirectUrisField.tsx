import { Button } from '@/components/ui/button';
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field';
import type { OauthClientSchema } from '@/features/schemas/oauth2-client.schema';
import { InputField } from '@/shared/components/InputField';
import { XIcon } from 'lucide-react';
import { useFieldArray, type Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type RedirectUrisFieldProps = {
  control: Control<OauthClientSchema>;
};

export default function RedirectUrisField({
  control
}: RedirectUrisFieldProps) {
  const {t} = useTranslation("admin", { keyPrefix: 'oauth_clients.form' });
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "redirectUris",
  })

  return (
    <FieldSet>
      <FieldLegend>{t("fields.redirectUris.label")}</FieldLegend>
      <FieldDescription>{t("fields.redirectUris.description")}</FieldDescription>
      <FieldGroup>

        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <InputField
              control={control}
              name={`redirectUris.${index}.uri`}
              placeholder={t("fields.redirectUris.hint")}
            />

            {fields.length > 1 && (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => remove(index)}
              >
                <XIcon />
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="xs"
          onClick={() => append({ uri: "" })}
          disabled={fields.length >= 5}
        >
          {t("fields.redirectUris.action_add")}
        </Button>
      </FieldGroup>
    </FieldSet>
  )
}
