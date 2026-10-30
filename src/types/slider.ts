// types/slider.ts
export interface SliderState {
  value: number;
  length: number;
}

/** The part of the root state that the slider selectors need. */
export interface SliderRootState {
  slider: SliderState;
}