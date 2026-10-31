import type { User } from "@/lib/validations/auth.schema";

export type AuthStatus =
  | "idle"
  | "login_success"
  | "invalid_credentials"
  | "signup_success"
  | "username_exists"
  | "logout_success";

export interface AuthState {
  user: User;
  authStatus: AuthStatus;
}

/** The part of the root state that the auth selectors need. The slice is registered under `user`. */
export interface AuthRootState {
  user: AuthState;
}