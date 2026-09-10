import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function FormInput<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  type = "text",
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field: { ...rest }, fieldState }) => (
          // <Field {...form}>
          <Field data-invalid={fieldState.invalid}>
            {/* <form action=""> */}
            {/* <FieldContent control={form.control} name="email"> */}
            <FieldLabel htmlFor="email">{label}</FieldLabel>
            {type === "textArea" ? (
              <Textarea
                {...rest}
                id="email"
                placeholder={placeholder}
                autoComplete="off"
                className="resize-none"
                aria-invalid={fieldState.invalid}
              />
            ) : (
              <Input
                {...rest}
                id="email"
                type={type}
                placeholder={placeholder}
                autoComplete="off"
                aria-invalid={fieldState.invalid}
              />
            )}
            <FieldError
              className="text-xs"
              errors={fieldState.error ? [fieldState.error] : undefined}
            />
            {/* </FieldContent> */}
            {/* </form> */}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
