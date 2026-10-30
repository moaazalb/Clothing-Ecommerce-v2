import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { loginPayloadSchema, userSchema } from "@/src/lib/validations/auth.schema";
import type { LoginPayload, User } from "@/src/lib/validations/auth.schema";
import type { AuthState } from "@/types/auth";
import { AUTH_USER_KEY, clearSession, readSession, removeSession, writeSession } from "@/src/lib/utils/sessionStorage/session-storage";

const GUEST_USER: User = {
  name: "",
  image: "",
  authUser: false,
};

/**
 * Builds the initial state, restoring a validated user from sessionStorage when available.
 *
 * @returns {AuthState} The initial auth state (a guest if nothing valid is stored).
 */
function getInitialState(): AuthState {
  return {
    user: readSession(AUTH_USER_KEY, userSchema) ?? { ...GUEST_USER },
  };
}

export const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    /**
     * Logs the user in if the credentials pass validation, otherwise resets to a guest.
     * The password is checked but never stored.
     *
     * @param {AuthState} state - Current state.
     * @param {PayloadAction<LoginPayload>} action - Name, password and image from the login form.
     * @returns {void}
     */
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

    /**
     * Logs the user out and clears sessionStorage.
     *
     * @param {AuthState} state - Current state.
     * @returns {void}
     */
    logout(state) {
      state.user = { ...GUEST_USER };
      clearSession();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;