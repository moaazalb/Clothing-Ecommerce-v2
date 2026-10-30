// lib/store/productSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { storeData } from "@/lib/data/dummyData";
import {
  FILTERED_DATA_KEY,
  SINGLE_PRODUCT_KEY,
  readSession,
  writeSession,
} from "@/src/lib/utils/sessionStorage/session-storage";
import {
  filterValueSchema,
  productIdSchema,
  productListSchema,
} from "@/lib/validations/product.schema";
import type { Product, ProductId } from "@/lib/validations/product.schema";
import type { ProductState } from "@/types/product";

/**
 * Builds the initial state, restoring validated data from sessionStorage when available.
 *
 * @returns {ProductState} The initial products state.
 */
function getInitialState(): ProductState {
  return {
    filteredProducts: readSession(FILTERED_DATA_KEY, productListSchema) ?? storeData,
    singleProduct: readSession(SINGLE_PRODUCT_KEY, productListSchema) ?? storeData,
    error: false,
  };
}

/**
 * Narrows the current filtered list. An empty result sets the error flag.
 *
 * @param {ProductState} state - The (draft) products state.
 * @param {(product: Product) => boolean} predicate - Keeps matching products.
 * @returns {void}
 */
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
  writeSession(FILTERED_DATA_KEY, result);
}

export const productSlice = createSlice({
  name: "products",
  initialState: getInitialState(),
  reducers: {
    /**
     * Filters the full catalog by product type.
     *
     * @param {ProductState} state - Current state.
     * @param {PayloadAction<string>} action - The product type.
     * @returns {void}
     */
    filterProducts(state, action: PayloadAction<string>) {
      if (!filterValueSchema.safeParse(action.payload).success) return;

      const result = storeData.filter((product) => product.type === action.payload);
      state.filteredProducts = result;
      state.error = false;
      writeSession(FILTERED_DATA_KEY, result);
    },

    /**
     * Selects one product by id from the filtered list.
     *
     * @param {ProductState} state - Current state.
     * @param {PayloadAction<ProductId>} action - The product id.
     * @returns {void}
     */
    singleProduct(state, action: PayloadAction<ProductId>) {
      if (!productIdSchema.safeParse(action.payload).success) return;

      const result = state.filteredProducts.filter(
        (product) => product.id === action.payload
      );
      state.singleProduct = result;
      writeSession(SINGLE_PRODUCT_KEY, result);
    },

    /**
     * Narrows the filtered list by gender.
     *
     * @param {ProductState} state - Current state.
     * @param {PayloadAction<string>} action - The gender.
     * @returns {void}
     */
    filterGender(state, action: PayloadAction<string>) {
      if (!filterValueSchema.safeParse(action.payload).success) return;
      narrowFilteredProducts(state, (product) => product.gender === action.payload);
    },

    /**
     * Sorts the filtered list by price, highest first.
     *
     * @param {ProductState} state - Current state.
     * @returns {void}
     */
    sortByPrice(state) {
      if (state.filteredProducts.length === 0) {
        state.error = true;
        return;
      }

      const sorted = [...state.filteredProducts].sort((a, b) => b.price - a.price);
      state.error = false;
      state.filteredProducts = sorted;
      writeSession(FILTERED_DATA_KEY, sorted);
    },

    /**
     * Narrows the filtered list by color.
     *
     * @param {ProductState} state - Current state.
     * @param {PayloadAction<string>} action - The color.
     * @returns {void}
     */
    filterByColor(state, action: PayloadAction<string>) {
      if (!filterValueSchema.safeParse(action.payload).success) return;
      narrowFilteredProducts(state, (product) => product.color.includes(action.payload));
    },

    /**
     * Narrows the filtered list by size. Products without sizes (bags) never match.
     *
     * @param {ProductState} state - Current state.
     * @param {PayloadAction<string>} action - The size.
     * @returns {void}
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
  filterProducts,
  singleProduct,
  filterGender,
  sortByPrice,
  filterByColor,
  filterBySize,
} = productSlice.actions;

export default productSlice.reducer;