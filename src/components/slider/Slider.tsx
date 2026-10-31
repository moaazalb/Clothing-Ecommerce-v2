// components/slider/Slider.tsx
"use client";

import Image from "next/image";
import type { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SliderArrowButton } from "@/components/slider/SliderArrowButton";
import { SliderDots } from "@/components/slider/SliderDots";
import { sliderData } from "@/lib/data/dummyData";
import { selectSlideIndex } from "@/store/selectors/sliderSelectors";
import { dotSlide, nextSlide, prevSlide } from "@/store/slices/sliderSlice/SliderSlice";

const ACTIVE_SLIDE_CLASS = "scale-100 opacity-100 duration-700 ease-in-out";
const INACTIVE_SLIDE_CLASS = "scale-95 opacity-0 duration-700 ease-in-out";

/**
 * Home page image slider. The slide index lives in the Redux slider slice.
 * Renders nothing when there are no slides.
 *
 * @returns {JSX.Element | null} The slider, or null when there are no slides.
 */
export function Slider(): ReactElement | null {
  const slideIndex = useSelector(selectSlideIndex);
  const dispatch = useDispatch();

  if (sliderData.length === 0) return null;

  /**
   * Goes to the next slide (the slice wraps to the first one after the last).
   *
   * @returns {void}
   */
  const handleNext = (): void => {
    dispatch(nextSlide(slideIndex + 1));
  };

  /**
   * Goes to the previous slide (the slice wraps to the last one before the first).
   *
   * @returns {void}
   */
  const handlePrevious = (): void => {
    dispatch(prevSlide(slideIndex - 1));
  };

  /**
   * Jumps to the slide of the clicked dot.
   *
   * @param {number} index - The slide index.
   * @returns {void}
   */
  const handleSelect = (index: number): void => {
    dispatch(dotSlide(index));
  };

  return (
   <section
  aria-roledescription="carousel"
  aria-label="Featured shoes"
  className="relative w-full overflow-hidden pb-6"
>
  <div>
    {sliderData.map((item, index) => {
      const isActive = index === slideIndex;

      return (
        <div
          key={item.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${sliderData.length}`}
          aria-hidden={!isActive}
          className={isActive ? ACTIVE_SLIDE_CLASS : INACTIVE_SLIDE_CLASS}
        >
          <div className="relative w-full">
            {isActive && (
              <Image
                className="
                  h-[420px]
                  w-full
                  object-cover
                  sm:h-[550px]
                  md:h-[650px]
                  lg:h-[750px]
                  xl:h-[800px]
                "
                src={item.img}
                alt={`Shoes, slide ${index + 1} of ${sliderData.length}`}
                sizes="100vw"
                priority={index === 0}
              />
            )}
          </div>

          <div className="absolute inset-x-4 top-1/2 mx-auto max-w-4xl -translate-y-1/2 text-center sm:inset-x-8">
            <p
              className="
                font-inter
                text-2xl
                font-bold
                leading-snug
                tracking-normal
                text-white
                drop-shadow-lg
                sm:text-3xl
                md:text-4xl
                lg:text-5xl
              "
            >
              {isActive && item.text}
            </p>
          </div>
        </div>
      );
    })}
  </div>

  <SliderDots
    slides={sliderData}
    activeIndex={slideIndex}
    onSelect={handleSelect}
  />

  <SliderArrowButton direction="next" onClick={handleNext} />
  <SliderArrowButton direction="prev" onClick={handlePrevious} />
</section>
  );
}