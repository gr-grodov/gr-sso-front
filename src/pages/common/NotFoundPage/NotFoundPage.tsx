import { CardFooter, CardHeader } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import { AppCardBlock } from "@/shared/widgets/AppCardBlock";
import { Home } from "lucide-react";
import { useTranslation } from "react-i18next";

export function NotFoundPage() {
  const {t} = useTranslation("common", {keyPrefix: "not_found_page"})

  return (
    <AppCardBlock>
      <CardHeader className="text-center">
        <span className="text-8xl text-accent font-extrabold mb-4 mt-8">
          {t("title")}
        </span>
        <h3>{t("subtitle")}</h3>
        <p>{t("description")}</p>
      </CardHeader>

      <CardFooter className="m-8">
        <LinkButton className="w-full" size='lg' to="/" replace={true}>
          <Home/>{t("actions.home")}
        </LinkButton>
      </CardFooter>

    </AppCardBlock>
  )
}
