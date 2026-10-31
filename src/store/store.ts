// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/authSlice/AuthSlice";
import cartReducer from './slices/cartSlice/CartSlice';
import productReducer from "./slices/productSlice/ProductSlice";
import sliderReducer from "./slices/sliderSlice/SliderSlice";

/**
 * Creates a new store. Next.js needs one store per request, so this is a function
 * and not a shared constant. The slice keys match what the selectors read.
 *
 * @returns {AppStore} A new store with the auth (`user`), cart, products and slider slices.
 */
export function makeStore() {
  console.trace("makeStore called");
  return configureStore({
    reducer: {
      user: authReducer,
      cart: cartReducer,
      products: productReducer,
      slider: sliderReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];