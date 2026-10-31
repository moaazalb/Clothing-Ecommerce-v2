// components/layout/CartButton.tsx
"use client";

import { useState } from "react";
import type { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Cart } from "@/components/cart/Cart";
import { selectCartTotalAmount } from "@/store/selectors/cartSelectors";

const TEXT_CLASS = "font-inter text-base font-medium leading-none tracking-normal text-center";

/**
 * "Shopping bag" button. It shows the number of units in the cart (or a bag icon
 * when the cart is empty) and opens the cart dialog.
 *
 * @returns {JSX.Element} The button and its dialog.
 */
export function CartButton(): ReactElement {
  const totalAmount = useSelector(selectCartTotalAmount);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const unitLabel = totalAmount === 1 ? "item" : "items";
  const label = totalAmount > 0 ? `Shopping bag, ${totalAmount} ${unitLabel}` : undefined;

  /**
   * Opens the cart dialog.
   *
   * @returns {void}
   */
  const handleOpen = (): void => {
    setIsCartOpen(true);
  };

  return (

  <>
  <button
    type="button"
    aria-haspopup="dialog"
    aria-label={label}
    onClick={handleOpen}
    className="group flex cursor-pointer items-center gap-2 rounded-full px-2.5 py-2 text-[#4B3621] transition-all duration-200 hover:bg-[#F8F4ED] hover:text-[#A87945] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A87945] focus-visible:ring-offset-2"
  >
    <span className="relative flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.6"
        className="size-6 transition-transform duration-200 group-hover:scale-110"
        aria-hidden="true"
        focusable="false"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
        />
      </svg>

      {totalAmount > 0 && (
        <span className="absolute -right-2 -top-2 flex min-h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-[#A87945] px-1 text-[10px] font-bold leading-none text-white shadow-sm">
          {totalAmount}
        </span>
      )}
    </span>

    <span className={`${TEXT_CLASS} text-sm font-medium transition-colors duration-200 group-hover:text-[#A87945]`}>
      Shopping bag
    </span>
  </button>

  <Cart isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
</>
  );
}