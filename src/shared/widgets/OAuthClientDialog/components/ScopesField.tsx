import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { OauthClientSchema } from '@/features/schemas/oauth2-client.schema';
import React from 'react'
import { Controller, type Control, type ControllerFieldState, type ControllerRenderProps, type UseFormStateReturn } from 'react-hook-form'

const listScopes = ["openid", "profile", "email"]

type ScopesFieldProps = {
  label: string,
  placeholder: string,
  control: Control<OauthClientSchema>;
};

export default function ScopesField({
  control
}: ScopesFieldProps) {

  return (
    <>
      <Controller
        control={control}
        name='scopes'
        render={({ field: controllerField, fieldState }) => (
          <FieldSet>
            <FieldLegend></FieldLegend>
            <FieldDescription></FieldDescription>
            <ToggleGroup>
              {listScopes.map((scope) => (
                <ToggleGroupItem />
              ))}
            </ToggleGroup>
          </FieldSet>
        )}/>
    </>
  )
}
