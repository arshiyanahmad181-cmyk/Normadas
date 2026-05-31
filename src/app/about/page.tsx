import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical, HeartHandshake, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} Cosmetics — premium hair and skin care made in Pakistan.`,
};

export default function AboutPage() {
  return (
    <div>
      {/* Intro */}
      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="pointer-events-none absolute right-0 top-0 size-[400px] translate-x-1/3 -translate-y-1/3 rounded-full bg-gold/20 blur-[100px]" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="font-heading text-sm uppercase tracking-[0.25em] text-gold">
            Our Story
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold md:text-5xl">
            Beauty, Backed by Science
          </h1>
          <p className="mt-5 text-background/70">
            {siteConfig.name} Cosmetics was born from a simple belief: that
            everyone deserves access to effective, premium-quality care for
            their hair and skin. We blend clinically-inspired actives with
            elegant formulations to deliver results you can see and feel.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <Value
            icon={<FlaskConical className="size-6" />}
            title="Effective Formulas"
            copy="From Redensyl and stem-cell actives to Vitamin C and retinol — every product is built around ingredients that work."
          />
          <Value
            icon={<HeartHandshake className="size-6" />}
            title="Honest Care"
            copy="Clear ingredient lists, real benefits and no empty promises. We make products we'd use ourselves."
          />
          <Value
            icon={<Sparkles className="size-6" />}
            title="For Every You"
            copy="Whether it's hair growth or radiant skin, our range is designed to suit a wide variety of hair and skin types."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-secondary/50 px-6 py-12 text-center">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">
            Ready to start your ritual?
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/skin-care">
                Explore Skin Care <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/hair-care">Explore Hair Care</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Value({
  icon,
  title,
  copy,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex size-12 items-center justify-center rounded-lg bg-gold/15 text-gold">
        {icon}
      </div>
      <h3 className="mt-4 font-heading text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
    </div>
  );
}
