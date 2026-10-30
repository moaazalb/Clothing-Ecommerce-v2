// components/products/ProductOptionSelect.tsx
import type { ReactElement } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

const SELECT_CLASS =
  "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500";

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
    <div className="pb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <select
        id={id}
        disabled={isDisabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={SELECT_CLASS}
        {...registration}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? (
        <p id={errorId} role="alert" className="mt-1 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}