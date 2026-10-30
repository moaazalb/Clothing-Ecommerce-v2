// lib/utils/string.ts

/**
 * Makes the first character uppercase and keeps the rest as it is.
 *
 * @param {string} value - The text to change.
 * @returns {string} The text with an uppercase first character ("" stays "").
 */
export function capitalizeFirst(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}