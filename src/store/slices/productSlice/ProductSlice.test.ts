// lib/store/productSlice.test.ts
/** @jest-environment jsdom */
import reducer, {
  filterBySize,
  filterByColor,
  filterGender,
  filterProducts,
  singleProduct,
  sortByPrice,
} from "./ProductSlice";

jest.mock("@/lib/data/dummyData", () => {
  const base = { img: { src: "/a.jpg", width: 10, height: 10 }, name: "Item", text: "Text" };
  return {
    storeData: [
      { ...base, id: "1", type: "Shoes", gender: "male", price: 50, color: ["red", "blue"], size: ["M", "L"] },
      { ...base, id: "2", type: "Shoes", gender: "female", price: 80, color: ["red"], size: ["S"] },
      { ...base, id: "3", type: "T-Shirts", gender: "male", price: 20, color: ["green"], size: ["M"] },
      { ...base, id: "4", type: "Bags", gender: "female", price: 60, color: ["red"] },
    ],
  };
});

const STORED_PRODUCT = {
  id: "9",
  img: { src: "/s.jpg", width: 1, height: 1 },
  name: "Stored",
  text: "Stored text",
  type: "Shoes",
  gender: "male",
  price: 1,
  color: ["red"],
  size: ["M"],
};

const initAction = { type: "@@INIT" };
const readStored = (key: string): unknown =>
  JSON.parse(window.sessionStorage.getItem(key) ?? "null");

