import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

type LogicalCheckboxFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  checkboxLabel: string;
  checkboxDescription?: string;
  showWithoutErrors?: boolean;
};

export function LogicalCheckboxField<T extends FieldValues>({
  control,
  name,
  label,
  checkboxLabel,
  checkboxDescription,
  showWithoutErrors
}: LogicalCheckboxFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FieldSet>
          {!!label && <FieldLegend>{label}</FieldLegend>}

          <Field orientation="horizontal">
            <Checkbox
              id={name}
              name={name}
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-invalid={fieldState.invalid}
            />

            <FieldContent className='ps-1'>
              <FieldLabel htmlFor={name}>{checkboxLabel}</FieldLabel>
              {!!checkboxDescription && <FieldDescription>
                {checkboxDescription}
              </FieldDescription>}
            </FieldContent>
          </Field>

          <FieldError
            showWithoutErrors={showWithoutErrors}
            errors={[fieldState.error]}
          />
        </FieldSet>
      )}
    />
  )
}
