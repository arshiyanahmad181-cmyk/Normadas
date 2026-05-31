import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { CartProvider } from "@/components/cart/cart-context";
import { CartSheet } from "@/components/cart/cart-sheet";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { StoreChrome } from "@/components/site/store-chrome";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Vitamin C Serum, Sunblock & Hair Growth Serum`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Shop Normadas premium skin & hair care: Vitamin C serum, Sun Ban SPF 60 sunblock, retinol night cream, and stem-cell hair growth serums & Redensyl hair oil. Delivery across Pakistan.",
  keywords: [
    "vitamin c serum",
    "sunblock",
    "sunscreen",
    "SPF 60 sunscreen",
    "hair growth serum",
    "retinol night cream",
    "redensyl hair oil",
    "skin care Pakistan",
    "hair care Pakistan",
    "Normadas",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Premium Hair & Skin Care`,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Premium Hair & Skin Care`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <StoreChrome navbar={<Navbar />} footer={<Footer />}>
            {children}
          </StoreChrome>
          <CartSheet />
          <Toaster position="top-center" />
        </CartProvider>
      </body>
    </html>
  );
}
