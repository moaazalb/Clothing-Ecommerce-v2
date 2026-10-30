// components/home/Main.tsx
import type { ReactElement } from "react";
import { NavigateButtons } from "@/components/home/NavigateButtons";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ProductSection } from "@/components/products/ProductSection";
import { Slider } from "@/components/slider/Slider";

/**
 * The store home page: navbar, slider, category links, sale products and footer.
 * It has no state or events, so it stays a Server Component. The navbar and footer sit
 * outside `<main>`, so the page gets the `banner`, `main` and `contentinfo` landmarks.
 *
 * @returns {JSX.Element} The home page content.
 */
export function Main(): ReactElement {
  return (
    <>
      <Navbar />
      <main>
        <Slider />
        <NavigateButtons />
        <ProductSection />
      </main>
      <Footer />
    </>
  );
}