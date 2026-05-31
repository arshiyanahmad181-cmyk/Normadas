import Image from "next/image";
import Link from "next/link";
import { formatPKR } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { QuickAdd } from "@/components/site/add-to-cart";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg hover:shadow-black/5">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-secondary"
      >
        {product.badge && (
          <Badge className="absolute left-3 top-3 z-10 bg-gold text-gold-foreground hover:bg-gold">
            {product.badge}
          </Badge>
        )}
        <Image
          src={product.images[0]}
          alt={`${product.name} — ${product.subtitle}`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-heading text-lg font-semibold leading-tight">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {product.subtitle}
          </p>
        </Link>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-heading text-lg font-bold">
            {formatPKR(product.price)}
          </span>
          <span className="text-xs text-muted-foreground">{product.size}</span>
        </div>

        <div className="mt-4">
          <QuickAdd product={product} />
        </div>
      </div>
    </div>
  );
}
