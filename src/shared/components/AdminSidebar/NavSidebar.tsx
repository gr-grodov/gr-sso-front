import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export interface NavItem {
  titleKey: string,
  url: string,
  icon: LucideIcon
}

export function NavSidebar({items}: {items: NavItem[]}) {
  const { t } = useTranslation("admin");

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.titleKey}>
          <SidebarMenuButton>
            <item.icon />
            <Link to={item.url}>{t(item.titleKey)}</Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}