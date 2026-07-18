import {Card, CardHeader} from "@/components/ui/card.tsx";
import styles from "./CardWithIcon.module.css";
import logo from "@/assets/images/logo.svg";
import type {ComponentPropsWithoutRef, ReactNode} from "react";

interface CardWithIconProps extends ComponentPropsWithoutRef<typeof Card> {
  title: string;
  subtitle: string;
  children?: ReactNode;
}

export function CardWithIcon({title, subtitle, children, ...props}: CardWithIconProps) {
  return (
    <Card className={styles.card} {...props}>
      <CardHeader className="pt-12">
        <div>
          <h2>{title}</h2>
          <p className="text-gray-500">{subtitle}</p>
        </div>
      </CardHeader>
      {children}
    </Card>
  );
}