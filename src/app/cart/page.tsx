"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/components/cart/cart-context";
import { products } from "@/lib/products";
import { formatPKR } from "@/lib/format";

export default function CartPage() {
  const { items, setQty, removeItem, subtotal, totalItems } = useCart();

  const lines = items
    .map((item) => {
      const product = products.find((p) => p.slug === item.slug);
      return product ? { ...item, product } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 font-heading text-3xl font-bold md:text-4xl">
        Your Cart
      </h1>

      {lines.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-secondary/40 py-20 text-center">
          <ShoppingBag className="size-12 text-muted-foreground/40" />
          <p className="text-muted-foreground">Your cart is currently empty.</p>
          <Button asChild>
            <Link href="/skin-care">Start shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Items */}
          <ul className="lg:col-span-2 divide-y divide-border rounded-2xl border border-border">
            {lines.map(({ product, qty }) => (
              <li key={product.slug} className="flex gap-4 p-4">
                <Link
                  href={`/products/${product.slug}`}
                  className="relative size-24 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="96px"
                    className="object-contain p-2"
                  />
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-3">
                    <div>
                      <Link
                        href={`/products/${product.slug}`}
                        className="font-heading font-semibold hover:underline"
                      >
                        {product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {product.subtitle}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label="Remove"
                      onClick={() => removeItem(product.slug)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-md border border-border">
                      <button
                        type="button"
                        aria-label="Decrease"
                        className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground"
                        onClick={() => setQty(product.slug, qty - 1)}
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="w-8 text-center text-sm">{qty}</span>
                      <button
                        type="button"
                        aria-label="Increase"
                        className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground"
                        onClick={() => setQty(product.slug, qty + 1)}
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                    <span className="font-semibold">
                      {formatPKR(product.price * qty)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Summary */}
          <aside className="h-fit rounded-2xl border border-border bg-card p-6">
            <h2 className="font-heading text-lg font-semibold">
              Order Summary
            </h2>
            <div className="mt-4 flex justify-between text-sm">
              <span className="text-muted-foreground">
                Items ({totalItems})
              </span>
              <span>{formatPKR(subtotal)}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between">
              <span className="font-medium">Subtotal</span>
              <span className="font-heading text-lg font-bold">
                {formatPKR(subtotal)}
              </span>
            </div>
            <Button asChild size="lg" className="mt-6 w-full gap-2">
              <Link href="/checkout">
                Proceed to Checkout <ArrowRight className="size-4" />
              </Link>
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}
