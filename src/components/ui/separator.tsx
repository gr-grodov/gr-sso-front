"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "@/lib/utils"
import {cva, type VariantProps} from "class-variance-authority";

const separatorVariants = cva(
  "shrink-0",
  {
    variants: {
      orientation: {
        horizontal: "h-[0.5px] w-full",
        vertical: "w-[0.5px] h-full"
      },
      variant: {
        default: "bg-border",
        muted: "bg-muted"
      }
    },
    defaultVariants: {
      orientation: "horizontal",
      variant: "default"
    },
  },

)

function Separator({
  className,
  orientation = "horizontal",
  variant = 'default',
  ...props
}: SeparatorPrimitive.Props & VariantProps<typeof separatorVariants>) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(separatorVariants({orientation, variant, className}))}
      {...props}
    />
  )
}

export { Separator }
