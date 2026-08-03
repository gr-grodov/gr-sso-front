import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar'
import type { PropsWithChildren, ReactNode } from 'react';

type AdminContentBlockProps = PropsWithChildren<{
  title: string,
  subtitle?: string,
  children?: ReactNode;
}>

export function AdminContentBlock({
  title,
  subtitle,
  children,
}: AdminContentBlockProps) {
  return (
    <>
      <header className="sticky bg-background top-0 flex shrink-0 items-center gap-2 border-b px-2">
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
    </>
  )
}
