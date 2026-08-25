import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"

import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { DotFreeIcons, MinusSignIcon } from "@hugeicons/core-free-icons"
import { cva, type VariantProps } from "class-variance-authority"

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "cn-input-otp flex items-center has-disabled:opacity-50",
        containerClassName
      )}
      spellCheck={false}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        "flex items-center rounded-md has-aria-invalid:border-destructive has-aria-invalid:ring-2 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

const inputOtpSlotVariants = cva(
  "relative flex items-center justify-center border-y border-r border-input bg-input/20 transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-2 data-[active=true]:ring-ring/30 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default: "",
        primary: "text-primary",
        secondary: "text-secondary",
        accent: "text-accent",
      },
      size: {
        default: "size-8 text-base/relaxed",
        xs: "size-6 text-xs/relaxed",
        sm: "size-7 text-sm/relaxed",
        lg: "size-9 text-base/relaxed",
        xl: "size-11 text-2xl/relaxed"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function InputOTPSlot({
  index,
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputOtpSlotVariants> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}
  console.log(inputOTPContext);
  
  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(inputOtpSlotVariants({variant, size, className}))}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className="flex items-center [&_svg:not([class*='size-'])]:size-4"
      role="separator"
      {...props}
    >
      <span className="w-2"/>
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, inputOtpSlotVariants, InputOTPSeparator }
