import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useFieldArray, type Control, type FieldArrayPath, type FieldPath, type FieldValues } from "react-hook-form";

type ListFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldArrayPath<T>;
};

export function ListField<T extends FieldValues>({
  control,
  name
}: ListFieldProps<String> ) {
  const [uri, setUri] = useState("")
  const {fields, append, remove} = useFieldArray({
    control: control,
    name: name
  });

  function addUri() {
    if (!uri.trim()){
      return;
    }

    append(uri);
    setUri("");
}

  return (
    <div className="space-y-3">

    <div className="flex gap-2">

        <Input
            value={uri}
            onChange={(e) => setUri(e.target.value)}
            placeholder="https://example.com/login/oauth2/code"
        />

        <Button
            type="button"
            onClick={addUri}
        >
            Добавить
        </Button>

    </div>

    {fields.map((field, index) => (

        <div
            key={field.id}
            className="flex items-center justify-between rounded-md border p-2"
        >
            <span>{field as unknown as string}</span>

            <Button
                size="icon"
                variant="ghost"
                type="button"
                onClick={() => remove(index)}
            >
                ✕
            </Button>

        </div>

    ))}

  </div>
  )
}
