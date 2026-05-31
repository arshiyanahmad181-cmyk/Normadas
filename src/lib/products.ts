/**
 * Product catalogue. Prices are in PKR.
 *
 * 👉 Images live in /public/products/. The exact filenames each photo must be
 *    saved as are listed in /public/products/README.txt.
 */

export type Category = "hair" | "skin";

export interface Product {
  slug: string;
  name: string;
  subtitle: string;
  category: Category;
  price: number;
  size: string;
  tagline: string;
  description: string;
  highlights: string[];
  howToUse: string;
  ingredients?: string;
  /** First image is the primary/thumbnail; the rest form the gallery. */
  images: string[];
  badge?: string;
  /** Search terms used for per-page SEO keywords. */
  keywords?: string[];
}

export const products: Product[] = [
  // ───────────────────────────── HAIR CARE ─────────────────────────────
  {
    slug: "stemcy-stem-cell-activator",
    name: "STEMCY",
    subtitle: "Stem Cell Activator — Hair Growth Serum",
    category: "hair",
    price: 38000,
    size: "50 ml (1.69 fl oz)",
    tagline: "Our flagship hair growth serum, powered by stem cell technology.",
    description:
      "STEMCY is Normadas' premium Stem Cell Activator hair growth serum. Engineered to reawaken dormant follicles, it controls hair fall at the root while stimulating fresh regrowth for visibly thicker, denser hair. With consistent use it speeds up the natural growth cycle and fortifies each strand from root to tip.",
    highlights: [
      "Controls hair fall",
      "Stimulates hair regrowth",
      "Increases hair density",
      "Speeds up hair growth",
      "Strengthens roots",
    ],
    howToUse:
      "Shake well before use. Apply 20 drops (1 ml) directly to the scalp and massage gently in circular motions for better absorption. Leave on overnight. Use on alternate days for a few months for optimal regrowth.",
    ingredients:
      "Capixyl, Saw Palmetto, Redensyl, Procapil, AnaGain, Baicapil, Biotin, Rosemary Extract, Hydrogenated Castor Oil, KY-19232 Stem Cell Activator & JXL069.",
    images: ["/products/stemcy-1.png", "/products/stemcy-2.png"],
    badge: "Bestseller",
    keywords: [
      "hair growth serum",
      "stem cell hair serum",
      "hair fall control serum",
      "anti hair fall serum Pakistan",
      "Normadas STEMCY",
    ],
  },
  {
    slug: "stem-cell-activator-hair-revital",
    name: "Stem Cell Activator",
    subtitle: "Hair Revital Serum — Hair Growth Serum",
    category: "hair",
    price: 15000,
    size: "40 ml (1.35 fl oz)",
    tagline: "Daily revitalising serum for fuller, stronger hair.",
    description:
      "The Stem Cell Activator Hair Revital Serum delivers a concentrated dose of growth-supporting actives to thinning, weakened hair. It helps control hair fall, encourages regrowth and improves density, leaving roots stronger and hair noticeably more resilient.",
    highlights: [
      "Controls hair fall",
      "Stimulates hair regrowth",
      "Increases hair density",
      "Speeds up hair growth",
      "Strengthens roots",
    ],
    howToUse:
      "Optionally use a derma roller (0.5 mm) on the scalp for 1–2 minutes first. Apply 20 drops directly to the scalp and massage gently in circular motions for better absorption. Leave on overnight. Use daily for best results.",
    ingredients:
      "Capixyl, Saw Palmetto, Redensyl, Procapil, AnaGain, Baicapil, Biotin, Rosemary Extract, Hydrogenated Castor Oil — in concentrations designed to normalise hair diameter and help stabilise hair loss.",
    images: ["/products/stem-cell-1.png", "/products/stem-cell-2.png"],
    keywords: [
      "hair growth serum",
      "hair revital serum",
      "stem cell activator serum",
      "anti hair fall serum",
    ],
  },
  {
    slug: "redensyl-forte-dry-hair-oil",
    name: "Redensyl Forte",
    subtitle: "Dry Hair Oil — 3% Redensyl",
    category: "hair",
    price: 2480,
    size: "30 ml (1.01 fl oz)",
    tagline: "Stronger hair starts here.",
    description:
      "A lightweight, non-greasy dry hair oil powered by 3% Redensyl — a clinically studied actor in the fight against hair thinning. Suitable for men and women, it absorbs quickly without weighing hair down and works to strengthen hair from the root for healthier, fuller-looking density.",
    highlights: [
      "Suitable for men & women",
      "Non-greasy & lightweight",
      "Strengthens hair from the root",
      "Targets hair thinning & hair fall",
    ],
    howToUse:
      "Apply 20 drops (1 ml) directly to the scalp using the dropper and massage gently with fingertips for better absorption. Leave on overnight or for several hours — no need to rinse. Use 5–6 times per week for best results.",
    ingredients:
      "Redensyl, Biotin, Rosemary Extract, Vitamin B5 (Panthenol), Butylene Glycol, Larix Europaea Wood Extract, Hydrogenated Castor Oil, Camellia Sinensis Leaf Extract, Argan Oil, Pisum Sativum (Pea) Extract, Calcium Gluconate, Sodium Benzoate, Phenoxyethanol.",
    images: [
      "/products/redensyl-1.png",
      "/products/redensyl-2.png",
      "/products/redensyl-3.png",
    ],
    keywords: [
      "redensyl hair oil",
      "dry hair oil",
      "hair growth oil",
      "redensyl 3% oil",
      "anti hair fall oil Pakistan",
    ],
  },

  // ───────────────────────────── SKIN CARE ─────────────────────────────
  {
    slug: "skin-revital-vitamin-c-serum",
    name: "Skin Revital",
    subtitle: "Vit C Booster — Vitamin C Facial Serum",
    category: "skin",
    price: 3450,
    size: "30 ml",
    tagline: "Brighten, even and defend your complexion.",
    description:
      "A potent Vitamin C facial serum that defends against environmental damage while diminishing hyperpigmentation. Formulated with Alpha Arbutin and Hyaluronic Acid, it improves the appearance of fine lines, wrinkles and loss of firmness, brightening the skin's complexion for a radiant, even glow.",
    highlights: [
      "Brightens & evens skin tone",
      "With Alpha Arbutin & Hyaluronic Acid",
      "Reduces hyperpigmentation",
      "Anti-aging — softens fine lines & wrinkles",
    ],
    howToUse:
      "After cleansing, apply 3–4 drops to the face and neck in the morning and/or evening. Follow with moisturiser. Always use sunscreen during the day.",
    ingredients:
      "Aqua, Ascorbic Acid (20% Vitamin C), Alpha Arbutin, Sodium Hyaluronate (Hyaluronic Acid), Niacinamide, Glycerin, Propylene Glycol, Phenoxyethanol.",
    images: ["/products/vitamin-c-1.png", "/products/vitamin-c-2.png"],
    badge: "New",
    keywords: [
      "vitamin c serum",
      "vitamin c face serum",
      "alpha arbutin serum",
      "skin brightening serum",
      "anti aging serum Pakistan",
    ],
  },
  {
    slug: "sun-ban-mineral-sunscreen",
    name: "Sun Ban",
    subtitle: "Mineral Sunscreen — Broad Spectrum SPF 60 PA+++",
    category: "skin",
    price: 3800,
    size: "100 ml (3.38 fl oz)",
    tagline: "Daily broad-spectrum protection, zero white cast.",
    description:
      "Sun Ban is a broad-spectrum mineral sunscreen and sun block offering SPF 60 PA+++ defence against UVA and UVB rays. This lightweight sunblock blends seamlessly into all skin types, leaving no white cast. Non-greasy and water resistant, it's the perfect everyday sunscreen for healthy, protected skin.",
    highlights: [
      "Broad spectrum SPF 60 PA+++",
      "UVA / UVB protection",
      "No white cast — blends seamlessly",
      "Non-greasy & water resistant",
      "Suitable for all skin types",
    ],
    howToUse:
      "Apply generously to the face and exposed skin 15 minutes before sun exposure. Reapply every 2 hours, or after swimming or sweating.",
    ingredients:
      "Deionised Water, C12-15 Alkyl Benzoate, Zinc Oxide, Titanium Dioxide, Niacinamide, Hyaluronic Acid, Glycerin, Tocopheryl Acetate (Vitamin E), Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Caprylic/Capric Triglyceride, Coconut Alkanes, Cetostearyl Alcohol, EGMS, PEG, Hydroxypropyl Methylcellulose, Dimethicone, Glyceryl Monostearate, Ceteareth-20, Phenoxyethanol.",
    images: ["/products/sun-ban-1.png", "/products/sun-ban-2.png"],
    keywords: [
      "sunblock",
      "sun block",
      "sunscreen",
      "mineral sunscreen",
      "SPF 60 sunscreen",
      "broad spectrum sunscreen Pakistan",
    ],
  },
  {
    slug: "revitalizing-elixir-retinol",
    name: "Revitalizing Elixir",
    subtitle: "Retinol Night Cream",
    category: "skin",
    price: 2900,
    size: "30 ml (1 fl oz)",
    tagline: "Firm, smooth and brighten while you sleep.",
    description:
      "Revitalizing Elixir is a retinol night cream formulated with squalane and niacinamide. Working overnight, it firms the skin, softens the look of wrinkles and brightens the complexion. Suitable for anyone aged 25 and above looking to support youthful, resilient skin.",
    highlights: [
      "Retinol night cream",
      "With squalane & niacinamide",
      "Firming & anti-wrinkle",
      "Brightening",
    ],
    howToUse:
      "Apply a thin layer to clean, dry skin at night. Always patch test before first use. Follow with sunscreen in the morning. Not to be used by pregnant or breastfeeding women. For external use only.",
    ingredients:
      "Water (Aqua), Retinol (Vitamin A), Niacinamide (Vitamin B3), Aloe Barbadensis, Vitamin E (Tocopherol), Hyaluronic Acid, Glyceryl Monostearate, Squalane, Jojoba Oil, Avocado Oil, Tea Tree Oil, Ceramides (NP, AP, EOP), Licorice, Caprylic/Capric Triglyceride, Panthenol, Sodium Hyaluronate, Propylene Glycol, Tripeptide, Phenoxyethanol, Ethylhexylglycerin.",
    images: [
      "/products/retinol-1.png",
      "/products/retinol-2.png",
      "/products/retinol-3.png",
    ],
    keywords: [
      "retinol night cream",
      "retinol cream",
      "anti wrinkle cream",
      "niacinamide cream",
      "retinol cream Pakistan",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}
