// lib/validations/slider.schema.ts
import { z } from "zod";

/** A slide index must be a whole number. NaN, Infinity and decimals are rejected. */
export const slideIndexSchema = z.number().int();

export type SlideIndex = z.infer<typeof slideIndexSchema>;