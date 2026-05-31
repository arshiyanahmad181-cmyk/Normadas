import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/site/contact-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${siteConfig.name} Cosmetics.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="mb-10 max-w-2xl">
        <p className="font-heading text-sm uppercase tracking-[0.25em] text-gold">
          Get in touch
        </p>
        <h1 className="mt-2 font-heading text-4xl font-bold md:text-5xl">
          Contact Us
        </h1>
        <p className="mt-3 text-muted-foreground">
          Questions about a product or your order? Send us a message — we&apos;re
          happy to help.
        </p>
      </header>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Details */}
        <div className="flex flex-col gap-5">
          <ContactRow icon={<MessageCircle className="size-5" />} label="WhatsApp">
            <Link
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              className="text-gold hover:underline"
            >
              Chat with us
            </Link>
          </ContactRow>
          <ContactRow icon={<Mail className="size-5" />} label="Email">
            {siteConfig.email}
          </ContactRow>
          <ContactRow icon={<Phone className="size-5" />} label="Phone">
            {siteConfig.phone}
          </ContactRow>
          <ContactRow icon={<MapPin className="size-5" />} label="Address">
            {siteConfig.address}
          </ContactRow>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}
