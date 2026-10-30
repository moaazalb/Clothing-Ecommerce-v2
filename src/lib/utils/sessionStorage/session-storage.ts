// lib/utils/sessionStorage.ts
import type { z } from "zod";

export const FILTERED_DATA_KEY = "filteredData";
export const SINGLE_PRODUCT_KEY = "singleProduct";
export const AUTH_USER_KEY = "authUser";

/**
 * Reads and validates a JSON value from sessionStorage.
 *
 * @param {string} key - The sessionStorage key.
 * @param {z.ZodType<T>} schema - Zod schema the stored value must match.
 * @returns {T | null} The validated value, or null if missing, corrupt, invalid, or on the server.
 */
export function readSession<T>(key: string, schema: z.ZodType<T>): T | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(key);
    if (raw === null) return null;

    const result = schema.safeParse(JSON.parse(raw));
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

/**
 * Writes a value to sessionStorage as JSON. Never throws.
 *
 * @param {string} key - The sessionStorage key.
 * @param {unknown} value - Any JSON-serializable value.
 * @returns {void}
 */
export function writeSession(key: string, value: unknown): void {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be full or disabled (private mode); the app must keep working without it.
  }
}

/**
 * Removes one key from sessionStorage. Never throws.
 *
 * @param {string} key - The sessionStorage key to remove.
 * @returns {void}
 */
export function removeSession(key: string): void {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.removeItem(key);
  } catch {
    // Storage may be disabled; there is nothing to remove in that case.
  }
}

/**
 * Clears everything in sessionStorage. Never throws.
 *
 * @returns {void}
 */
export function clearSession(): void {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.clear();
  } catch {
    // Storage may be disabled; there is nothing to clear in that case.
  }
}