describe("productSlice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.sessionStorage.clear();
  });

  describe("initial state", () => {
    it("starts with the full catalog and no error", () => {
      const state = reducer(undefined, initAction);
      expect(state.filteredProducts).toHaveLength(4);
      expect(state.singleProduct).toHaveLength(4);
      expect(state.error).toBe(false);
    });

    it("restores valid data from sessionStorage", async () => {
      window.sessionStorage.setItem("filteredData", JSON.stringify([STORED_PRODUCT]));
      jest.resetModules();
      const { default: freshReducer } = await import("./ProductSlice");
      expect(freshReducer(undefined, initAction).filteredProducts).toEqual([STORED_PRODUCT]);
    });

    it("falls back to the catalog when stored JSON is corrupt", async () => {
      window.sessionStorage.setItem("filteredData", "{not json");
      jest.resetModules();
      const { default: freshReducer } = await import("./ProductSlice");
      expect(freshReducer(undefined, initAction).filteredProducts).toHaveLength(4);
    });

    it("falls back to the catalog when stored data fails validation", async () => {
      window.sessionStorage.setItem("filteredData", JSON.stringify([{ id: "1" }]));
      jest.resetModules();
      const { default: freshReducer } = await import("./ProductSlice");
      expect(freshReducer(undefined, initAction).filteredProducts).toHaveLength(4);
    });
  });

  describe("filterProducts", () => {
    it("filters by type and persists the result", () => {
      const state = reducer(undefined, filterProducts("Shoes"));
      expect(state.filteredProducts.map((p) => p.id)).toEqual(["1", "2"]);
      expect(state.error).toBe(false);
      expect(readStored("filteredData")).toHaveLength(2);
    });

    it("returns an empty list without error for an unknown type", () => {
      const state = reducer(undefined, filterProducts("Hats"));
      expect(state.filteredProducts).toEqual([]);
      expect(state.error).toBe(false);
    });

    it("ignores an empty payload", () => {
      const state = reducer(undefined, filterProducts(""));
      expect(state.filteredProducts).toHaveLength(4);
      expect(window.sessionStorage.getItem("filteredData")).toBeNull();
    });

    it("ignores a very long payload", () => {
      const state = reducer(undefined, filterProducts("a".repeat(101)));
      expect(state.filteredProducts).toHaveLength(4);
    });
  });

  describe("singleProduct", () => {
    it("selects one product by id and persists it", () => {
      const state = reducer(undefined, singleProduct("2"));
      expect(state.singleProduct.map((p) => p.id)).toEqual(["2"]);
      expect(readStored("singleProduct")).toHaveLength(1);
    });

    it("returns an empty list for an unknown id", () => {
      expect(reducer(undefined, singleProduct("999")).singleProduct).toEqual([]);
    });

    it("ignores an empty id", () => {
      expect(reducer(undefined, singleProduct("")).singleProduct).toHaveLength(4);
    });
  });

  describe("filterGender", () => {
    it("narrows the current list and persists it", () => {
      const state = reducer(undefined, filterGender("male"));
      expect(state.filteredProducts.map((p) => p.id)).toEqual(["1", "3"]);
      expect(state.error).toBe(false);
      expect(readStored("filteredData")).toHaveLength(2);
    });

    it("sets the error flag and empties the list when nothing matches", () => {
      const shoes = reducer(undefined, filterProducts("Shoes"));
      const state = reducer(shoes, filterGender("kids"));
      expect(state.error).toBe(true);
      expect(state.filteredProducts).toEqual([]);
    });

    it("does not overwrite sessionStorage when nothing matches", () => {
      const shoes = reducer(undefined, filterProducts("Shoes"));
      reducer(shoes, filterGender("kids"));
      expect(readStored("filteredData")).toHaveLength(2);
    });

    it("ignores an invalid payload", () => {
      expect(reducer(undefined, filterGender("")).filteredProducts).toHaveLength(4);
    });
  });

  describe("sortByPrice", () => {
    it("sorts from highest to lowest price", () => {
      const state = reducer(undefined, sortByPrice());
      expect(state.filteredProducts.map((p) => p.price)).toEqual([80, 60, 50, 20]);
      expect(state.error).toBe(false);
      expect(readStored("filteredData")).toHaveLength(4);
    });

    it("keeps a single product instead of clearing the list", () => {
      const single = reducer(undefined, filterProducts("T-Shirts"));
      const state = reducer(single, sortByPrice());
      expect(state.filteredProducts).toHaveLength(1);
      expect(state.error).toBe(false);
    });

    it("sets the error flag when the list is empty", () => {
      const empty = reducer(undefined, filterProducts("Hats"));
      expect(reducer(empty, sortByPrice()).error).toBe(true);
    });

    it("does not mutate the previous state", () => {
      const before = reducer(undefined, initAction);
      const snapshot = JSON.stringify(before);
      reducer(before, sortByPrice());
      expect(JSON.stringify(before)).toBe(snapshot);
    });
  });

  describe("filterByColor", () => {
    it("keeps products that include the color", () => {
      const state = reducer(undefined, filterByColor("red"));
      expect(state.filteredProducts.map((p) => p.id)).toEqual(["1", "2", "4"]);
    });

    it("sets the error flag when no product has the color", () => {
      const state = reducer(undefined, filterByColor("pink"));
      expect(state.error).toBe(true);
      expect(state.filteredProducts).toEqual([]);
    });

    it("recovers from an error when a new type filter is applied", () => {
      const failed = reducer(undefined, filterByColor("pink"));
      const state = reducer(failed, filterProducts("Shoes"));
      expect(state.error).toBe(false);
      expect(state.filteredProducts).toHaveLength(2);
    });

    it("ignores an invalid payload", () => {
      expect(reducer(undefined, filterByColor("")).filteredProducts).toHaveLength(4);
    });
  });

  describe("filterBySize", () => {
    it("keeps products that include the size and skips products without sizes", () => {
      const state = reducer(undefined, filterBySize("M"));
      expect(state.filteredProducts.map((p) => p.id)).toEqual(["1", "3"]);
    });

    it("sets the error flag when no product has the size", () => {
      const state = reducer(undefined, filterBySize("XXL"));
      expect(state.error).toBe(true);
      expect(state.filteredProducts).toEqual([]);
    });

    it("stacks with a previous filter", () => {
      const shoes = reducer(undefined, filterProducts("Shoes"));
      const state = reducer(shoes, filterBySize("M"));
      expect(state.filteredProducts.map((p) => p.id)).toEqual(["1"]);
    });

    it("does not crash on products without a size field", () => {
      const bags = reducer(undefined, filterProducts("Bags"));
      const state = reducer(bags, filterBySize("M"));
      expect(state.error).toBe(true);
      expect(state.filteredProducts).toEqual([]);
    });
  });
});