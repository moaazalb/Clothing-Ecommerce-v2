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
  <Label
    htmlFor={id}
    className="text-sm font-semibold text-[#4B3621]"
  >
    {label}
  </Label>

  <Input
    id={id}
    type={type}
    autoComplete={autoComplete}
    className={`h-11 rounded-lg border bg-white px-3 text-sm text-[#4B3621] shadow-sm transition-all duration-200 placeholder:text-[#B5A18B] focus-visible:ring-2 focus-visible:ring-offset-1 ${
      error
        ? "border-red-400 focus-visible:border-red-500 focus-visible:ring-red-200"
        : "border-[#E8D8C3] hover:border-[#D6B58A] focus-visible:border-[#A87945] focus-visible:ring-[#D6B58A]/40"
    }`}
    aria-invalid={Boolean(error)}
    aria-describedby={error ? errorId : undefined}
    {...registration}
  />

  {error ? (
    <p
      id={errorId}
      role="alert"
      className="flex items-center gap-1.5 text-xs font-medium text-red-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="size-4 shrink-0"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 8a.875.875 0 100-1.75A.875.875 0 0010 14z"
          clipRule="evenodd"
        />
      </svg>

      {error}
    </p>
  ) : null}
</div>
  );
}