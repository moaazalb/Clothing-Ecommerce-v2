// components/cart/Cart.tsx
"use client";

import type { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItemRow } from "@/components/cart/CartItemRow";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TooltipProvider } from "@/components/ui/tooltip";
import { removeFromCart } from "@/store/slices/cartSlice/CartSlice";
import { selectCartItems, selectCartTotalPrice } from "@/store/selectors/cartSelectors";
import { getCartItemKey } from "@/lib/utils/cart/cart";
import type { CartItemKey } from "@/lib/validations/cart.schema";

interface CartProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

/**
 * Shopping bag dialog. Lists the cart lines and the total, or an empty message.
 *
 * @param {CartProps} props - Component props.
 * @param {boolean} props.isOpen - Whether the dialog is open (was `openModal`).
 * @param {(isOpen: boolean) => void} props.onOpenChange - Called when the dialog asks to open or close (was `setOpen`).
 * @returns {JSX.Element} The cart dialog.
 */
export function Cart({ isOpen, onOpenChange }: CartProps): ReactElement {
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const dispatch = useDispatch();
  const isEmpty = items.length === 0;

  /**
   * Removes one unit of a cart line.
   *
   * @param {CartItemKey} key - The id, size and color of the line.
   * @returns {void}
   */
  const handleRemove = (key: CartItemKey): void => {
    dispatch(removeFromCart(key));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent className="max-h-[90dvh] w-[calc(100%-1.5rem)] max-w-lg overflow-y-auto rounded-2xl border border-[#E8D8C3] bg-[#FFFEFC] p-0 shadow-2xl sm:max-w-xl">
      {/* Header */}
      <DialogHeader className="border-b border-[#E8D8C3] bg-[#F8F4ED] px-5 py-5 sm:px-7">
        <div className="flex items-center justify-between">
          <div>
            <DialogTitle className="text-xl font-bold tracking-tight text-[#4B3621] sm:text-2xl">
              Shopping Bag
            </DialogTitle>

            <DialogDescription className="mt-1 text-sm text-[#806B56]">
              Review your items before checkout.
            </DialogDescription>
          </div>

          <div className="flex size-11 items-center justify-center rounded-full border border-[#D6B58A] bg-white text-[#A87945]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="size-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6"
              />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
          </div>
        </div>
      </DialogHeader>

      {isEmpty ? (
        /* Empty Cart */
        <div className="flex flex-col items-center justify-center px-5 py-12 text-center sm:py-16">
          <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-[#F8F4ED] text-[#A87945]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-9"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6"
              />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-[#4B3621]">
            Your bag is empty
          </h2>

          <p className="mt-2 max-w-xs text-sm leading-6 text-[#806B56]">
            Looks like you haven&apos;t added anything to your bag yet.
            Explore our collection and find something you love.
          </p>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="px-4 py-2 sm:px-6">
            <div className="mb-3 flex items-center justify-between py-2">
              <p className="text-sm font-semibold text-[#4B3621]">
                Your Items
              </p>

              <span className="rounded-full bg-[#F8F4ED] px-3 py-1 text-xs font-semibold text-[#A87945]">
                {items.length} {items.length === 1 ? "Item" : "Items"}
              </span>
            </div>

            <TooltipProvider>
              <ul className="flex flex-col divide-y divide-[#E8D8C3]">
                {items.map((item) => (
                  <CartItemRow
                    key={getCartItemKey(item)}
                    item={item}
                    onRemove={handleRemove}
                  />
                ))}
              </ul>
            </TooltipProvider>
          </div>

          {/* Order Summary */}
          <DialogFooter className="border-t border-[#E8D8C3] bg-[#F8F4ED] px-5 py-5 sm:px-7">
            <div className="w-full space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-[#806B56]">
                  Subtotal
                </span>

                <span className="text-sm font-semibold text-[#4B3621]">
                  {totalPrice}$
                </span>
              </div>

              <div className="h-px w-full bg-[#E8D8C3]" />

              <div className="flex items-center justify-between gap-3">
                <span className="text-base font-bold text-[#4B3621]">
                  Total Price
                </span>

                <span className="text-xl font-bold tracking-tight text-[#A87945]">
                  {totalPrice}$
                </span>
              </div>

              <p className="pt-1 text-xs leading-5 text-[#806B56]">
                Shipping and additional costs are calculated at checkout.
              </p>
            </div>
          </DialogFooter>
        </>
      )}
    </DialogContent>
  </Dialog>
  );
}