
import type { AuthRootState } from "@/types/auth";
import type { User } from "@/lib/validations/auth.schema";

/**
 * Selects the current user (a guest when nobody is logged in).
 *
 * @param {AuthRootState} state - The root state.
 * @returns {User} The current user.
 */
export function selectUser(state: AuthRootState): User {
  return state.user.user;
}