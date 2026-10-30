// components/products/FilterButton.tsx
import type { ReactElement, ReactNode } from "react";
import { Button } from "@/components/ui/button";

export const FILTER_BUTTON_CLASS =
  "mr-4 text-black duration-300 ease-in-out hover:bg-gray-300";

interface FilterButtonProps {
  children: ReactNode;
  onClick: () => void;
}

/**
 * Large outlined button used for the product filters.
 *
 * @param {FilterButtonProps} props - Component props.
 * @param {ReactNode} props.children - The button text.
 * @param {() => void} props.onClick - Called when the button is clicked.
 * @returns {JSX.Element} The button.
 */
export function FilterButton({ children, onClick }: FilterButtonProps): ReactElement {
  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className={FILTER_BUTTON_CLASS}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}