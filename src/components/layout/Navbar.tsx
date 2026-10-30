
"use client";

import Image from "next/image";
import type { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import logo from "../../../public/assets/images/logo.png";

import { CartButton } from "@/components/cart/CartButton";
import { UserMenu } from "@/components/layout/UserMenu";

import { selectUser } from "@/store/selectors/authSelectors";
import { logout } from "@/store/slices/authSlice/AuthSlice";
import { clearCart } from "@/store/slices/cartSlice/CartSlice";
import { capitalizeFirst } from "@/lib/utils/string/string";

export function Navbar(): ReactElement {
  const { name, image } = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const displayName = capitalizeFirst(name);

const handleLogout = (): void => {
  dispatch(clearCart());
  dispatch(logout());
  router.replace("/");
};

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Welcome Bar */}
      <div className="bg-zinc-950 px-4 py-2 text-center text-xs text-white sm:text-sm">
        <p>
          Welcome back,
          <span className="ml-1 font-semibold text-white">
            {displayName}
          </span>
        </p>
      </div>

      {/* Main Navbar */}
      <nav
        aria-label="Main navigation"
        className="border-b border-gray-100"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="shrink-0">
            <Image
              src={logo}
              alt="Store logo"
              priority
              className="h-14 w-auto object-contain sm:h-16 md:h-20"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-5 md:gap-7">
            {/* Wishlist */}
            <button
              type="button"
              aria-label="Wishlist"
              className="group flex cursor-pointer items-center gap-2 text-zinc-700 transition-colors hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.6"
                className="size-6 transition-transform group-hover:scale-110"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>

              <span className="hidden text-sm font-medium sm:inline">
                Wishlist
              </span>
            </button>

            {/* Cart */}
            <CartButton />

            {/* User */}
            <div className="border-l border-gray-200 pl-3 sm:pl-5">
              <UserMenu
                displayName={displayName}
                image={image}
                onLogout={handleLogout}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Shipping Announcement */}
      <div className="bg-zinc-100 px-4 py-2.5 text-center">
        <p className="text-xs font-medium tracking-wide text-zinc-700 sm:text-sm">
          <span className="mr-2">✦</span>
          Free shipping and returns on all orders
          <span className="ml-2">✦</span>
        </p>
      </div>
    </header>
  );
}
