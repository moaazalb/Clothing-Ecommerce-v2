// components/providers/StoreProvider.tsx
"use client";

import { useState } from "react";
import type { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store/store";
import type { AppStore } from "@/store/store";

interface StoreProviderProps {
  children: ReactNode;
}

/**
 * Gives the whole app the Redux store. The store is created once per mount,
 * not once per render.
 *
 * @param {StoreProviderProps} props - Component props.
 * @param {ReactNode} props.children - The app.
 * @returns {JSX.Element} The provider.
 */
export function StoreProvider({ children }: StoreProviderProps): ReactElement {
  const [store] = useState<AppStore>(makeStore);

  return <Provider store={store}>{children}</Provider>;
}