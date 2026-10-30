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
        className="flex cursor-pointer flex-row items-center"
        onClick={handleOpen}
      >
        {totalAmount > 0 ? (
          <span className="mr-1 rounded-full bg-gray-300 px-2 font-inter text-sm">
            {totalAmount}
          </span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#000"
            className="h-6 w-6"
            aria-hidden="true"
            focusable="false"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        )}
        <span className={TEXT_CLASS}>Shopping bag</span>
      </button>
      <Cart isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}