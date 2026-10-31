// components/products/FilterButton.tsx
import type { ReactElement, ReactNode } from "react";
import { Button } from "@/components/ui/button";

export const FILTER_BUTTON_CLASS =
  "h-10 border-[#D6B58A] bg-[#F8F4ED] px-3 text-sm font-medium text-[#4B3621] shadow-sm transition-all duration-300 ease-in-out hover:border-[#A87945] hover:bg-[#A87945] hover:text-white focus-visible:ring-2 focus-visible:ring-[#A87945] focus-visible:ring-offset-2 sm:h-11 sm:px-4 sm:text-base";

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