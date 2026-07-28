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
import { Separator } from '@/components/ui/separator'

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
            <DialogTitle>{t('oauth_clients.dialog.title')}</DialogTitle>
            <DialogDescription>{t('oauth_clients.dialog.subtitle')}</DialogDescription>
          </DialogHeader>
          <FieldGroupForm errorMessage={errorMessage}>
            <FormInput
              control={form.control}
              name="name"
              label={t("oauth_clients.dialog.fields.name.label")}
              placeholder={t("oauth_clients.dialog.fields.name.hint")}
            />
            <FormInput
              control={form.control}
              name="clientID"
              label={t("oauth_clients.dialog.fields.cliend_id.label")}
              placeholder={t("oauth_clients.dialog.fields.cliend_id.hint")}
            />
            <RedirectUrisField
              label={t("oauth_clients.dialog.fields.cliend_id.label")}
              placeholder={t("oauth_clients.dialog.fields.cliend_id.label")}
              control={form.control}
            />
            <Button type='submit' form='oauth-client-form'>Save changes</Button>
          </FieldGroupForm>
        </DialogContent>
      </form>
    </Dialog>
  )
}
