
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { loginPayloadSchema, userSchema } from "@/lib/validations/auth.schema";
import type { LoginPayload, User } from "@/lib/validations/auth.schema";
import type { AuthState } from "@/types/auth";

import {
  AUTH_USER_KEY,
  clearSession,
  readSession,
  removeSession,
  writeSession,
} from "@/lib/utils/sessionStorage/session-storage";

const GUEST_USER: User = {
  name: "",
  image: "",
  authUser: false,
};

const initialState: AuthState = {
  user: { ...GUEST_USER },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // Restore user from sessionStorage after hydration
    restoreSession(state) {
      if (typeof window === "undefined") return;

      state.user =
        readSession(AUTH_USER_KEY, userSchema) ?? { ...GUEST_USER };
    },

    login(state, action: PayloadAction<LoginPayload>) {
      const result = loginPayloadSchema.safeParse(action.payload);

      if (!result.success) {
        state.user = { ...GUEST_USER };
        removeSession(AUTH_USER_KEY);
        return;
      }

      const user: User = {
        name: result.data.name,
        image: result.data.image,
        authUser: true,
      };

      state.user = user;
      writeSession(AUTH_USER_KEY, user);
    },

    logout(state) {
      state.user = { ...GUEST_USER };
      clearSession();
    },
  },
});

export const { login, logout, restoreSession } = authSlice.actions;

export default authSlice.reducer;
