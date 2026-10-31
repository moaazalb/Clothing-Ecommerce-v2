import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  loginPayloadSchema,
  registeredUsersSchema,
  signupPayloadSchema,
  userSchema,
} from "@/lib/validations/auth.schema";
import type {
  LoginPayload,
  RegisteredUser,
  SignupPayload,
  User,
} from "@/lib/validations/auth.schema";
import type { AuthState } from "@/types/auth";
import {
  AUTH_USER_KEY,
  readSession,
  removeSession,
  writeSession,
} from "@/lib/utils/sessionStorage/session-storage";

const GUEST_USER: User = { name: "", image: "", authUser: false };

const REGISTERED_USERS_KEY = "registered_users";

const initialState: AuthState = {
  user: { ...GUEST_USER },
  authStatus: "idle",
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

      state.authStatus = "idle";
    },

    /**
     * Checks the submitted credentials against locally registered users.
     *
     * @param {AuthState} state - The current authentication state.
     * @param {PayloadAction<LoginPayload>} action - The login credentials.
     * @returns {void}
     */
   login(state, action: PayloadAction<LoginPayload>) {
  console.log("Login reducer called:", action.payload);

  state.authStatus = "idle";
      const result = loginPayloadSchema.safeParse(action.payload);

      if (!result.success) {
        state.authStatus = "invalid_credentials";
        return;
      }

      const registeredUsers =
        readSession(REGISTERED_USERS_KEY, registeredUsersSchema) ?? [];

      const matchedUser = registeredUsers.find(
        (user: RegisteredUser) =>
          user.name === result.data.name &&
          user.password === result.data.password
      );

      if (!matchedUser) {
        state.user = { ...GUEST_USER };
        removeSession(AUTH_USER_KEY);
        state.authStatus = "invalid_credentials";
        return;
      }

      const user: User = {
        name: matchedUser.name,
        image: matchedUser.image,
        authUser: true,
      };

      state.user = user;
      writeSession(AUTH_USER_KEY, user);
      state.authStatus = "login_success";
    },

    /**
     * Registers a new user locally and starts their session.
     *
     * @param {AuthState} state - The current authentication state.
     * @param {PayloadAction<SignupPayload>} action - The signup data.
     * @returns {void}
     */
    signup(state, action: PayloadAction<SignupPayload>) {
      state.authStatus = "idle";

      const result = signupPayloadSchema.safeParse(action.payload);

      if (!result.success) return;

      const registeredUsers =
        readSession(REGISTERED_USERS_KEY, registeredUsersSchema) ?? [];

      const usernameExists = registeredUsers.some(
        (user: RegisteredUser) =>
          user.name.toLowerCase() === result.data.name.toLowerCase()
      );

      if (usernameExists) {
        state.authStatus = "username_exists";
        return;
      }

      const newUser: RegisteredUser = {
        name: result.data.name,
        password: result.data.password,
        image: result.data.image,
      };

      writeSession(REGISTERED_USERS_KEY, [...registeredUsers, newUser]);

      const user: User = {
        name: newUser.name,
        image: newUser.image,
        authUser: true,
      };

      state.user = user;
      writeSession(AUTH_USER_KEY, user);
      state.authStatus = "signup_success";
    },

    /**
     * Logs out the current user without deleting registered accounts.
     *
     * @param {AuthState} state - The current authentication state.
     * @returns {void}
     */
      logout(state) {
      state.user = { ...GUEST_USER };
      state.authStatus = "logout_success";
      removeSession(AUTH_USER_KEY);
    },
    /**
     * Resets the authentication operation status.
     *
     * @param {AuthState} state - The current authentication state.
     * @returns {void}
     */
    resetAuthStatus(state) {
      state.authStatus = "idle";
    },
  },
});

export const {
  login,
  signup,
  logout,
  restoreSession,
  resetAuthStatus,
} = authSlice.actions;

export default authSlice.reducer;