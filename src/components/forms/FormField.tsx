// components/forms/FormField.tsx
import type { HTMLInputTypeAttribute, ReactElement } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  error?: string;
}

/**
 * A labelled input with an accessible error message, for use with react-hook-form.
 *
 * @param {FormFieldProps} props - Component props.
 * @param {string} props.id - Input id, also used for the label and the error id (`<id>-error`).
 * @param {string} props.label - Visible label text.
 * @param {UseFormRegisterReturn} props.registration - The result of `register("field")`.
 * @param {HTMLInputTypeAttribute} [props.type="text"] - The input type.
 * @param {string} [props.autoComplete] - The autocomplete hint for the browser.
 * @param {string} [props.error] - Validation message; the field is marked invalid when set.
 * @returns {JSX.Element} The field.
 */
export function FormField({
  id,
  label,
  registration,
  type = "text",
  autoComplete,
  error,
}: FormFieldProps): ReactElement {
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        autoComplete={autoComplete}
        className="h-11"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...registration}
      />
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}