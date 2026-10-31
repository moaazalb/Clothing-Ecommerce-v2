// components/products/ProductOptionSelect.tsx
import type { ReactElement } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

const SELECT_CLASS =
  "block w-full rounded-lg border border-[#E8D8C3] bg-[#F8F4ED] px-3 py-2.5 text-sm text-[#4B3621] shadow-sm outline-none transition-all duration-200 hover:border-[#D6B58A] focus:border-[#A87945] focus:ring-2 focus:ring-[#A87945]/20 disabled:cursor-not-allowed disabled:border-[#E8D8C3] disabled:bg-[#F1EAE0] disabled:text-[#806B56]";

interface ProductOptionSelectProps {
  id: string;
  label: string;
  options: readonly string[];
  registration?: UseFormRegisterReturn;
  isDisabled?: boolean;
  error?: string;
}

/**
 * A labelled native select with an accessible error message.
 *
 * @param {ProductOptionSelectProps} props - Component props.
 * @param {string} props.id - Select id, also used for the label and the error id (`<id>-error`).
 * @param {string} props.label - Visible label text.
 * @param {readonly string[]} props.options - The choices to list.
 * @param {UseFormRegisterReturn} [props.registration] - The result of `register("field")`.
 * @param {boolean} [props.isDisabled=false] - Disables the select.
 * @param {string} [props.error] - Validation message; the select is marked invalid when set.
 * @returns {JSX.Element} The select field.
 */
export function ProductOptionSelect({
  id,
  label,
  options,
  registration,
  isDisabled = false,
  error,
}: ProductOptionSelectProps): ReactElement {
  const errorId = `${id}-error`;

  return (
    <div className="w-full pb-4">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-[#4B3621]"
      >
        {label}
      </label>

      <select
        id={id}
        disabled={isDisabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`${SELECT_CLASS} ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
            : ""
        }`}
        {...registration}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 text-sm font-medium text-red-600"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}