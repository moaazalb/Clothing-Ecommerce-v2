// lib/store/sliderSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { sliderData } from "@/lib/data/dummyData";
import {
  getDotSlideIndex,
  getNextSlideIndex,
  getPrevSlideIndex,
} from "@/src/lib/utils/slider/slider";
import type { SliderState } from "@/types/slider";

/**
 * Builds the initial slider state from the slider data.
 *
 * @returns {SliderState} The initial state, starting on the first slide.
 */
function getInitialState(): SliderState {
  return {
    value: 0,
    length: sliderData.length,
  };
}

export const sliderSlice = createSlice({
  name: "slider",
  initialState: getInitialState(),
  reducers: {
    /**
     * Goes to the next slide, wrapping to the first one after the last.
     *
     * @param {SliderState} state - Current state.
     * @param {PayloadAction<number>} action - The requested index (current + 1).
     * @returns {void}
     */
    nextSlide(state, action: PayloadAction<number>) {
      const index = getNextSlideIndex(action.payload, state.length);
      if (index === null) return;
      state.value = index;
    },

    /**
     * Goes to the previous slide, wrapping to the last one before the first.
     *
     * @param {SliderState} state - Current state.
     * @param {PayloadAction<number>} action - The requested index (current - 1).
     * @returns {void}
     */
    prevSlide(state, action: PayloadAction<number>) {
      const index = getPrevSlideIndex(action.payload, state.length);
      if (index === null) return;
      state.value = index;
    },

    /**
     * Jumps directly to a slide from a dot indicator.
     *
     * @param {SliderState} state - Current state.
     * @param {PayloadAction<number>} action - The index of the clicked dot.
     * @returns {void}
     */
    dotSlide(state, action: PayloadAction<number>) {
      const index = getDotSlideIndex(action.payload, state.length);
      if (index === null) return;
      state.value = index;
    },
  },
});

export const { nextSlide, prevSlide, dotSlide } = sliderSlice.actions;
export default sliderSlice.reducer;