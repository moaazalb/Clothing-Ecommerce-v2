// components/common/ClientOnly.tsx
"use client";

import { useSyncExternalStore } from "react";
import type { ReactElement, ReactNode } from "react";

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Subscribe function that does nothing, because the "is client" value never changes.
 *
 * @returns {() => void} A function that unsubscribes (also does nothing).
 */
function subscribe(): () => void {
  return () => undefined;
}

/**
 * Snapshot used in the browser.
 *
 * @returns {boolean} Always true.
 */
function getClientSnapshot(): boolean {
  return true;
}

/**
 * Snapshot used on the server and during hydration.
 *
 * @returns {boolean} Always false.
 */
function getServerSnapshot(): boolean {
  return false;
}

/**
 * Renders its children only in the browser, after hydration. The store reads sessionStorage
 * (saved user, filters, selected product), which the server cannot see, so rendering those
 * parts on the server would not match the browser and React would report a hydration error.
 *
 * @param {ClientOnlyProps} props - Component props.
 * @param {ReactNode} props.children - Content that depends on sessionStorage.
 * @param {ReactNode} [props.fallback=null] - Shown on the server and during hydration.
 * @returns {JSX.Element} The children, or the fallback before hydration is done.
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps): ReactElement {
  const isClient = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  return <>{isClient ? children : fallback}</>;
}