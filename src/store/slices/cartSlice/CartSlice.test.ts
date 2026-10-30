// lib/store/cartSlice.test.ts
import reducer, { addToCart, removeFromCart } from "./CartSlice";
import type { AddToCartPayload } from "@/lib/validations/cart.schema";
import type { CartState } from "@/types/cart";

const ITEM: AddToCartPayload = {
  id: "1",
  price: 45,
  size: "M",
  color: "black",
  img: { src: "/a.jpg", width: 10, height: 10 },
  name: "Casual T-Shirt 1",
  text: "Description",
};

const EMPTY: CartState = { cart: [], amount: 0, totalAmount: 0, totalPrice: 0 };
const initAction = { type: "@@INIT" };
const asPayload = (value: unknown): AddToCartPayload => value as AddToCartPayload;

describe("cartSlice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("initial state", () => {
    it("starts with an empty cart", () => {
      expect(reducer(undefined, initAction)).toEqual(EMPTY);
    });
  });

  describe("addToCart", () => {
    it("adds a new line with amount 1", () => {
      const state = reducer(EMPTY, addToCart(ITEM));
      expect(state.cart).toEqual([{ ...ITEM, amount: 1, totalPrice: 45 }]);
      expect(state.totalAmount).toBe(1);
      expect(state.totalPrice).toBe(45);
    });

    it("increases the amount for the same id, size and color", () => {
      const once = reducer(EMPTY, addToCart(ITEM));
      const state = reducer(once, addToCart(ITEM));
      expect(state.cart).toHaveLength(1);
      expect(state.cart[0]?.amount).toBe(2);
      expect(state.cart[0]?.totalPrice).toBe(90);
      expect(state.totalAmount).toBe(2);
      expect(state.totalPrice).toBe(90);
    });

    it("creates a separate line for another size", () => {
      const once = reducer(EMPTY, addToCart(ITEM));
      const state = reducer(once, addToCart({ ...ITEM, size: "L" }));
      expect(state.cart).toHaveLength(2);
    });

    it("creates a separate line for another color", () => {
      const once = reducer(EMPTY, addToCart(ITEM));
      const state = reducer(once, addToCart({ ...ITEM, color: "gray" }));
      expect(state.cart).toHaveLength(2);
    });

    it("creates a separate line for another product", () => {
      const once = reducer(EMPTY, addToCart(ITEM));
      const state = reducer(once, addToCart({ ...ITEM, id: "2" }));
      expect(state.cart).toHaveLength(2);
      expect(state.totalPrice).toBe(90);
    });

    it("supports products without a size (bags)", () => {
      const { size: _size, ...bag } = ITEM;
      const once = reducer(EMPTY, addToCart(bag));
      const state = reducer(once, addToCart(bag));
      expect(state.cart).toHaveLength(1);
      expect(state.cart[0]?.amount).toBe(2);
    });

    it("uses the stored price when the payload price differs", () => {
      const once = reducer(EMPTY, addToCart(ITEM));
      const state = reducer(once, addToCart({ ...ITEM, price: 1 }));
      expect(state.cart[0]?.totalPrice).toBe(90);
      expect(state.totalPrice).toBe(90);
    });

    it("keeps totals exact with decimal prices", () => {
      const first = reducer(EMPTY, addToCart({ ...ITEM, id: "a", price: 0.1 }));
      const state = reducer(first, addToCart({ ...ITEM, id: "b", price: 0.2 }));
      expect(state.totalPrice).toBe(0.3);
    });

    it("accepts a price of 0", () => {
      const state = reducer(EMPTY, addToCart({ ...ITEM, price: 0 }));
      expect(state.cart).toHaveLength(1);
      expect(state.totalPrice).toBe(0);
    });

    it.each([
      ["a missing id", { ...ITEM, id: "" }],
      ["a negative price", { ...ITEM, price: -5 }],
      ["a text price", { ...ITEM, price: "45" }],
      ["a NaN price", { ...ITEM, price: Number.NaN }],
      ["an Infinity price", { ...ITEM, price: Number.POSITIVE_INFINITY }],
      ["an empty color", { ...ITEM, color: "" }],
      ["an empty size", { ...ITEM, size: "" }],
      ["no image", { ...ITEM, img: undefined }],
      ["an empty name", { ...ITEM, name: "" }],
      ["a null payload", null],
    ])("ignores a payload with %s", (_label, payload) => {
      expect(reducer(EMPTY, addToCart(asPayload(payload)))).toEqual(EMPTY);
    });

    it("does not mutate the previous state", () => {
      const before = reducer(EMPTY, addToCart(ITEM));
      const snapshot = JSON.stringify(before);
      reducer(before, addToCart(ITEM));
      expect(JSON.stringify(before)).toBe(snapshot);
    });
  });

  describe("removeFromCart", () => {
    it("decreases the amount when there is more than one", () => {
      const twice = reducer(reducer(EMPTY, addToCart(ITEM)), addToCart(ITEM));
      const state = reducer(twice, removeFromCart(ITEM));
      expect(state.cart[0]?.amount).toBe(1);
      expect(state.cart[0]?.totalPrice).toBe(45);
      expect(state.totalAmount).toBe(1);
      expect(state.totalPrice).toBe(45);
    });

    it("removes the line when the last unit is removed", () => {
      const once = reducer(EMPTY, addToCart(ITEM));
      expect(reducer(once, removeFromCart(ITEM))).toEqual(EMPTY);
    });

    it("only affects the matching size and color", () => {
      const both = reducer(reducer(EMPTY, addToCart(ITEM)), addToCart({ ...ITEM, size: "L" }));
      const state = reducer(both, removeFromCart(ITEM));
      expect(state.cart).toHaveLength(1);
      expect(state.cart[0]?.size).toBe("L");
      expect(state.totalAmount).toBe(1);
    });

    it("uses the stored price, not the payload price", () => {
      const twice = reducer(reducer(EMPTY, addToCart(ITEM)), addToCart(ITEM));
      const state = reducer(twice, removeFromCart({ ...ITEM, price: 1 } as any));
      expect(state.totalPrice).toBe(45);
    });

    it("ignores a line that is not in the cart", () => {
      const once = reducer(EMPTY, addToCart(ITEM));
      const state = reducer(once, removeFromCart({ ...ITEM, id: "999" }));
      expect(state).toEqual(once);
    });

    it("ignores removing from an empty cart", () => {
      expect(reducer(EMPTY, removeFromCart(ITEM))).toEqual(EMPTY);
    });

    it("ignores an invalid payload", () => {
      const once = reducer(EMPTY, addToCart(ITEM));
      const state = reducer(once, removeFromCart({ id: "", color: "" }));
      expect(state).toEqual(once);
    });

    it("never lets totals go negative after many removes", () => {
      let state = reducer(EMPTY, addToCart(ITEM));
      for (let index = 0; index < 5; index += 1) {
        state = reducer(state, removeFromCart(ITEM));
      }
      expect(state.totalAmount).toBe(0);
      expect(state.totalPrice).toBe(0);
    });

    it("does not mutate the previous state", () => {
      const before = reducer(EMPTY, addToCart(ITEM));
      const snapshot = JSON.stringify(before);
      reducer(before, removeFromCart(ITEM));
      expect(JSON.stringify(before)).toBe(snapshot);
    });
  });
});