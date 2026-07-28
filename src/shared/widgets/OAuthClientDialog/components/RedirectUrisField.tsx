import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import type { OauthClientSchema } from '@/features/schemas/oauth2-client.schema';
import { XIcon } from 'lucide-react';
import React from 'react'
import { Controller, useFieldArray, type Control } from 'react-hook-form';

type RedirectUrisFieldProps = {
  label: string,
  placeholder: string,
  control: Control<OauthClientSchema>;
};

export default function RedirectUrisField({
  label,
  placeholder,
  control
}: RedirectUrisFieldProps) {
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "redirectUris",
  })

  return (
    <>
    <FieldSet>
      <FieldLegend>{label}</FieldLegend>
      <FieldDescription>
        Add up to 5 email addresses where we can contact you.
      </FieldDescription>
      <FieldGroup>
        {fields.map((field, index) => (
          <Controller
            key={field.id}
            name={`redirectUris.${index}.uri`}
            control={control}
            render={({ field: controllerField, fieldState }) => (
              <Field
                orientation="horizontal"
                data-invalid={fieldState.invalid}
              >
                <FieldContent>
                  <InputGroup>
                    <InputGroupInput
                      {...controllerField}
                      id={`form-rhf-array-email-${index}`}
                      aria-invalid={fieldState.invalid}
                      placeholder={placeholder}
                    />
                    {fields.length > 1 && (
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => remove(index)}
                        >
                          <XIcon />
                        </InputGroupButton>
                      </InputGroupAddon>
                    )}
                  </InputGroup>
                  <FieldError errors={[fieldState.error]} />
                </FieldContent>
              </Field>
            )}
          />
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ uri: "" })}
          disabled={fields.length >= 5}
        >
          Add Email Address
        </Button>
      </FieldGroup>
    </FieldSet>
    </>
  )
}
