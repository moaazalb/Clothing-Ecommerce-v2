
import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import type { ReactElement, ReactNode } from "react";

import { ClientOnly } from "@/components/common/ClientOnly";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import "@/app/globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-next",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Clothing Store",
    template: "%s | Clothing Store",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>): ReactElement {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <StoreProvider>
          <ClientOnly>
            <Navbar />
            {children}
            <Footer />
          </ClientOnly>
        </StoreProvider>
      </body>
    </html>
  );
}
