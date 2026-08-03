import { Card, CardHeader } from "@/components/ui/card.tsx";
import styles from "./AppContentBlock.module.css";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Logo } from "@/shared/icons/Logo.tsx";
import { LogoIcon } from "@/shared/icons/LogoIcon";

interface CardWithIconProps extends ComponentPropsWithoutRef<typeof Card> {
  title: string;
  subtitle: string;
  showIcon?: boolean;
  children: ReactNode;
}

export function AppContentBlock({
  title,
  subtitle,
  showIcon,
  children,
  ...props
}: CardWithIconProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card {...props}>
        <CardHeader className="pt-12">
          <h3>{title}</h3>
          <p className="text-gray-500">{subtitle}</p>
        </CardHeader>
        {children}
      </Card>
    </div>
  );
}
