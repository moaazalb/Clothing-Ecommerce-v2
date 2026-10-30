// lib/utils/cart.test.ts
import { getCartItemKey, isSameCartItem, roundPrice } from "./cart";

describe("cart helpers", () => {
  
    describe("getCartItemKey", () => {
    it("builds the key from id, size and color", () => {
      expect(getCartItemKey({ id: "1", size: "M", color: "red" })).toBe("1-M-red");
    });

    it("uses a placeholder when there is no size", () => {
      expect(getCartItemKey({ id: "48", color: "blue" })).toBe("48-no-size-blue");
    });

    it("gives different keys for different sizes and colors", () => {
      const keys = [
        getCartItemKey({ id: "1", size: "M", color: "red" }),
        getCartItemKey({ id: "1", size: "L", color: "red" }),
        getCartItemKey({ id: "1", size: "M", color: "blue" }),
      ];
      expect(new Set(keys).size).toBe(3);
    });
  });

  describe("roundPrice", () => {
    it("fixes floating point drift", () => {
      expect(roundPrice(0.1 + 0.2)).toBe(0.3);
    });

    it("keeps whole numbers and zero", () => {
      expect(roundPrice(45)).toBe(45);
      expect(roundPrice(0)).toBe(0);
    });

    it("rounds to 2 decimals", () => {
      expect(roundPrice(1.006)).toBe(1.01);
    });
  });

  describe("isSameCartItem", () => {
    const base = { id: "1", size: "M", color: "black" };

    it("is true for the same id, size and color", () => {
      expect(isSameCartItem(base, { ...base })).toBe(true);
    });

    it("is false when id, size or color differ", () => {
      expect(isSameCartItem(base, { ...base, id: "2" })).toBe(false);
      expect(isSameCartItem(base, { ...base, size: "L" })).toBe(false);
      expect(isSameCartItem(base, { ...base, color: "red" })).toBe(false);
    });

    it("treats two missing sizes as equal but not a size and a missing size", () => {
      expect(isSameCartItem({ id: "1", color: "red" }, { id: "1", color: "red" })).toBe(true);
      expect(isSameCartItem({ id: "1", color: "red" }, { ...base, color: "red" })).toBe(false);
    });
  });
});