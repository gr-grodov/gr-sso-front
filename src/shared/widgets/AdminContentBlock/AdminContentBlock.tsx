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
      <header className="sticky bg-background top-0 flex shrink-0 items-center gap-2 border-b px-2 z-50">
        <div className="flex items-center gap-2 p-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <div>
            <p className='font-semibold text-base'>{title}</p>
            <p className="text-gray-500 text-xs">{subtitle}</p>
          </div>
        </div>
      </header>
      <main className='p-4 h-full'>
        {children}
      </main>
    </>
  )
}
