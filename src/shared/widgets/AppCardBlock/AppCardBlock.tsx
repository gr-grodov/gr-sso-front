import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card.tsx";
import { useTheme } from "@/features/theme";
import { Moon, Sun } from "lucide-react";
import type { ReactNode } from "react";

interface CardWithIconProps {
  children: ReactNode;
}

export function AppCardBlock({ children }: CardWithIconProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex h-dvh flex-col">
      <div className="flex justify-end p-2">
        <Button variant="ghost" size="icon-lg" onClick={toggleTheme}>
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
      </div>

      <div className="flex flex-1 items-center justify-center p-2">
        <Card className="w-md">
          {children}
        </Card>
      </div>
    </div>
  );
}