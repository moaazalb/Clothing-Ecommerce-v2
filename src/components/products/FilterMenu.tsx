// components/products/FilterMenu.tsx
"use client";

import type { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FILTER_BUTTON_CLASS } from "@/components/products/FilterButton";

interface FilterMenuProps {
  label: string;
  options: readonly string[];
  onSelect: (option: string) => void;
  isDisabled?: boolean;
  isColorMenu?: boolean;
}

/**
 * Button that opens a dropdown of options (used for color and size).
 *
 * @param {FilterMenuProps} props - Component props.
 * @param {string} props.label - Text of the button that opens the menu.
 * @param {readonly string[]} props.options - The choices to list.
 * @param {(option: string) => void} props.onSelect - Called with the chosen option.
 * @param {boolean} [props.isDisabled=false] - Disables the button.
 * @param {boolean} [props.isColorMenu=false] - Paints each option in its own color.
 * @returns {JSX.Element} The menu.
 */
export function FilterMenu({
  label,
  options,
  onSelect,
  isDisabled = false,
  isColorMenu = false,
}: FilterMenuProps): ReactElement {
  return (
    <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      type="button"
      variant="outline"
      size="lg"
      disabled={isDisabled}
      className={`
        ${FILTER_BUTTON_CLASS}
        gap-2
        disabled:cursor-not-allowed
        disabled:opacity-50
      `}
    >
      {label}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent
    align="start"
    className="
      z-50
      max-h-60
      w-[var(--radix-dropdown-menu-trigger-width)]
      overflow-y-auto
      rounded-lg
      border border-[#E8D8C3]
      bg-[#F8F4ED]
      p-1.5
      shadow-lg
      shadow-[#4B3621]/10
    "
  >
    {options.map((option) => (
      <DropdownMenuItem
        key={option}
        style={isColorMenu ? { color: option } : undefined}
        onSelect={() => onSelect(option)}
        className="
          cursor-pointer
          rounded-md
          px-3
          py-2.5
          text-sm
          font-medium
          text-[#4B3621]
          transition-colors
          duration-200
          focus:bg-[#E8D8C3]
          focus:text-[#4B3621]
          data-[disabled]:pointer-events-none
          data-[disabled]:opacity-50
        "
      >
        {isColorMenu && (
          <span
            aria-hidden="true"
            className="mr-2 inline-block size-3 rounded-full border border-[#D6B58A]"
            style={{ backgroundColor: option }}
          />
        )}

        {option}
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>
  );
}