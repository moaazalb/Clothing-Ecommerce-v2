import type { SliderRootState } from "@/types/slider";

/**
 * Selects the index of the slide that is currently shown.
 *
 * @param {SliderRootState} state - The root state.
 * @returns {number} The current slide index.
 */
export function selectSlideIndex(state: SliderRootState): number {
  return state.slider.value;
}