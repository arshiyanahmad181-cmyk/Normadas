import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronLeft } from "lucide-react";
import { products, getProduct } from "@/lib/products";
import { formatPKR } from "@/lib/format";
import { siteConfig } from "@/lib/site";
import { ProductGallery } from "@/components/site/product-gallery";
import { AddToCart } from "@/components/site/add-to-cart";
import { ProductCard } from "@/components/site/product-card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} — ${product.subtitle}`,
    description: `${product.tagline} ${product.description}`.slice(0, 160),
    keywords: product.keywords,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      type: "website",
      title: `${product.name} — ${product.subtitle}`,
      description: product.tagline,
      url: `/products/${product.slug}`,
      images: product.images.map((url) => ({ url })),
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  const categoryHref =
    product.category === "hair" ? "/hair-care" : "/skin-care";
  const categoryLabel = product.category === "hair" ? "Hair Care" : "Skin Care";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} — ${product.subtitle}`,
    image: product.images.map((i) => `${siteConfig.url}${i}`),
    description: product.description,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "PKR",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/products/${product.slug}`,
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href={categoryHref}
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" /> Back to {categoryLabel}
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery
          images={product.images}
          alt={`${product.name} — ${product.subtitle}`}
        />

        <div className="flex flex-col">
          {product.badge && (
            <Badge className="mb-3 w-fit bg-gold text-gold-foreground hover:bg-gold">
              {product.badge}
            </Badge>
          )}
          <h1 className="font-heading text-3xl font-bold md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-1 text-muted-foreground">{product.subtitle}</p>

          <div className="mt-4 flex items-center gap-3">
            <span className="font-heading text-2xl font-bold">
              {formatPKR(product.price)}
            </span>
            <span className="text-sm text-muted-foreground">
              · {product.size}
            </span>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-foreground/80">
            {product.description}
          </p>

          <h2 className="mt-6 font-heading font-semibold">Benefits</h2>
          <ul className="mt-3 grid gap-2">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm">
                <Check className="size-4 text-gold" /> {h}
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <AddToCart product={product} />
          </div>

          <Separator className="my-7" />

          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-heading font-semibold">How to use</h3>
              <p className="mt-1 text-muted-foreground">{product.howToUse}</p>
            </div>
            {product.ingredients && (
              <div>
                <h3 className="font-heading font-semibold">Ingredients</h3>
                <p className="mt-1 text-muted-foreground">
                  {product.ingredients}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 font-heading text-2xl font-bold">
            You may also like
          </h2>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
