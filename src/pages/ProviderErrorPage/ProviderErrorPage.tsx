import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AppContentBlock } from '@/shared/widgets/AppContentBlock'
import { OAuthButtonsBlock } from '@/shared/widgets/OAuthButtonsBlock/OAuthButtonsBlock';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';

export function ProviderErrorPage() {
  const { t } = useTranslation("auth");
  const [searchParams] = useSearchParams();
  const errorMessage = t(
    `provider_error.errors.${searchParams.get("code")}`,
    {
      defaultValue: t("provider_error.errors.default"),
    }
  );

  return (
    <>
      <AppContentBlock
        title={t("provider_error.title")}
        subtitle={t("provider_error.subtitle")}
        className="w-lg"
      >
        <CardContent>
          <Card className="bg-red-100 text-destructive p-4">
            {errorMessage}
          </Card>
        </CardContent>

        <CardFooter className="flex flex-col">
          <OAuthButtonsBlock className="w-full"/>
          <Button size="lg" className="w-full" variant="link">
            <Link to="/login" replace>{t("provider_error.actions.login")}</Link>
          </Button>
        </CardFooter>
      </AppContentBlock>
    </>
  )
}
