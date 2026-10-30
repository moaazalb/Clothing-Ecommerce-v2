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
      <DialogContent className="max-h-[90vh] overflow-y-auto border-0 outline-0 bg-white">
        <DialogHeader>
          <DialogTitle>Shopping Bag</DialogTitle>
          <DialogDescription className="sr-only">
            The products in your shopping bag and their total price.
          </DialogDescription>
        </DialogHeader>

        {isEmpty ? (
          <div>
            <h2 className="py-4 font-inter text-3xl font-bold leading-none tracking-normal text-black">
              Your bag is empty
            </h2>
            <p className="font-inter text-base leading-none tracking-normal text-black">
              Add some products
            </p>
          </div>
        ) : (
          <>
            <TooltipProvider>
              <ul className="flex flex-col items-start justify-center divide-y">
                {items.map((item) => (
                  <CartItemRow key={getCartItemKey(item)} item={item} onRemove={handleRemove} />
                ))}
              </ul>
            </TooltipProvider>
            <DialogFooter className="sm:justify-start">
              <p className="pt-2 font-inter text-base leading-none tracking-normal text-black">
                Total Price of All Products: <span className="ml-2">{totalPrice}$</span>
              </p>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}