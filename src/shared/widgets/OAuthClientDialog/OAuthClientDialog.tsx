import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { oauthClientSchema, type OauthClientSchema } from '@/features/schemas/oauth2-client.schema'
import { FieldGroupForm } from '@/shared/components/FieldGroupForm'
import { FormInput } from '@/shared/components/FormInput'
import { Button } from '@base-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

export function OAuthClientDialog() {
  const form = useForm<OauthClientSchema>({
    resolver: zodResolver(oauthClientSchema),

    defaultValues: {
      name: "",
      clientID: "",
      redirectUris: [],
      scopes: ["openid"],
    }
  });

  form.control

  return (
    <Dialog>
      <DialogTrigger render={<Button size="lg"><Plus/>Добавить</Button>} />
      <form>
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
              name="email"
              label={t("login.fields.email.label")}
              placeholder={t("login.fields.email.hint")}
              showWithoutErrors={true}
            />
            <FormInput
              control={form.control}
              name="password"
              type="password"
              label={t("login.fields.password.label")}
              placeholder={t("login.fields.password.hint")}
              showWithoutErrors={true}
            />
          </FieldGroupForm>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
