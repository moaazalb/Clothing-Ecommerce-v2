// components/cart/CartItemRow.tsx
"use client";

import Image from "next/image";
import type { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { CartItem, CartItemKey } from "@/lib/validations/cart.schema";

const DETAIL_CLASS = "pt-2 font-inter text-sm leading-none tracking-normal text-black";

interface CartItemRowProps {
  item: CartItem;
  onRemove: (key: CartItemKey) => void;
}

/**
 * One line of the shopping bag: image, details and a remove button.
 *
 * @param {CartItemRowProps} props - Component props.
 * @param {CartItem} props.item - The cart line to show.
 * @param {(key: CartItemKey) => void} props.onRemove - Called with the line's id, size and color to remove one unit.
 * @returns {JSX.Element} The cart line.
 */
export function CartItemRow({ item, onRemove }: CartItemRowProps): ReactElement {
  const itemLabel = `${item.name}, ${item.color}${item.size ? `, size ${item.size}` : ""}`;

  /**
   * Asks the parent to remove one unit of this line.
   *
   * @returns {void}
   */
  const handleRemove = (): void => {
    onRemove({ id: item.id, size: item.size, color: item.color });
  };

  return (
    <li className="grid grid-cols-2 py-4">
      <div>
        <Image
          className="h-[125px] w-auto rounded-md"
          src={item.img}
          alt={item.name}
        />
        <h3 className="pt-2 font-inter text-base font-bold leading-none tracking-normal text-black">
          {item.name}
        </h3>
        
      </div>
      <div>
        {item.size ? (
          <p className={DETAIL_CLASS}>
            Selected size: <span className="ml-2">{item.size}</span>
          </p>
        ) : null}
        <p className={DETAIL_CLASS}>
          Selected color:{" "}
          <span
            role="img"
            aria-label={`Color ${item.color}`}
            className="ml-2 rounded-full px-2"
            style={{ backgroundColor: item.color }}
          />
        </p>
        <p className={DETAIL_CLASS}>
          Amount: <span className="ml-2">{item.amount}</span>
        </p>
        <p className={DETAIL_CLASS}>
          Single Item Price: <span className="ml-2">{item.price}$</span>
        </p>
        <p className={DETAIL_CLASS}>
          Total Item Prices: <span className="ml-2">{item.totalPrice}$</span>
        </p>
        <div className="pt-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                aria-label={`Remove ${itemLabel} from the cart`}
                onClick={handleRemove}
              >
                Remove
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Remove from the Cart</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </li>
  );
}