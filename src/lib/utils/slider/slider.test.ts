// lib/utils/slider.test.ts
import {
  getDotSlideIndex,
  getNextSlideIndex,
  getPrevSlideIndex,
} from "./slider";

describe("slider helpers", () => {
  describe("getNextSlideIndex", () => {
    it("returns the index when it is inside the range", () => {
      expect(getNextSlideIndex(0, 4)).toBe(0);
      expect(getNextSlideIndex(3, 4)).toBe(3);
    });

    it("wraps to 0 when the index is past the last slide", () => {
      expect(getNextSlideIndex(4, 4)).toBe(0);
    });

    it("returns null for invalid input", () => {
      expect(getNextSlideIndex(-1, 4)).toBeNull();
      expect(getNextSlideIndex("1", 4)).toBeNull();
      expect(getNextSlideIndex(null, 4)).toBeNull();
      expect(getNextSlideIndex(undefined, 4)).toBeNull();
      expect(getNextSlideIndex(1.5, 4)).toBeNull();
    });

    it("returns null when there are no slides", () => {
      expect(getNextSlideIndex(0, 0)).toBeNull();
    });
  });

  describe("getPrevSlideIndex", () => {
    it("returns the index when it is inside the range", () => {
      expect(getPrevSlideIndex(0, 4)).toBe(0);
      expect(getPrevSlideIndex(3, 4)).toBe(3);
    });

    it("wraps to the last slide when the index is negative", () => {
      expect(getPrevSlideIndex(-1, 4)).toBe(3);
    });

    it("returns null for invalid input", () => {
      expect(getPrevSlideIndex(4, 4)).toBeNull();
      expect(getPrevSlideIndex("1", 4)).toBeNull();
      expect(getPrevSlideIndex(Number.NaN, 4)).toBeNull();
    });

    it("returns null when there are no slides", () => {
      expect(getPrevSlideIndex(-1, 0)).toBeNull();
    });
  });

  describe("getDotSlideIndex", () => {
    it("returns the index when the slide exists", () => {
      expect(getDotSlideIndex(0, 4)).toBe(0);
      expect(getDotSlideIndex(3, 4)).toBe(3);
    });

    it("returns null when the slide does not exist", () => {
      expect(getDotSlideIndex(4, 4)).toBeNull();
      expect(getDotSlideIndex(-1, 4)).toBeNull();
    });

    it("returns null for invalid input", () => {
      expect(getDotSlideIndex(1.5, 4)).toBeNull();
      expect(getDotSlideIndex({}, 4)).toBeNull();
    });

    it("returns null when there are no slides", () => {
      expect(getDotSlideIndex(0, 0)).toBeNull();
    });
  });
});