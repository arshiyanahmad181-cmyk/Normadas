"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";

/** Compact add-to-cart button used on product cards. */
export function QuickAdd({ product }: { product: Product }) {
  const { addItem, setOpen } = useCart();
  return (
    <Button
      size="sm"
      className="w-full gap-2"
      onClick={() => {
        addItem(product.slug, 1);
        toast.success(`${product.name} added to cart`);
        setOpen(true);
      }}
    >
      <ShoppingBag className="size-4" />
      Add to Cart
    </Button>
  );
}

/** Full add-to-cart control with quantity stepper, used on the product page. */
export function AddToCart({ product }: { product: Product }) {
  const { addItem, setOpen } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex w-fit items-center rounded-md border border-border">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Decrease quantity"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
        >
          <Minus className="size-4" />
        </Button>
        <span className="w-10 text-center text-sm font-medium">{qty}</span>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Increase quantity"
          onClick={() => setQty((q) => q + 1)}
        >
          <Plus className="size-4" />
        </Button>
      </div>

      <Button
        size="lg"
        className="flex-1 gap-2"
        onClick={() => {
          addItem(product.slug, qty);
          toast.success(`${qty} × ${product.name} added to cart`);
          setOpen(true);
        }}
      >
        <ShoppingBag className="size-4" />
        Add to Cart
      </Button>
    </div>
  );
}
