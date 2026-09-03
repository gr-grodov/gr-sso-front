import { Field, FieldContent, FieldDescription, FieldError, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";

export interface RadioGroupOption {
  value: string | number;
  label: string;
  description?: string;
}

export interface RadioGroupCustomOption {
  label: string;
  description?: string;
  type: "number" | "text";
}

type RadioGroupFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  clearable?: boolean;
  options: RadioGroupOption[];
  customOption?: RadioGroupCustomOption;
  showWithoutErrors?: boolean;
};

const CUSTOM_KEY = "__custom__";

export function RadioGroupField<T extends FieldValues>({
  control,
  name,
  label,
  clearable,
  options,
  customOption,
  showWithoutErrors,
}: RadioGroupFieldProps<T>) {

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const matchedOption = options.find((o) => o.value === field.value);

        const [mode, setMode] = useState<"preset" | "custom" | undefined>(
          matchedOption ? "preset" : field.value !== undefined && field.value !== "" ? "custom" : undefined
        );
        const [customText, setCustomText] = useState(mode === "custom" ? String(field.value ?? "") : "");

        const selectedKey = mode === "preset" ? String(matchedOption?.value) : mode === "custom" ? CUSTOM_KEY : undefined;

        function handleRadioChange(key: string) {
          setCustomText("");
          if (key === CUSTOM_KEY) {
            setMode("custom");
            field.onChange(undefined);
            return;
          }
          const option = options.find((o) => String(o.value) === key);
          if (!option) {
            return;
          }
          setMode("preset");
          field.onChange(option.value);
        }

        function handleItemClick(e: React.MouseEvent, option: RadioGroupOption) {
          if (clearable && mode === "preset" && String(option.value) === selectedKey) {
            e.preventDefault();
            setMode(undefined);
            field.onChange(undefined);
          }
        }

        return (
          <FieldSet>
            {!!label && <FieldLegend>{label}</FieldLegend>}
            <RadioGroup className="mt-2" value={selectedKey ?? ""} onValueChange={handleRadioChange}>
              {options.map((option) => {
                const key = String(option.value);
                const id = `radio-${key}`;
                return (
                  <Field key={key} orientation="horizontal">
                    <RadioGroupItem id={id} value={key} onClick={(e) => handleItemClick(e, option)} />
                    <FieldContent className="ps-1">
                      <FieldLabel htmlFor={id}>{option.label}</FieldLabel>
                      {!!option.description && <FieldDescription>{option.description}</FieldDescription>}
                    </FieldContent>
                  </Field>
                );
              })}

              {!!customOption && (
                <>
                  <Field orientation="horizontal">
                    <RadioGroupItem id="radio-custom-field" value={CUSTOM_KEY} />
                    <FieldContent className="ps-1">
                      <FieldLabel htmlFor="radio-custom-field">{customOption.label}</FieldLabel>
                      {!!customOption.description && <FieldDescription>{customOption.description}</FieldDescription>}
                    </FieldContent>
                  </Field>
                  <Input
                    type={customOption.type}
                    inputMode={customOption.type === "number" ? "numeric" : undefined}
                    value={customText}
                    disabled={selectedKey !== CUSTOM_KEY}
                    onFocus={() => selectedKey !== CUSTOM_KEY && handleRadioChange(CUSTOM_KEY)}
                    onChange={(e) => {
                      setCustomText(e.target.value);
                      setMode("custom");
                      field.onChange(parseCustomValue(e.target.value, customOption.type));
                    }}
                  />
                </>
              )}
            </RadioGroup>
            <FieldError showWithoutErrors={showWithoutErrors} errors={[fieldState.error]} />
          </FieldSet>
        );
      }}
    />
  );
}

function parseCustomValue(raw: string, valueType: "number" | "text"): string | number | undefined {
  if (raw === "") return undefined;
  if (valueType === "text") return raw;

  const cleaned = raw.replace(/[^\d.-]/g, "");
  if (cleaned === "") return undefined;
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : undefined;
}