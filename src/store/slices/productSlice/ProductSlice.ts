
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { storeData } from "@/lib/data/dummyData";

import {
  FILTERED_DATA_KEY,
  SINGLE_PRODUCT_KEY,
  readSession,
  writeSession,
} from "@/lib/utils/sessionStorage/session-storage";

import {
  filterValueSchema,
  productIdSchema,
  productListSchema,
} from "@/lib/validations/product.schema";

import type {
  Product,
  ProductId,
} from "@/lib/validations/product.schema";

import type { ProductState } from "@/types/product";

/**
 * Static initial state.
 * Session storage is restored after client hydration.
 */
const initialState: ProductState = {
  filteredProducts: storeData,
  singleProduct: storeData,
  error: false,
};

function narrowFilteredProducts(
  state: ProductState,
  predicate: (product: Product) => boolean
): void {
  const result = state.filteredProducts.filter(predicate);

  if (result.length === 0) {
    state.error = true;
    state.filteredProducts = [];
    return;
  }

  state.error = false;
  state.filteredProducts = result;

  if (typeof window !== "undefined") {
    writeSession(FILTERED_DATA_KEY, result);
  }
}

export const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    /**
     * Restore products from sessionStorage after hydration.
     */
    restoreProducts(state) {
      if (typeof window === "undefined") return;

      state.filteredProducts =
        readSession(FILTERED_DATA_KEY, productListSchema) ?? storeData;

      state.singleProduct =
        readSession(SINGLE_PRODUCT_KEY, productListSchema) ?? storeData;

      state.error = false;
    },

    /**
     * Filters products by type.
     */
    filterProducts(state, action: PayloadAction<string>) {
      if (!filterValueSchema.safeParse(action.payload).success) return;

      const result = storeData.filter(
        (product) => product.type === action.payload
      );

      state.filteredProducts = result;
      state.error = false;

      if (typeof window !== "undefined") {
        writeSession(FILTERED_DATA_KEY, result);
      }
    },

    /**
     * Selects one product by ID.
     */
    singleProduct(state, action: PayloadAction<ProductId>) {
      if (!productIdSchema.safeParse(action.payload).success) return;

      const result = state.filteredProducts.filter(
        (product) => product.id === action.payload
      );

      state.singleProduct = result;

      if (typeof window !== "undefined") {
        writeSession(SINGLE_PRODUCT_KEY, result);
      }
    },

    /**
     * Filters products by gender.
     */
    filterGender(state, action: PayloadAction<string>) {
      if (!filterValueSchema.safeParse(action.payload).success) return;

      narrowFilteredProducts(
        state,
        (product) => product.gender === action.payload
      );
    },

    /**
     * Sorts products by price, highest first.
     */
    sortByPrice(state) {
      if (state.filteredProducts.length === 0) {
        state.error = true;
        return;
      }

      const sorted = [...state.filteredProducts].sort(
        (a, b) => b.price - a.price
      );

      state.error = false;
      state.filteredProducts = sorted;

      if (typeof window !== "undefined") {
        writeSession(FILTERED_DATA_KEY, sorted);
      }
    },

    /**
     * Filters products by color.
     */
    filterByColor(state, action: PayloadAction<string>) {
      if (!filterValueSchema.safeParse(action.payload).success) return;

      narrowFilteredProducts(
        state,
        (product) => product.color.includes(action.payload)
      );
    },

    /**
     * Filters products by size.
     */
    filterBySize(state, action: PayloadAction<string>) {
      if (!filterValueSchema.safeParse(action.payload).success) return;

      narrowFilteredProducts(
        state,
        (product) => product.size?.includes(action.payload) ?? false
      );
    },
  },
});

export const {
  restoreProducts,
  filterProducts,
  singleProduct,
  filterGender,
  sortByPrice,
  filterByColor,
  filterBySize,
} = productSlice.actions;

export default productSlice.reducer;
