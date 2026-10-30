"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import logo from "../../../public/assets/images/logo.png";

const COPYRIGHT_OWNER = "Moaaz Al-bari";

/**
 * Site footer with a divider, the logo and a copyright line for the current year.
 * It has no state or events, so it stays a Server Component.
 *
 * @returns {JSX.Element} The footer.
 */
export function Footer(): ReactElement {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 sm:flex-row sm:gap-4">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            className="h-16 w-auto object-contain sm:h-20"
            src={logo}
            alt={`${COPYRIGHT_OWNER} logo`}
          />
        </div>

        {/* Copyright */}
        <div className="text-center sm:text-right">
          <p className="font-inter text-xs font-medium text-gray-500 sm:text-sm">
            Copyright © {year ?? "----"} {COPYRIGHT_OWNER}. All rights reserved.
          </p>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-1 w-full bg-gray-800" />
    </footer>
  );
}