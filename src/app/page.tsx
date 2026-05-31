import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Truck, ShieldCheck, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/product-card";
import { products, getProductsByCategory } from "@/lib/products";
import { siteConfig } from "@/lib/site";

const hairHero = getProductsByCategory("hair")[0];
const skinHero = getProductsByCategory("skin")[0];
const featured = products.slice(0, 4);

export default function Home() {
  return (
    <>
      {/* ───────────────────── Hero ───────────────────── */}
      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="pointer-events-none absolute left-1/2 top-0 size-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-gold/20 blur-[120px]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 md:py-32 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-background/20 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-gold">
            <Sparkles className="size-3.5" /> Premium Cosmetics
          </span>
          <h1 className="mt-6 font-heading text-5xl font-bold leading-[1.05] md:text-7xl">
            Reveal Your
            <br />
            <span className="text-gold-gradient">Natural Radiance</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-background/70 md:text-lg">
            {siteConfig.name} crafts premium hair and skin care — clinically
            inspired formulas designed to bring out your healthiest, most
            confident self.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/skin-care">
                Shop Skin Care <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-background/30 bg-transparent text-background hover:bg-background hover:text-foreground"
            >
              <Link href="/hair-care">Shop Hair Care</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ───────────────────── Categories ───────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <CategoryCard
            href="/hair-care"
            title="Hair Care"
            copy="Serums & oils for fuller, stronger hair."
            image={hairHero.images[0]}
            alt={hairHero.name}
          />
          <CategoryCard
            href="/skin-care"
            title="Skin Care"
            copy="Brighten, protect and renew your skin."
            image={skinHero.images[0]}
            alt={skinHero.name}
          />
        </div>
      </section>

      {/* ───────────────────── Featured ───────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-heading text-sm uppercase tracking-[0.25em] text-gold">
              Bestsellers
            </p>
            <h2 className="mt-1 font-heading text-3xl font-bold md:text-4xl">
              Featured Products
            </h2>
          </div>
          <Link
            href="/skin-care"
            className="hidden items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground sm:flex"
          >
            View all <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* ───────────────────── Promise strip ───────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-2xl border border-border bg-secondary/50 p-8 sm:grid-cols-3">
          <Promise icon={<Truck className="size-6" />} title="Fast Delivery" copy="Nationwide shipping across Pakistan." />
          <Promise icon={<ShieldCheck className="size-6" />} title="Authentic Formulas" copy="Genuine, quality-tested products." />
          <Promise icon={<Leaf className="size-6" />} title="Made for You" copy="Care for every hair & skin type." />
        </div>
      </section>
    </>
  );
}

function CategoryCard({
  href,
  title,
  copy,
  image,
  alt,
}: {
  href: string;
  title: string;
  copy: string;
  image: string;
  alt: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-border bg-secondary/40 p-8 transition-shadow hover:shadow-lg"
    >
      <div className="relative z-10 max-w-[55%]">
        <h3 className="font-heading text-2xl font-bold md:text-3xl">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-gold">
          Shop now <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
      <div className="relative h-36 w-36 shrink-0 md:h-44 md:w-44">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="200px"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </Link>
  );
}

function Promise({
  icon,
  title,
  copy,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="text-gold">{icon}</div>
      <h4 className="font-heading font-semibold">{title}</h4>
      <p className="text-sm text-muted-foreground">{copy}</p>
    </div>
  );
}
