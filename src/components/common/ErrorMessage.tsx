// components/common/ErrorMessage.tsx
import type { ReactElement } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

/**
 * Full-screen message shown when the product filters match nothing.
 * It has no state or events, so it stays a Server Component.
 *
 * @returns {JSX.Element} The error message.
 */
export function ErrorMessage(): ReactElement {
  return (
    <div className="grid h-screen grid-cols-1 items-center justify-items-center">
      <div>
        <Alert className="border-red-500 bg-red-500 font-inter">
          <AlertDescription className="text-xl font-bold text-white">
            Sorry no products match your filter search ... Clear the filter and try again{" "}
            <span aria-hidden="true">😀</span>.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}