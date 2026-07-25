import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AdminSidebar } from '@/shared/components/AdminSidebar'
import { Logo } from '@/shared/icons/Logo';
import { Cancel } from '@hugeicons/core-free-icons';
import { Plus } from 'lucide-react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';



interface AdminContentBlockProps extends ComponentPropsWithoutRef<typeof SidebarProvider> {
  title: string,
  subtitle?: string,
  children?: ReactNode;
}

export function AdminContentBlock({
  title,
  subtitle,
  children,
  ...props
}: AdminContentBlockProps) {
  return (
    <SidebarProvider {...props}>
      <AdminSidebar/>
      <SidebarInset>
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b px-2">
          <div className="flex items-center gap-2 p-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <div>
              <h4>OAuth-клиенты</h4>
              <p className="text-gray-500 text-sm">2 активных · 3 всего</p>
            </div>
          </div>
        </header>
        <main className='p-4 h-full'>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
