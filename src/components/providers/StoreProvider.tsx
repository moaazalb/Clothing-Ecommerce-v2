"use client";

import { useEffect, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import { Provider, useDispatch } from "react-redux";

import { makeStore } from "@/store/store";
import type { AppStore, AppDispatch } from "@/store/store";

import { restoreSession } from "@/store/slices/authSlice/AuthSlice";
import { restoreProducts } from "@/store/slices/productSlice/ProductSlice";
import { restoreCart } from "@/store/slices/cartSlice/CartSlice";

import { cartStateSchema } from "@/lib/validations/cart.schema";
import {
  CART_STATE_KEY,
  readSession,
  writeSession,
} from "@/lib/utils/sessionStorage/session-storage";

interface StoreProviderProps {
  children: ReactNode;
}

interface StateInitializerProps {
  store: AppStore;
}

function StateInitializer({ store }: StateInitializerProps): null {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Restore saved cart before starting to persist future changes.
    const savedCart = readSession(CART_STATE_KEY, cartStateSchema);

    if (savedCart) {
      dispatch(restoreCart(savedCart));
    }

    dispatch(restoreSession());
    dispatch(restoreProducts());

    // Persist cart changes to sessionStorage.
    const unsubscribe = store.subscribe(() => {
      writeSession(CART_STATE_KEY, store.getState().cart);
    });

    return unsubscribe;
  }, [dispatch, store]);

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
      <StateInitializer store={store} />
      {children}
    </Provider>
  );
}