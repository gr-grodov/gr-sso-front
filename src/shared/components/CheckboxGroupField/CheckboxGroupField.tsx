import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldError, FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

export type CheckboxOption = {
  value: string;
  label: string;
};

type CheckboxGroupFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  options: CheckboxOption[];
  showWithoutErrors?: boolean;
};

export function CheckboxGroupField<T extends FieldValues>({
  control,
  name,
  label,
  options,
  showWithoutErrors = false,
}: CheckboxGroupFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FieldSet>
          <FieldLegend>{label}</FieldLegend>

          <FieldGroup className='mt-2'>
            {options.map(option => {
              const values = (field.value ?? []) as string[];

              return (
                <Field key={option.value} orientation="horizontal">
                  <Checkbox
                    id={`checkbox-${option.value}`}
                    checked={values.includes(option.value)}
                    onCheckedChange={(value) => {
                      if (value) {
                        field.onChange([...values, option.value]);
                      } else {
                        field.onChange(values.filter((v: string) => v !== option.value));
                      }
                    }}
                  />

                  <Label 
                    htmlFor={`checkbox-${option.value}`}
                    className='ps-1'
                  >
                    {option.label}
                  </Label>
              </Field>
              )
            })}
          </FieldGroup>

          <FieldError
            showWithoutErrors={showWithoutErrors}
            errors={[fieldState.error]}
          />
        </FieldSet>
      )}
    />
  );
}