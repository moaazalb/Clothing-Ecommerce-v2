
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { sliderData } from "@/lib/data/dummyData";

import {
  getDotSlideIndex,
  getNextSlideIndex,
  getPrevSlideIndex,
} from "@/lib/utils/slider/slider";

import type { SliderState } from "@/types/slider";

const initialState: SliderState = {
  value: 0,
  length: sliderData.length,
};

export const sliderSlice = createSlice({
  name: "slider",
  initialState,

  reducers: {
    nextSlide(state, action: PayloadAction<number>) {
      const index = getNextSlideIndex(action.payload, state.length);

      if (index === null) return;

      state.value = index;
    },

    prevSlide(state, action: PayloadAction<number>) {
      const index = getPrevSlideIndex(action.payload, state.length);

      if (index === null) return;

      state.value = index;
    },

    dotSlide(state, action: PayloadAction<number>) {
      const index = getDotSlideIndex(action.payload, state.length);

      if (index === null) return;

      state.value = index;
    },
  },
});

export const {
  nextSlide,
  prevSlide,
  dotSlide,
} = sliderSlice.actions;

export default sliderSlice.reducer;
