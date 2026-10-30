// components/home/SalesBanner.tsx
import Image from "next/image";
import type { ReactElement } from "react";
import clothes from "@/assets/images/clothes.jpg";

const BANNER_TEXT = "SALES UP TO 50%";

/**
 * Home page sale banner and the large clothes image.
 * It has no state or events, so it stays a Server Component.
 *
 * @returns {JSX.Element} The banner and image.
 */
export function SalesBanner(): ReactElement {
  return (
    <section aria-labelledby="sales-banner-title">
      <div className="mx-auto w-[55%] rounded-md bg-black p-2">
        <h2
          id="sales-banner-title"
          className="text-center font-inter text-lg font-bold leading-none tracking-normal text-red-600"
        >
          {BANNER_TEXT}
        </h2>
      </div>
      <div className="flex items-center justify-center py-4">
        <Image
          className="h-[600px] w-[70%] rounded-md shadow-lg shadow-gray-600"
          src={clothes}
          alt="Clothes collection"
          sizes="70vw"
        />
      </div>
    </section>
  );
}