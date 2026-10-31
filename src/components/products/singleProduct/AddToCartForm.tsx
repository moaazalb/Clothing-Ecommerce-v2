// components/products/AddToCartForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ProductOptionSelect } from "@/components/products/singleProduct/ProductOptionSelect";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/store/slices/cartSlice/CartSlice";
import type { Product } from "@/lib/validations/product.schema";
import {
  createProductSelectionSchema,
  type ProductSelectionValues,
} from "@/lib/validations/productSelection.schema";

interface AddToCartFormProps {
  product: Product;
}

/**
 * Size and color pickers with the "Add to Cart" button. The first size and color are
 * selected by default. Products without sizes (bags) get a disabled, empty size select.
 *
 * @param {AddToCartFormProps} props - Component props.
 * @param {Product} props.product - The product being shown.
 * @returns {JSX.Element} The form.
 */
export function AddToCartForm({ product }: AddToCartFormProps): ReactElement {
  const dispatch = useDispatch();
  const schema = useMemo(() => createProductSelectionSchema(product), [product]);
  const sizes = product.size ?? [];
  const hasSizes = sizes.length > 0;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ProductSelectionValues>({
    resolver: zodResolver(schema),
    defaultValues: { size: sizes[0] ?? "", color: product.color[0] ?? "" },
    mode: "onChange",
  });

  /**
   * Adds one unit of the product, with the chosen size and color, to the cart.
   *
   * @param {ProductSelectionValues} values - The validated selection.
   * @returns {void}
   */
  const onSubmit = (values: ProductSelectionValues): void => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        img: product.img,
        text: product.text,
        price: product.price,
        color: values.color,
        ...(hasSizes ? { size: values.size } : {}),
      })
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full flex-col gap-5"
    >
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        <div className="w-full min-w-0 flex-1">
          <ProductOptionSelect
            id="size"
            label="Pick a size"
            options={sizes}
            registration={hasSizes ? register("size") : undefined}
            isDisabled={!hasSizes}
            error={errors.size?.message}
          />
        </div>

        <div className="w-full min-w-0 flex-1">
          <ProductOptionSelect
            id="color"
            label="Pick a color"
            options={product.color}
            registration={register("color")}
            error={errors.color?.message}
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="outline"
        size="lg"
        disabled={!isValid || isSubmitting}
        className="w-full border-[#A87945] bg-[#A87945] px-8 font-semibold text-white shadow-sm transition-all duration-300 hover:border-[#4B3621] hover:bg-[#4B3621] hover:text-white focus-visible:ring-2 focus-visible:ring-[#A87945] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-[#D6B58A] disabled:bg-[#E8D8C3] disabled:text-[#806B56] sm:w-auto"
      >
        Add to Cart
      </Button>
    </form>
  );
}