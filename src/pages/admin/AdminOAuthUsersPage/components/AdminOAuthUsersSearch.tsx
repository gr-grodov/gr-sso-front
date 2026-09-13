import { Card, CardContent } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface AdminOAuthUsersSearchProps {
  onChangeSearch: (search: string) => void;
  onChangeSize: (size: number) => void;
}

export function AdminOAuthUsersSearch({
  onChangeSearch,
  onChangeSize
}: AdminOAuthUsersSearchProps) {
  const {t} = useTranslation("admin", {keyPrefix: "oauth_users.search"});
  
  return (
    <Card className="mb-4">
      <CardContent className="flex flex-col w-full gap-2 lg:flex-row lg:justify-between">
        <Field className="w-full">
          <InputGroup>
            <InputGroupInput 
              placeholder={t("input_hint")}
              onChange={(e) => {
                onChangeSearch(e.target.value);
              }}
            />
            <InputGroupAddon>
              <Search/>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field orientation="horizontal" className="flex flex-row self-center gap-2 lg:justify-end">
          <span className="text-muted-foreground">{t("size_hint")}</span>
          <ToggleGroup 
            defaultValue={["10"]} 
            className="bg-muted rounded-lg p-0.5"
            onValueChange={(value) => {
              onChangeSize(Number(value.at(0)));
            }}
          >
            <ToggleGroupItem value="10">10</ToggleGroupItem>
            <ToggleGroupItem value="25">25</ToggleGroupItem>
            <ToggleGroupItem value="50">50</ToggleGroupItem>
            <ToggleGroupItem value="100">100</ToggleGroupItem>
          </ToggleGroup>
        </Field>
      </CardContent>
    </Card>
  )
}
