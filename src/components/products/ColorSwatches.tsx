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
    <ul aria-label="Available colors" className="flex gap-1">
      {colors.map((color) => (
        <li key={color}>
          <span
            role="img"
            aria-label={`Color ${color}`}
            className="mr-4 mt-[3px] inline-block size-6 rounded-full"
            style={{ backgroundColor: color }}
          />
        </li>
      ))}
    </ul>
  );
}