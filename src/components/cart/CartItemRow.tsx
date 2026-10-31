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
  <li className="grid grid-cols-[104px_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[130px_minmax(0,1fr)] sm:gap-5">
  {/* Product Image and Name */}
  <div className="flex flex-col gap-2">
    <div className="overflow-hidden rounded-xl border border-[#E8D8C3] bg-[#F8F4ED]">
      <Image
        className="h-[125px] w-full object-cover transition-transform duration-300 hover:scale-105 sm:h-[145px]"
        src={item.img}
        alt={item.name}
      />
    </div>

    <h3 className="line-clamp-2 text-sm font-bold leading-5 text-[#4B3621] sm:text-base">
      {item.name}
    </h3>
  </div>

  {/* Product Details */}
  <div className="flex min-w-0 flex-col justify-between gap-3">
    <div className="space-y-2.5">
      {item.size && (
        <p className="text-xs leading-5 text-[#806B56] sm:text-sm">
          Selected size:
          <span className="ml-2 font-semibold text-[#4B3621]">
            {item.size}
          </span>
        </p>
      )}

      <div className="flex items-center gap-2 text-xs text-[#806B56] sm:text-sm">
        <span>Selected color:</span>

        <span
          role="img"
          aria-label={`Color ${item.color}`}
          className="size-5 shrink-0 rounded-full border border-[#D6B58A] shadow-sm"
          style={{ backgroundColor: item.color }}
        />
      </div>

      <p className="text-xs leading-5 text-[#806B56] sm:text-sm">
        Quantity:
        <span className="ml-2 font-semibold text-[#4B3621]">
          {item.amount}
        </span>
      </p>

      <p className="text-xs leading-5 text-[#806B56] sm:text-sm">
        Unit price:
        <span className="ml-2 font-semibold text-[#4B3621]">
          {item.price}$
        </span>
      </p>
    </div>

    {/* Price and Remove Button */}
    <div className="flex flex-wrap items-end justify-between gap-2 border-t border-[#E8D8C3] pt-3">
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-[#806B56] sm:text-xs">
          Total price
        </p>

        <p className="mt-1 text-lg font-bold tracking-tight text-[#A87945] sm:text-xl">
          {item.totalPrice}$
        </p>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="sm"
            variant="outline"
            aria-label={`Remove ${itemLabel} from the cart`}
            onClick={handleRemove}
            className="h-8 rounded-lg border-[#D6B58A] bg-white px-3 text-xs font-semibold text-[#A87945] transition-all hover:border-[#A87945] hover:bg-[#A87945] hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="mr-1.5 size-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 7h12m-10 0V5a1 1 0 011-1h6a1 1 0 011 1v2m2 0l-.8 13H6.8L6 7m4 4v5m4-5v5"
              />
            </svg>

            Remove
          </Button>
        </TooltipTrigger>

        <TooltipContent
          side="bottom"
          className="border border-[#E8D8C3] bg-[#4B3621] text-[#F8F4ED]"
        >
          Remove from the Cart
        </TooltipContent>
      </Tooltip>
    </div>
  </div>
  </li>
  );
}