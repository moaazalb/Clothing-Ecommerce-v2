// app/login/page.tsx
import type { Metadata } from "next";
import type { ReactElement } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
};

/**
 * Login page. It stays a Server Component and only renders the interactive form.
 *
 * @returns {JSX.Element} The login page.
 */
export default function LoginPage(): ReactElement {
  return <LoginForm />;
}