// components/slider/SliderArrowButton.tsx
"use client";

import type { ReactElement } from "react";

type ArrowDirection = "next" | "prev";

const ARROWS: Record<ArrowDirection, { label: string; position: string; path: string }> = {
  next: { label: "Next slide", position: "right-4", path: "M8.25 4.5l7.5 7.5-7.5 7.5" },
  prev: { label: "Previous slide", position: "left-4", path: "M15.75 19.5L8.25 12l7.5-7.5" },
};

interface SliderArrowButtonProps {
  direction: ArrowDirection;
  onClick: () => void;
}

/**
 * Round arrow button placed on the left or right edge of the slider.
 *
 * @param {SliderArrowButtonProps} props - Component props.
 * @param {"next" | "prev"} props.direction - Which arrow to draw and where to place it.
 * @param {() => void} props.onClick - Called when the button is clicked.
 * @returns {JSX.Element} The arrow button.
 */
export function SliderArrowButton({ direction, onClick }: SliderArrowButtonProps): ReactElement {
  const { label, position, path } = ARROWS[direction];

  return (
   <button
  type="button"
  aria-label={label}
  className={`
    absolute top-1/2 z-10
    ${position}
    flex items-center justify-center
    rounded-full
    border border-[#D6B58A]
    bg-[#F8F4ED]/95
    p-2
    text-[#4B3621]
    shadow-md
    backdrop-blur-sm
    transition-all duration-300 ease-in-out
    hover:border-[#A87945]
    hover:bg-[#A87945]
    hover:text-white
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-[#A87945]
    focus-visible:ring-offset-2
    sm:p-2.5
    md:p-3
  `}
  onClick={onClick}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="h-5 w-5 sm:h-6 sm:w-6"
    aria-hidden="true"
    focusable="false"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
</button>
  );
}