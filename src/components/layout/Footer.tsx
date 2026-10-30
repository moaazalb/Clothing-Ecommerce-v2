import Image from "next/image";
import type { ReactElement } from "react";
import logo from "@/public/assets/images/logo.png";

const COPYRIGHT_OWNER = "Moaaz Al-bari";

/**
 * Site footer with a divider, the logo and a copyright line for the current year.
 * It has no state or events, so it stays a Server Component.
 *
 * @returns {JSX.Element} The footer.
 */
export function Footer(): ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="flex items-center justify-center">
        <hr className="h-px w-4/5 border-none bg-gray-400 opacity-50 outline-none" />
      </div>
      <div className="flex items-center justify-around pt-4">
        <div>
          <Image className="h-20 w-auto" src={logo} alt={`${COPYRIGHT_OWNER} logo`} />
        </div>
        <div>
          <p className="font-inter text-sm normal-case text-black no-underline">
            Copyright {year} by {COPYRIGHT_OWNER}
          </p>
        </div>
      </div>
    </footer>
  );
}