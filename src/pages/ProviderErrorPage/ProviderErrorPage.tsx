import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AppContentBlock } from '@/shared/widgets/AppContentBlock'
import { OAuthButtonsBlock } from '@/shared/widgets/OAuthButtonsBlock/OAuthButtonsBlock';
import { useTranslation } from 'react-i18next';

export function ProviderErrorPage() {
  const { t } = useTranslation("auth");


  return (
    <>
      <AppContentBlock
        title={t("provider_error.title")}
        subtitle={t("provider_error.subtitle")}
      >
        <CardContent>
          <Card className="bg-red-100 text-destructive p-4">
            {t("provider_error.errors.default")}
          </Card>
        </CardContent>

        <CardFooter className="flex flex-col">
          <OAuthButtonsBlock className="w-full"/>
          <Button size="lg" className="w-full" variant="link">
            {t("provider_error.actions.login")}
          </Button>
        </CardFooter>
      </AppContentBlock>
    </>
  )
}
