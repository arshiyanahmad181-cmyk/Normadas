import type { Metadata } from "next";
import { ProductCard } from "@/components/site/product-card";
import { getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Skin Care — Vitamin C Serum, Sunblock & Retinol",
  description:
    "Normadas skin care: Vitamin C serum, Sun Ban SPF 60 sunblock / sunscreen, and retinol night cream for radiant, protected, youthful skin. Delivery across Pakistan.",
  keywords: [
    "vitamin c serum",
    "sunblock",
    "sunscreen",
    "SPF 60 sunscreen",
    "retinol night cream",
    "skin care Pakistan",
  ],
  alternates: { canonical: "/skin-care" },
};

export default function SkinCarePage() {
  const items = getProductsByCategory("skin");

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="mb-10 max-w-2xl">
        <p className="font-heading text-sm uppercase tracking-[0.25em] text-gold">
          Collection
        </p>
        <h1 className="mt-2 font-heading text-4xl font-bold md:text-5xl">
          Skin Care
        </h1>
        <p className="mt-3 text-muted-foreground">
          Brighten, protect and renew — a focused routine of Vitamin C,
          broad-spectrum sun protection and overnight retinol.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
        {items.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
