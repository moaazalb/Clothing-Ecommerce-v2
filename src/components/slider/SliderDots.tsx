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
    <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 sm:bottom-8 sm:gap-4">
  {slides.map((slide, index) => (
    <div key={slide.id}>
      <button
        type="button"
        aria-label={`Go to slide ${index + 1}`}
        aria-current={index === activeIndex ? "true" : undefined}
        className={`
          cursor-pointer rounded-full
          border transition-all duration-300 ease-in-out
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#A87945]
          focus-visible:ring-offset-2
          ${
            index === activeIndex
              ? "h-3 w-7 border-[#A87945] bg-[#A87945] sm:w-8"
              : "h-3 w-3 border-[#D6B58A] bg-[#F8F4ED]/90 hover:bg-[#D6B58A]"
          }
        `}
        onClick={() => onSelect(index)}
      />
    </div>
  ))}
</div>
  );
}