// components/layout/Navbar.tsx
"use client";

import Image from "next/image";
import type { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../public/assets/images/logo.png";
import { CartButton } from "@/components/cart/CartButton";
import { UserMenu } from "@/components/layout/UserMenu";
import { selectUser } from "@/store/selectors/authSelectors";
import { logout } from "@/store/slices/authSlice/AuthSlice";
import { capitalizeFirst } from "@/lib/utils/string/string";

/**
 * Site header: welcome banner, logo, wish list, shopping bag, user menu and shipping banner.
 *
 * @returns {JSX.Element} The navbar.
 */
export function Navbar(): ReactElement {
  const { name, image } = useSelector(selectUser);
  const dispatch = useDispatch();
  const displayName = capitalizeFirst(name);

  /**
   * Signs the user out.
   *
   * @returns {void}
   */
  const handleLogout = (): void => {
    dispatch(logout());
  };

  return (
    <header>
      <div className="flex w-full items-center justify-center bg-gray-500 p-4">
        <p className="font-inter text-2xl font-bold text-white">
          Welcome <span className="font-inter text-2xl font-bold text-white">{displayName}</span>
        </p>
      </div>
      <nav aria-label="Main" className="flex items-center justify-around">
        <div>
          <Image className="h-28 w-auto" src={logo} alt="Store logo" priority />
        </div>
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#000"
              className="h-6 w-6"
              aria-hidden="true"
              focusable="false"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <p className="mr-2 text-center font-inter text-base font-medium leading-none tracking-normal">
              Wish List
            </p>
          </div>
          <CartButton />
          <UserMenu displayName={displayName} image={image} onLogout={handleLogout} />
        </div>
      </nav>
      <div className="mx-auto flex w-full items-center justify-center bg-gray-500 p-4">
        <p className="mx-96 font-inter text-base font-medium text-white">
          Free shipping and returns
        </p>
      </div>
    </header>
  );
}