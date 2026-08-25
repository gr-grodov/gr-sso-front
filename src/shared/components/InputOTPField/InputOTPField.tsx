import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { getElementsByPattern, type ElementOTP, type OtpPattern } from './InputOTPField.pattern';
import { FieldError, FieldLegend } from '@/components/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, inputOtpSlotVariants } from '@/components/ui/input-otp';
import { useMemo, useRef } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { REGEXP_ONLY_DIGITS } from 'input-otp';


type InputOTPFieldProps<T extends FieldValues, S extends string> = {
  control: Control<T>;
  name: FieldPath<T>;

  label?: string;
  showWithoutErrors?: boolean;
  onSubmit?: () => void;
  disabled?: boolean;

  pattern: S extends OtpPattern<S> ? S : OtpPattern<S>
};

export function InputOTPField<T extends FieldValues, S extends string>({
  control,
  name,
  label,
  pattern,
  onSubmit,
  disabled,
  showWithoutErrors,
  size = "default",
  variant = "default"
}: InputOTPFieldProps<T, S> & VariantProps<typeof inputOtpSlotVariants>) {
  const elementsByGroups: ElementOTP[][] = useMemo(() => getElementsByPattern(pattern), [pattern]) ;
  const otpLen = useMemo(() => elementsByGroups.reduce((sum, group) => sum + group.length, 0), [elementsByGroups]);

  const nativeInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const imputOTPRef = (instance: HTMLInputElement | null) => {
          nativeInputRef.current = instance;
          field.ref(instance);
        };

        return (
          <>
            {!!label && <FieldLegend>{label}</FieldLegend>}
            <InputOTP
              {...field}
              ref={imputOTPRef}
              disabled={disabled}
              maxLength={otpLen} 
              pattern={REGEXP_ONLY_DIGITS}
              onComplete={(value) => {
                if (value.length == otpLen && onSubmit) {
                  onSubmit();
                  nativeInputRef?.current?.blur();
                }
              }}
            >
              {elementsByGroups.map((elements, indGroup) => (
                <>
                  <InputOTPGroup key={`group-${indGroup}`}>
                    {elements.map((element) => 
                      (<InputOTPSlot
                        aria-invalid={fieldState.invalid}
                        size={size}
                        variant={variant}
                        index={element.index} 
                        key={element.key}
                      />)
                    )}
                  </InputOTPGroup>
                  {indGroup != elementsByGroups.length - 1 
                    ? <InputOTPSeparator key={`separator-${indGroup}`}/> 
                    : null
                  }
                </>
              ))}
            </InputOTP>
            <FieldError
              showWithoutErrors={showWithoutErrors}
              errors={[fieldState.error]}
            />
          </>
        )
      }}
    />
  )
}
