
"use client";

import { useEffect, useState } from "react";
import type { ReactElement, ReactNode } from "react";

import { Provider, useDispatch } from "react-redux";

import { makeStore } from "@/store/store";

import type {
  AppStore,
  AppDispatch,
} from "@/store/store";

import { restoreSession } from "@/store/slices/authSlice/AuthSlice";
import { restoreProducts } from "@/store/slices/productSlice/ProductSlice";


interface StoreProviderProps {
  children: ReactNode;
}

function StateInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(restoreSession());
    dispatch(restoreProducts());
  }, [dispatch]);

  return null;
}

export function StoreProvider({
  children,
}: StoreProviderProps): ReactElement | null {
  const [store, setStore] = useState<AppStore | null>(null);

  useEffect(() => {
    const newStore = makeStore();
    setStore(newStore);
  }, []);

  // Wait until Redux store is initialized on the client.
  if (!store) {
    return null;
  }

  return (
    <Provider store={store}>
      <StateInitializer />
      {children}
    </Provider>
  );
}
