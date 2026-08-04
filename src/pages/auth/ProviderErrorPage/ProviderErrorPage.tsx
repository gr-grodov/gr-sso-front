import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { AppCardBlock } from '@/shared/widgets/AppCardBlock'
import { OAuthButtonsBlock } from '@/shared/widgets/OAuthButtonsBlock/OAuthButtonsBlock';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';

export function ProviderErrorPage() {
  const { t } = useTranslation("auth", {keyPrefix: "provider_error"});
  const [searchParams] = useSearchParams();
  const errorMessage = t(
    `.errors.${searchParams.get("code")}`,
    {
      defaultValue: t("errors.default"),
    }
  );

  return (
    <>
      <AppCardBlock>
        <CardHeader className="mt-10">
          <h3 className="font-semibold">{t("title")}</h3>
          <p>{t("subtitle")}</p>
        </CardHeader>

        <CardContent>
          <Card className="bg-red-100 text-destructive p-4">
            {errorMessage}
          </Card>
        </CardContent>

        <CardFooter className="flex flex-col mt-20">
          <OAuthButtonsBlock className="w-full"/>
          <Button size="lg" className="w-full" variant="link">
            <Link to="/login" replace>{t("actions.login")}</Link>
          </Button>
        </CardFooter>
      </AppCardBlock>
    </>
  )
}
