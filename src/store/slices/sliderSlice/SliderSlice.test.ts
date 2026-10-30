
import reducer, { dotSlide, nextSlide, prevSlide } from "./SliderSlice";
import type { SliderState } from "@/types/slider";

jest.mock("@/lib/data/dummyData", () => ({
  sliderData: [
    { id: "0", img: { src: "/a.jpg", width: 1, height: 1 }, text: "A" },
    { id: "1", img: { src: "/b.jpg", width: 1, height: 1 }, text: "B" },
    { id: "2", img: { src: "/c.jpg", width: 1, height: 1 }, text: "C" },
  ],
}));

const initAction = { type: "@@INIT" };
const stateAt = (value: number): SliderState => ({ value, length: 3 });

describe("sliderSlice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("initial state", () => {
    it("starts on the first slide with the slider length", () => {
      expect(reducer(undefined, initAction)).toEqual({ value: 0, length: 3 });
    });
  });

  describe("nextSlide", () => {
    it("moves to the requested index", () => {
      expect(reducer(stateAt(0), nextSlide(1)).value).toBe(1);
    });

    it("allows the last slide", () => {
      expect(reducer(stateAt(1), nextSlide(2)).value).toBe(2);
    });

    it("wraps to the first slide after the last one", () => {
      expect(reducer(stateAt(2), nextSlide(3)).value).toBe(0);
    });

    it("ignores a negative index", () => {
      expect(reducer(stateAt(1), nextSlide(-1)).value).toBe(1);
    });

    it("ignores a decimal index", () => {
      expect(reducer(stateAt(1), nextSlide(1.5)).value).toBe(1);
    });

    it("ignores NaN and Infinity", () => {
      expect(reducer(stateAt(1), nextSlide(Number.NaN)).value).toBe(1);
      expect(reducer(stateAt(1), nextSlide(Number.POSITIVE_INFINITY)).value).toBe(1);
    });
  });

  describe("prevSlide", () => {
    it("moves to the requested index", () => {
      expect(reducer(stateAt(2), prevSlide(1)).value).toBe(1);
    });

    it("allows the first slide", () => {
      expect(reducer(stateAt(1), prevSlide(0)).value).toBe(0);
    });

    it("wraps to the last slide before the first one", () => {
      expect(reducer(stateAt(0), prevSlide(-1)).value).toBe(2);
    });

    it("ignores an index past the last slide", () => {
      expect(reducer(stateAt(1), prevSlide(3)).value).toBe(1);
    });

    it("ignores a decimal index and NaN", () => {
      expect(reducer(stateAt(1), prevSlide(0.5)).value).toBe(1);
      expect(reducer(stateAt(1), prevSlide(Number.NaN)).value).toBe(1);
    });
  });

  describe("dotSlide", () => {
    it("jumps to the clicked slide", () => {
      expect(reducer(stateAt(0), dotSlide(2)).value).toBe(2);
    });

    it("jumps back to the first slide", () => {
      expect(reducer(stateAt(2), dotSlide(0)).value).toBe(0);
    });

    it("ignores an index that does not exist", () => {
      expect(reducer(stateAt(1), dotSlide(3)).value).toBe(1);
      expect(reducer(stateAt(1), dotSlide(99)).value).toBe(1);
    });

    it("ignores a negative index, a decimal and NaN", () => {
      expect(reducer(stateAt(1), dotSlide(-1)).value).toBe(1);
      expect(reducer(stateAt(1), dotSlide(1.2)).value).toBe(1);
      expect(reducer(stateAt(1), dotSlide(Number.NaN)).value).toBe(1);
    });
  });

  describe("empty slider data", () => {
    it("never changes the value when there are no slides", async () => {
      jest.resetModules();
      jest.doMock("@/lib/data/dummyData", () => ({ sliderData: [] }));
      const { default: emptyReducer, nextSlide: next, prevSlide: prev, dotSlide: dot } =
        await import("./SliderSlice");

      const initial = emptyReducer(undefined, initAction);
      expect(initial).toEqual({ value: 0, length: 0 });
      expect(emptyReducer(initial, next(0)).value).toBe(0);
      expect(emptyReducer(initial, prev(-1)).value).toBe(0);
      expect(emptyReducer(initial, dot(0)).value).toBe(0);
    });
  });

  it("does not mutate the previous state", () => {
    const before = stateAt(0);
    reducer(before, nextSlide(1));
    expect(before).toEqual({ value: 0, length: 3 });
  });
});