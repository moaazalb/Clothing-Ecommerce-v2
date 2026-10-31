// components/products/FilterBar.tsx
"use client";

import type { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { FilterButton } from "@/components/products/FilterButton";
import { FilterMenu } from "@/components/products/FilterMenu";
import {
  COLOR_OPTIONS,
  GENDER_OPTIONS,
  SIZE_OPTIONS,
  TYPES_WITHOUT_SIZE_FILTER,
} from "@/lib/constants/productFilters";
import {
  filterByColor,
  filterBySize,
  filterGender,
  filterProducts,
  sortByPrice,
} from "@/store/slices/productSlice/ProductSlice";
import type { ProductType } from "@/lib/validations/product.schema";

interface FilterBarProps {
  type: ProductType;
}

/**
 * The filter controls: gender, price sort, color, size and "Clear Filter".
 * The size menu is disabled for types that have no S/M/L/XL sizes.
 *
 * @param {FilterBarProps} props - Component props.
 * @param {ProductType} props.type - The product type shown on the page.
 * @returns {JSX.Element} The filter bar.
 */
export function FilterBar({ type }: FilterBarProps): ReactElement {
  const dispatch = useDispatch();
  const isSizeDisabled = TYPES_WITHOUT_SIZE_FILTER.includes(type);

  /**
   * Narrows the list by gender.
   *
   * @param {string} gender - The chosen gender.
   * @returns {void}
   */
  const handleGender = (gender: string): void => {
    dispatch(filterGender(gender));
  };

  /**
   * Sorts the list by price, highest first.
   *
   * @returns {void}
   */
  const handleSortByPrice = (): void => {
    dispatch(sortByPrice());
  };

  /**
   * Narrows the list by color.
   *
   * @param {string} color - The chosen color.
   * @returns {void}
   */
  const handleColor = (color: string): void => {
    dispatch(filterByColor(color));
  };

  /**
   * Narrows the list by size.
   *
   * @param {string} size - The chosen size.
   * @returns {void}
   */
  const handleSize = (size: string): void => {
    dispatch(filterBySize(size));
  };

  /**
   * Resets the list to every product of this type.
   *
   * @returns {void}
   */
  const handleClear = (): void => {
    dispatch(filterProducts(type));
  };

  return (
    <div
  role="group"
  aria-label="Product filters"
  className="
    flex w-full flex-col gap-5
    py-6
    sm:py-8
    lg:flex-row lg:items-center lg:justify-between
  "
>
  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
    {GENDER_OPTIONS.map((gender) => (
      <FilterButton
        key={gender}
        onClick={() => handleGender(gender)}
      >
        {gender}
      </FilterButton>
    ))}

    <FilterButton onClick={handleSortByPrice}>
      High Price
    </FilterButton>

    <FilterMenu
      label="Select a color"
      options={COLOR_OPTIONS}
      onSelect={handleColor}
      isColorMenu
    />

    <FilterMenu
      label="Select a size"
      options={SIZE_OPTIONS}
      onSelect={handleSize}
      isDisabled={isSizeDisabled}
    />
  </div>

  <div className="flex justify-end lg:shrink-0">
    <FilterButton onClick={handleClear}>
      Clear Filter
    </FilterButton>
  </div>
</div>
  );
}