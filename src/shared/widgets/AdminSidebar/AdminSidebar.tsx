import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar'
import { Logo } from '@/shared/icons/Logo'
import { Settings, ShieldCog, ShieldUser } from 'lucide-react'
import { NavSidebar, type NavItem } from './NavSidebar'
import { UserInformationBlock } from '@/shared/widgets/UserInformationBlock'

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
        <UserInformationBlock/>
      </SidebarFooter>
    </Sidebar>
  )
}
