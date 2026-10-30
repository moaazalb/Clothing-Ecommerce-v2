
import type { ReactElement } from "react";

import { NavigateButtons } from "@/components/home/NavigateButtons";
import { ProductSection } from "@/components/products/ProductSection";
import { Slider } from "@/components/slider/Slider";

export function Main(): ReactElement {
  return (
    <main>
      <Slider />
      <NavigateButtons />
      <ProductSection />
    </main>
  );
}
