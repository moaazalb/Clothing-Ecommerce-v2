import { ProductType } from "../validations/product.schema";

// lib/constants/productFilters.ts
export const GENDER_OPTIONS = ["male", "female"] as const;

export const COLOR_OPTIONS = [
  "red",
  "green",
  "purple",
  "yellow",
  "orange",
  "blue",
  "black",
  "brown",
] as const;

export const SIZE_OPTIONS = ["S", "M", "L", "XL"] as const;

/** These types have no S/M/L/XL sizes (bags have none, shoes use numbers). */
export const TYPES_WITHOUT_SIZE_FILTER: readonly string[] = ["Bags", "Shoes"];

/** The category links on the home page, in the order they are shown. */
export const NAVIGATION_PRODUCT_TYPES: readonly ProductType[] = [
  "Hoodies",
  "Dresses",
  "Suits",
  "Shoes",
  "T-Shirts",
  "Jeans",
  "Jackets",
  "Bags",
];