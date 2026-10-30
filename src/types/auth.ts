// types/auth.ts
import type { User } from "@/lib/validations/auth.schema";

export interface AuthState {
  user: User;
}

/** The part of the root state that the auth selectors need. The slice is registered under `user`. */
export interface AuthRootState {
  user: AuthState;
}