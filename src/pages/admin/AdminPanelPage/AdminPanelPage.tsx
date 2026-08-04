import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AdminSidebar } from '@/shared/components/AdminSidebar'
import { Outlet } from 'react-router-dom'

export function AdminPanelPage() {
  return (
    <SidebarProvider>
      <AdminSidebar/>
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
