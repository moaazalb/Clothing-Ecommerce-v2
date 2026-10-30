// components/slider/SliderDots.tsx
"use client";

import type { ReactElement } from "react";
import type { SliderItem } from "@/types/product";

interface SliderDotsProps {
  slides: SliderItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

/**
 * Row of dot buttons, one per slide, that jump straight to a slide.
 *
 * @param {SliderDotsProps} props - Component props.
 * @param {SliderItem[]} props.slides - The slides; one dot is drawn for each.
 * @param {number} props.activeIndex - Index of the slide that is shown (its dot is highlighted).
 * @param {(index: number) => void} props.onSelect - Called with the index of the clicked dot.
 * @returns {JSX.Element} The dots.
 */
export function SliderDots({ slides, activeIndex, onSelect }: SliderDotsProps): ReactElement {
  return (
    <div className="absolute bottom-12 left-[45%] flex">
      {slides.map((slide, index) => (
        <div className="mr-4" key={slide.id}>
          <button
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            className={
              index === activeIndex
                ? "cursor-pointer rounded-full bg-green-300 p-2"
                : "cursor-pointer rounded-full bg-white p-2"
            }
            onClick={() => onSelect(index)}
          />
        </div>
      ))}
    </div>
  );
}