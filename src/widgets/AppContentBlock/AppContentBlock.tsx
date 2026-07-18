import {Card, CardHeader} from "@/components/ui/card.tsx";
import styles from "./AppContentBlock.module.css";
import type {ComponentPropsWithoutRef, ReactNode} from "react";
import {Logo} from "@/shared/icons/Logo.tsx";

interface CardWithIconProps extends ComponentPropsWithoutRef<typeof Card> {
  title: string;
  subtitle: string;
  children?: ReactNode;
}

export function AppContentBlock({title, subtitle, children, ...props}: CardWithIconProps) {
  return (
    <div className={styles.content}>
      <div className="p-2">
        <Logo className="h-12"/>
      </div>
      <Card className={styles.card} {...props}>
        <CardHeader className="pt-12">
          <div>
            <h2>{title}</h2>
            <p className="text-gray-500">{subtitle}</p>
          </div>
        </CardHeader>
        {children}
      </Card>
    </div>
  );
}