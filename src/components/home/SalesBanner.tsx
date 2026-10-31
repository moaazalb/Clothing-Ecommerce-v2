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
  <section aria-labelledby="sales-banner-title" className="w-full px-4 sm:px-6 lg:px-8">
     <div className="mx-auto w-full max-w-3xl rounded-lg border border-[#D6B58A] bg-[#4B3621] p-3 shadow-sm sm:p-4">
      <h2
        id="sales-banner-title"
        className="
          text-center
          font-inter
          text-base
          font-bold
          leading-relaxed
          tracking-normal
          text-[#F8F4ED]
          sm:text-lg
          md:text-xl
        "
      >
      {BANNER_TEXT}
       </h2>
      </div>

  <div className="flex w-full items-center justify-center py-5 sm:py-7">
    <Image
      className="
        h-auto
        w-full
        max-w-6xl
        rounded-lg
        object-cover
        shadow-lg
        shadow-[#4B3621]/20
        sm:w-[90%]
        lg:w-[85%]
      "
      src={clothes}
      alt="Clothes collection"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 85vw"
    />
  </div>
    </section>
  );
}