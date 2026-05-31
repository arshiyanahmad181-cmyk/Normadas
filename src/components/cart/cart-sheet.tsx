"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/components/cart/cart-context";
import { products } from "@/lib/products";
import { formatPKR } from "@/lib/format";

export function CartSheet() {
  const { items, isOpen, setOpen, setQty, removeItem, subtotal, totalItems } =
    useCart();

  const lines = items
    .map((item) => {
      const product = products.find((p) => p.slug === item.slug);
      return product ? { ...item, product } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading flex items-center gap-2 text-xl">
            <ShoppingBag className="size-5" />
            Your Cart {totalItems > 0 && `(${totalItems})`}
          </SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="size-10 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Continue shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4">
              <ul className="flex flex-col gap-4 py-2">
                {lines.map(({ product, qty }) => (
                  <li key={product.slug} className="flex gap-3">
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={() => setOpen(false)}
                      className="relative size-20 shrink-0 overflow-hidden rounded-md border border-border bg-secondary"
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="80px"
                        className="object-contain p-1.5"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <span className="text-sm font-medium leading-tight">
                          {product.name}
                        </span>
                        <button
                          type="button"
                          aria-label="Remove item"
                          onClick={() => removeItem(product.slug)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatPKR(product.price)}
                      </span>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-md border border-border">
                          <button
                            type="button"
                            aria-label="Decrease"
                            className="flex size-7 items-center justify-center text-muted-foreground hover:text-foreground"
                            onClick={() => setQty(product.slug, qty - 1)}
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-7 text-center text-sm">{qty}</span>
                          <button
                            type="button"
                            aria-label="Increase"
                            className="flex size-7 items-center justify-center text-muted-foreground hover:text-foreground"
                            onClick={() => setQty(product.slug, qty + 1)}
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold">
                          {formatPKR(product.price * qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <SheetFooter className="gap-3">
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-heading text-lg font-bold">
                  {formatPKR(subtotal)}
                </span>
              </div>
              <Button asChild size="lg" className="w-full">
                <Link href="/checkout" onClick={() => setOpen(false)}>
                  Checkout
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full"
              >
                <Link href="/cart" onClick={() => setOpen(false)}>
                  View full cart
                </Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
