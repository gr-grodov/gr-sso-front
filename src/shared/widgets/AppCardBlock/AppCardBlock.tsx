import { Card } from "@/components/ui/card.tsx";
import type { ReactNode } from "react";

interface CardWithIconProps {
  children: ReactNode;
}

export function AppCardBlock({children}: CardWithIconProps) {
  return (
    <div className="flex h-full w-full items-center justify-center p-2">
      <Card className="w-md">
        {children}
      </Card>
    </div>
  );
}
