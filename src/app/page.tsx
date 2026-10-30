// app/page.tsx
import type { ReactElement } from "react";
import { HomeGate } from "@/components/home/HomeGate";

/**
 * Home page. It stays a Server Component and only renders the client gate.
 *
 * @returns {JSX.Element} The home page.
 */
export default function HomePage(): ReactElement {
  return <HomeGate />;
}