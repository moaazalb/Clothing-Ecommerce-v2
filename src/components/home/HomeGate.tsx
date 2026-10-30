// components/home/HomeGate.tsx
"use client";

import type { ReactElement } from "react";
import { useSelector } from "react-redux";
import { LoginForm } from "@/components/auth/LoginForm";
import { Main } from "@/components/home/Main";
import { selectUser } from "@/store/selectors/authSelectors";

/**
 * The home route: the store when the user is logged in, the login form otherwise.
 * Logging in or out switches the view by itself, so no redirect is needed.
 *
 * @returns {JSX.Element} The main page or the login form.
 */
export function HomeGate(): ReactElement {
  const { authUser } = useSelector(selectUser);

  return authUser ? <Main /> : <LoginForm />;
}