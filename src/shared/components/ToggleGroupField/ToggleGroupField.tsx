import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { Field, FieldError, FieldLegend } from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export type ToggleOption = {
  value: string;
  label: string;
};

type ToggleGroupFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  options: ToggleOption[];
  showWithoutErrors?: boolean;
};

export function ToggleGroupField<T extends FieldValues>({
  control,
  name,
  label,
  options,
  showWithoutErrors = false,
}: ToggleGroupFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          <FieldLegend>{label}</FieldLegend>
          <Field data-invalid={fieldState.invalid}>
            <ToggleGroup
              multiple
              value={field.value ?? []}
              onValueChange={field.onChange}
              className="flex flex-wrap justify-start"
            >
              {options.map((option) => (
                <ToggleGroupItem
                  variant='outline'
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>

            <FieldError
              showWithoutErrors={showWithoutErrors}
              errors={[fieldState.error]}
            />
          </Field>
        </>
      )}
    />
  );
}