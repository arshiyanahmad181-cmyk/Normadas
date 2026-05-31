import type { Metadata } from "next";
import { ProductCard } from "@/components/site/product-card";
import { getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Hair Care — Hair Growth Serum & Redensyl Oil",
  description:
    "Normadas hair care: stem cell activator hair growth serums and Redensyl dry hair oil to control hair fall and grow fuller, stronger, denser hair. Delivery across Pakistan.",
  keywords: [
    "hair growth serum",
    "hair fall control",
    "redensyl hair oil",
    "stem cell hair serum",
    "anti hair fall serum",
    "hair care Pakistan",
  ],
  alternates: { canonical: "/hair-care" },
};

export default function HairCarePage() {
  const items = getProductsByCategory("hair");

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="mb-10 max-w-2xl">
        <p className="font-heading text-sm uppercase tracking-[0.25em] text-gold">
          Collection
        </p>
        <h1 className="mt-2 font-heading text-4xl font-bold md:text-5xl">
          Hair Care
        </h1>
        <p className="mt-3 text-muted-foreground">
          Target hair fall, boost density and revitalise your scalp with our
          growth-focused serums and oils.
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
