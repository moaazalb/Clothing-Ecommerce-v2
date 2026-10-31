
"use client";

import { useEffect, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";

import { makeStore } from "@/store/store";
import type { AppStore } from "@/store/store";

import { StoreEffects } from "./StoreEffects";

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({
  children,
}: StoreProviderProps): ReactElement | null {
  const [store, setStore] = useState<AppStore | null>(null);

  useEffect(() => {
    setStore(makeStore());
  }, []);

  if (!store) {
    return null;
  }

  return (
    <Provider store={store}>
      <StoreEffects store={store} />
      {children}
    </Provider>
  );
}
