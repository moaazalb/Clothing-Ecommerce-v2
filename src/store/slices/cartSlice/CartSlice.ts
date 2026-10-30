import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { isSameCartItem, roundPrice } from "@/lib/utils/cart/cart";
import {
  addToCartPayloadSchema,
  cartItemKeySchema,
  cartStateSchema,
} from "@/lib/validations/cart.schema";
import type {
  AddToCartPayload,
  CartItemKey,
} from "@/lib/validations/cart.schema";
import type { CartState } from "@/types/cart";

/**
 * Builds the initial (empty) cart state.
 *
 * @returns {CartState} An empty cart.
 */
function getInitialState(): CartState {
  return {
    cart: [],
    amount: 0,
    totalAmount: 0,
    totalPrice: 0,
  };
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialState(),
  reducers: {
    /**
     * Adds one unit of a product. The same id, size and color increases the amount of the existing line.
     *
     * @param {CartState} state - Current state.
     * @param {PayloadAction<AddToCartPayload>} action - The product with the chosen size and color.
     * @returns {void}
     */
    addToCart(state, action: PayloadAction<AddToCartPayload>) {
      const result = addToCartPayloadSchema.safeParse(action.payload);
      if (!result.success) return;

      const product = result.data;
      const existing = state.cart.find((item) => isSameCartItem(item, product));
      const price = existing?.price ?? product.price;

      if (existing) {
        existing.amount += 1;
        existing.totalPrice = roundPrice(existing.totalPrice + price);
      } else {
        state.cart.push({ ...product, amount: 1, totalPrice: product.price });
      }

      state.totalAmount += 1;
      state.totalPrice = roundPrice(state.totalPrice + price);
    },

    /**
     * Removes one unit of a product. The line is deleted when its last unit is removed.
     *
     * @param {CartState} state - Current state.
     * @param {PayloadAction<CartItemKey>} action - The id, size and color of the line.
     * @returns {void}
     */
    removeFromCart(state, action: PayloadAction<CartItemKey>) {
      const result = cartItemKeySchema.safeParse(action.payload);
      if (!result.success) return;

      const existing = state.cart.find((item) => isSameCartItem(item, result.data));
      if (!existing) return;

      if (existing.amount === 1) {
        state.cart = state.cart.filter((item) => !isSameCartItem(item, result.data));
      } else {
        existing.amount -= 1;
        existing.totalPrice = roundPrice(existing.totalPrice - existing.price);
      }

      state.totalAmount -= 1;
      state.totalPrice = roundPrice(state.totalPrice - existing.price);
    },

    /**
     * Restores the cart from validated session data.
     *
     * @param {CartState} state - Current state.
     * @param {PayloadAction<CartState>} action - The saved cart state.
     * @returns {CartState} The restored cart state.
     */
    restoreCart(_state, action: PayloadAction<CartState>) {
      const result = cartStateSchema.safeParse(action.payload);
      return result.success ? result.data : getInitialState();
    },

    /**
     * Clears all cart items and resets the cart totals.
     *
     * @param {CartState} state - Current state.
     * @returns {CartState} An empty cart state.
     */
    clearCart: () => getInitialState(),
  },
});

export const {
  addToCart,
  removeFromCart,
  restoreCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;