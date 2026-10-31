
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import type { AppStore, AppDispatch, RootState } from "@/store/store";

import {
  restoreSession,
  resetAuthStatus,
} from "@/store/slices/authSlice/AuthSlice";
import { restoreProducts } from "@/store/slices/productSlice/ProductSlice";
import { restoreCart } from "@/store/slices/cartSlice/CartSlice";

import { cartStateSchema } from "@/lib/validations/cart.schema";
import {
  CART_STATE_KEY,
  readSession,
  writeSession,
} from "@/lib/utils/sessionStorage/session-storage";

import { showError, showSuccess } from "@/lib/utils/alerts/alerts";

interface StoreEffectsProps {
  store: AppStore;
}

export function StoreEffects({ store }: StoreEffectsProps): null {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const authStatus = useSelector(
    (state: RootState) => state.user.authStatus
  );

  // Restore saved application state and persist cart changes.
  useEffect(() => {
    const savedCart = readSession(CART_STATE_KEY, cartStateSchema);

    if (savedCart) {
      dispatch(restoreCart(savedCart));
    }

    dispatch(restoreSession());
    dispatch(restoreProducts());

    const unsubscribe = store.subscribe(() => {
      writeSession(CART_STATE_KEY, store.getState().cart);
    });

    return unsubscribe;
  }, [dispatch, store]);

  // Handle authentication notifications.
  useEffect(() => {
    if (authStatus === "login_success") {
      showSuccess(
        "Welcome Back!",
        "You have successfully signed in."
      ).then(() => {
        dispatch(resetAuthStatus());
        router.replace("/");
      });
    }

    if (authStatus === "invalid_credentials") {
      showError(
        "Login Failed",
        "Username or password is incorrect."
      ).then(() => {
        dispatch(resetAuthStatus());
      });
    }
    if (authStatus === "logout_success") {
  showSuccess(
    "Goodbye!",
    "You have successfully logged out."
  ).then(() => {
    dispatch(resetAuthStatus());
  });
}
  }, [authStatus, dispatch, router]);

  return null;
}
