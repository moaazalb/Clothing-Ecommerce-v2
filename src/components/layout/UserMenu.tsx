// components/layout/UserMenu.tsx
"use client";

import type { ReactElement } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface UserMenuProps {
  displayName: string;
  image: string;
  onLogout: () => void;
}

/**
 * The user area of the navbar: an optional avatar and a "Hi <name>" button that signs out.
 *
 * @param {UserMenuProps} props - Component props.
 * @param {string} props.displayName - The name to show (already capitalized).
 * @param {string} props.image - Avatar image URL. The avatar is hidden when it is empty.
 * @param {() => void} props.onLogout - Called when the user clicks the sign out button.
 * @returns {JSX.Element} The user menu.
 */
export function UserMenu({ displayName, image, onLogout }: UserMenuProps): ReactElement {
 return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={onLogout}
            aria-label={`Sign out, ${displayName}`}
            className="group flex cursor-pointer items-center gap-2 rounded-full px-2 py-1.5 transition-all duration-200 hover:bg-[#F8F4ED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A87945] focus-visible:ring-offset-2"
          >
            <Avatar className="size-9 border border-[#D6B58A] shadow-sm transition-all duration-200 group-hover:border-[#A87945] group-hover:shadow-md sm:size-10">
              <AvatarImage src={image} alt={displayName} />

              <AvatarFallback className="bg-[#A87945] text-xs font-semibold text-white">
                {displayName?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="hidden flex-col items-start sm:flex">
              <span className="text-[11px] font-medium text-[#A87945]">
                Welcome
              </span>

              <span className="max-w-24 truncate text-sm font-semibold text-[#4B3621] transition-colors duration-200 group-hover:text-[#A87945]">
                {displayName}
              </span>
            </div>
          </button>
        </TooltipTrigger>

        <TooltipContent
          side="bottom"
          className="border border-[#E8D8C3] bg-[#4B3621] text-[#F8F4ED]"
        >
          Sign Out
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}