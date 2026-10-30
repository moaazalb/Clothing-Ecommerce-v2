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
    <div className="flex flex-row items-center pl-4">
      {image ? (
        <Avatar className="mr-2 size-8">
          <AvatarImage src={image} alt="User avatar" />
          <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
        </Avatar>
      ) : null}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="cursor-pointer font-inter text-sm font-medium leading-none tracking-normal"
              onClick={onLogout}
            >
              Hi {displayName}
              <span className="sr-only">, sign out</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Sign Out</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}