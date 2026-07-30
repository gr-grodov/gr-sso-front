import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export interface NavItem {
  titleKey: string,
  url: string,
  icon: LucideIcon
}

export function NavSidebar({items}: {items: NavItem[]}) {
  const { t } = useTranslation("admin");
  const navigate = useNavigate();

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.titleKey}>
          <SidebarMenuButton onClick={() => navigate(item.url, {replace: true})}>
            <item.icon/>{t(item.titleKey)}
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}