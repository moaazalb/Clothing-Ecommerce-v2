// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactElement, ReactNode } from "react";
import { ClientOnly } from "@/components/common/ClientOnly";
import { StoreProvider } from "@/components/providers/StoreProvider";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-next",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Clothing Store", template: "%s | Clothing Store" },
};

interface RootLayoutProps {
  children: ReactNode;
}

/**
 * Root layout: the font, the Redux store, and a gate that renders the pages after hydration.
 *
 * @param {RootLayoutProps} props - Layout props.
 * @param {ReactNode} props.children - The current page.
 * @returns {JSX.Element} The HTML shell.
 */
export default function RootLayout({ children }: Readonly<RootLayoutProps>): ReactElement {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <StoreProvider>
          <ClientOnly>{children}</ClientOnly>
        </StoreProvider>
      </body>
    </html>
  );
}