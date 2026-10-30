// types/product.ts
import type { StaticImageData } from "next/image";
import type { Product } from "@/src/lib/validations/product.schema";

export interface ProductState {
  filteredProducts: Product[];
  singleProduct: Product[];
  error: boolean;
}

export interface SliderItem {
  id: string;
  img: StaticImageData;
  text: string;
}

/** The part of the root state that the product selectors need. */
export interface ProductRootState {
  products: ProductState;
}