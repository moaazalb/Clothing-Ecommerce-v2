// components/products/ColorSwatches.tsx
import type { ReactElement } from "react";

interface ColorSwatchesProps {
  colors?: readonly string[];
}

/**
 * Row of small colored dots, one per available color. Renders nothing when there are no colors.
 *
 * @param {ColorSwatchesProps} props - Component props.
 * @param {readonly string[]} [props.colors] - CSS color names, for example "red".
 * @returns {JSX.Element | null} The dots, or null when there are no colors.
 */
export function ColorSwatches({ colors }: ColorSwatchesProps): ReactElement | null {
  if (!colors || colors.length === 0) return null;

  return (
    <ul
  aria-label="Available colors"
  className="flex flex-wrap items-center gap-2 sm:gap-3"
  >
  {colors.map((color) => (
    <li key={color}>
      <span
        role="img"
        aria-label={`Color ${color}`}
        className="
          inline-block
          size-5
          rounded-full
          border border-[#D6B58A]
          shadow-sm
          transition-transform duration-200
          hover:scale-110
          sm:size-6
        "
        style={{ backgroundColor: color }}
      />
    </li>
  ))}
  </ul>
  );
}