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
          className={FILTER_BUTTON_CLASS}
        >
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        {options.map((option) => (
          <DropdownMenuItem
         
            key={option}
            style={isColorMenu ? { color: option } : undefined}
            onSelect={() => onSelect(option)}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}