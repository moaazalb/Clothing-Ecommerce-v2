// lib/utils/slider.ts
import { slideIndexSchema } from "@/lib/validations/slider.schema";

/**
 * Resolves the index for the "next" action. An index past the last slide wraps to the first one.
 *
 * @param {unknown} index - The requested index (usually current + 1).
 * @param {number} length - Total number of slides.
 * @returns {number | null} The slide index to show, or null if the request is invalid.
 */
export function getNextSlideIndex(index: unknown, length: number): number | null {
  const result = slideIndexSchema.safeParse(index);
  if (!result.success || length === 0 || result.data < 0) return null;

  return result.data > length - 1 ? 0 : result.data;
}

/**
 * Resolves the index for the "previous" action. An index before the first slide wraps to the last one.
 *
 * @param {unknown} index - The requested index (usually current - 1).
 * @param {number} length - Total number of slides.
 * @returns {number | null} The slide index to show, or null if the request is invalid.
 */
export function getPrevSlideIndex(index: unknown, length: number): number | null {
  const result = slideIndexSchema.safeParse(index);
  if (!result.success || length === 0 || result.data > length - 1) return null;

  return result.data < 0 ? length - 1 : result.data;
}

/**
 * Resolves the index for a dot click. The index must point to an existing slide.
 *
 * @param {unknown} index - The clicked dot index.
 * @param {number} length - Total number of slides.
 * @returns {number | null} The slide index to show, or null if the request is invalid.
 */
export function getDotSlideIndex(index: unknown, length: number): number | null {
  const result = slideIndexSchema.safeParse(index);
  if (!result.success || result.data < 0 || result.data > length - 1) return null;

  return result.data;
}