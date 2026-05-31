/**
 * Central store configuration.
 *
 * 👉 EDIT THE PLACEHOLDER VALUES BELOW with your real details.
 *    Phone numbers for WhatsApp must be in international format with NO
 *    "+", spaces or dashes — e.g. Pakistan 0300 1234567 becomes "923001234567".
 */
export const siteConfig = {
  name: "Normadas",
  tagline: "Cosmetics",
  description:
    "Normadas Cosmetics — premium hair and skin care, formulated to bring out your natural glow.",

  // Public website URL — used for SEO (sitemap, canonical links, social cards).
  url: "https://normadas.com", // <-- EDIT to your real domain once deployed

  // Used by the "Order on WhatsApp" checkout flow (works immediately).
  whatsappNumber: "923334308888", // WhatsApp business number (intl format, no +)

  email: "info@normadas.com",
  phone: "+92 333 4308888", // display only
  address: "Lahore, Pakistan", // <-- EDIT

  socials: {
    instagram: "https://instagram.com/normadas", // <-- EDIT
    facebook: "https://facebook.com/normadas", // <-- EDIT
    tiktok: "https://tiktok.com/@normadas", // <-- EDIT
  },

  // Manual mobile-wallet transfer details shown at checkout.
  jazzcash: {
    accountTitle: "Normadas Cosmetics", // <-- EDIT
    accountNumber: "0300-0000000", // <-- EDIT
  },
  easypaisa: {
    accountTitle: "Normadas Cosmetics", // <-- EDIT
    accountNumber: "0300-0000000", // <-- EDIT
  },
};

export type SiteConfig = typeof siteConfig;
