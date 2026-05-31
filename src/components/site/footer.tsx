import Link from "next/link";
import { AtSign, Share2, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <span className="font-heading text-2xl font-bold">
            {siteConfig.name}
          </span>
          <p className="mt-3 max-w-sm text-sm text-background/70">
            {siteConfig.description}
          </p>
          <div className="mt-5 flex gap-4">
            <Link href={siteConfig.socials.instagram} aria-label="Instagram" className="text-background/70 hover:text-gold">
              <AtSign className="size-5" />
            </Link>
            <Link href={siteConfig.socials.facebook} aria-label="Facebook" className="text-background/70 hover:text-gold">
              <Share2 className="size-5" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-widest text-gold">
            Shop
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-background/70">
            <li><Link href="/hair-care" className="hover:text-background">Hair Care</Link></li>
            <li><Link href="/skin-care" className="hover:text-background">Skin Care</Link></li>
            <li><Link href="/about" className="hover:text-background">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-widest text-gold">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-background/70">
            <li className="flex items-center gap-2"><Mail className="size-4" /> {siteConfig.email}</li>
            <li className="flex items-center gap-2"><Phone className="size-4" /> {siteConfig.phone}</li>
            <li className="flex items-center gap-2"><MapPin className="size-4" /> {siteConfig.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-background/50 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {siteConfig.name} Cosmetics. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
