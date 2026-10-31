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
<div className="grid min-h-[60vh] place-items-center px-4 py-12">
  <div className="w-full max-w-xl">
    <Alert className="rounded-2xl border border-[#E8D8C3] bg-[#F8F4ED] px-5 py-6 shadow-sm sm:px-8 sm:py-8">
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Filter Icon */}
        <div className="flex size-16 items-center justify-center rounded-full bg-white text-[#A87945] shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="size-8"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5h18M6 12h12m-9 7h6"
            />
          </svg>
        </div>

        <AlertDescription className="font-inter text-base leading-7 text-[#806B56] sm:text-lg">
          <span className="mb-2 block text-xl font-bold text-[#4B3621] sm:text-2xl">
            No Products Found
          </span>

          Sorry, no products match your filter search.
          Try adjusting your filters to discover more products.

          <span className="ml-1" aria-hidden="true">
            🙂
          </span>
        </AlertDescription>
      </div>
    </Alert>
  </div>
</div>
  );
}