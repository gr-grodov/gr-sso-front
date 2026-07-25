import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { oauthClientSchema, type OauthClientSchema } from '@/features/schemas/oauth2-client.schema'
import { FieldGroupForm } from '@/shared/components/FieldGroupForm'
import { FormInput } from '@/shared/components/FormInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { string } from 'zod'
import RedirectUrisField from './components/RedirectUrisField'

export function OAuthClientDialog() {
  const {t} = useTranslation("admin");
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<OauthClientSchema>({
    resolver: zodResolver(oauthClientSchema),

    defaultValues: {
      name: "",
      clientID: "",
      redirectUris: [{uri: ""}],
      scopes: ["openid"],
    }
  });

  async function onSubmit() {
      try {
        await form.trigger();
        if (form.formState.isValid) {
        }
      } catch(err) {
      }
    }

  return (
    <Dialog>
      <DialogTrigger render={<Button size="lg"><Plus/>Добавить</Button>} />
      <form id="oauth-client-form" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroupForm errorMessage={errorMessage}>
            <FormInput
              control={form.control}
              name="name"
              label={t("login.fields.email.label")}
              placeholder={t("login.fields.email.hint")}
              showWithoutErrors={true}
            />
            <FormInput
              control={form.control}
              name="clientID"
              label={t("login.fields.password.label")}
              placeholder={t("login.fields.password.hint")}
              showWithoutErrors={true}
            />
            <RedirectUrisField control={form.control}/>
            <Button type='submit' form='oauth-client-form'>Save changes</Button>
          </FieldGroupForm>
        </DialogContent>
      </form>
    </Dialog>
  )
}
