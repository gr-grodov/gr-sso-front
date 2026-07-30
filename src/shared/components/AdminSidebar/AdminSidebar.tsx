import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar'
import { Logo } from '@/shared/icons/Logo'
import { Settings, ShieldCog, ShieldUser } from 'lucide-react'
import { NavSidebar, type NavItem } from './NavSidebar'

const navigationData: NavItem[] = [
  {
    titleKey: 'navigation.oauth_clients',
    url: '/admin/oauth-clients',
    icon: ShieldCog
  },
  {
    titleKey: 'navigation.oauth_users',
    url: '/admin/oauth-users',
    icon: ShieldUser
  },
  {
    titleKey: 'navigation.settings',
    url: '/admin/settings',
    icon: Settings
  }
]

export function AdminSidebar() {
  return (
    <Sidebar variant="sidebar">
      <SidebarHeader className='flex-row mb-5 '>
        <Logo height={48}/>
      </SidebarHeader>
      <SidebarContent className='px-1'>
        <NavSidebar items={navigationData}/>
      </SidebarContent>
      <SidebarFooter>
        
      </SidebarFooter>
    </Sidebar>
  )
}
