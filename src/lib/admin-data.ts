import { products } from "@/lib/products";

/**
 * SAMPLE analytics data for the admin dashboard.
 *
 * Everything here is DETERMINISTIC (no Math.random), so the server and client
 * render identical markup — no hydration mismatches.
 *
 * 👉 This is demo data so the client can SEE the dashboard. To show REAL orders,
 *    replace these exports with data fetched from a database (e.g. Supabase) or
 *    your order-notification store — the dashboard UI stays exactly the same.
 */

export const periodLabel = "Last 12 months";

/** Headline revenue trend (PKR), oldest → newest. */
export const monthlyRevenue: { month: string; revenue: number }[] = [
  { month: "Jun", revenue: 412000 },
  { month: "Jul", revenue: 388000 },
  { month: "Aug", revenue: 465000 },
  { month: "Sep", revenue: 521000 },
  { month: "Oct", revenue: 498000 },
  { month: "Nov", revenue: 612000 },
  { month: "Dec", revenue: 845000 },
  { month: "Jan", revenue: 567000 },
  { month: "Feb", revenue: 634000 },
  { month: "Mar", revenue: 712000 },
  { month: "Apr", revenue: 689000 },
  { month: "May", revenue: 798000 },
];

/** Units sold per product (keyed by slug). */
const unitsSold: Record<string, number> = {
  "stemcy-stem-cell-activator": 70,
  "stem-cell-activator-hair-revital": 95,
  "redensyl-forte-dry-hair-oil": 280,
  "skin-revital-vitamin-c-serum": 240,
  "sun-ban-mineral-sunscreen": 230,
  "revitalizing-elixir-retinol": 200,
};

export const topProducts = products
  .map((p) => ({
    name: p.name,
    category: p.category,
    units: unitsSold[p.slug] ?? 0,
    revenue: (unitsSold[p.slug] ?? 0) * p.price,
  }))
  .sort((a, b) => b.revenue - a.revenue);

export const categoryRevenue = {
  hair: topProducts.filter((p) => p.category === "hair").reduce((s, p) => s + p.revenue, 0),
  skin: topProducts.filter((p) => p.category === "skin").reduce((s, p) => s + p.revenue, 0),
};

export const totalRevenue = monthlyRevenue.reduce((s, m) => s + m.revenue, 0);

export const kpis = {
  revenue: totalRevenue,
  orders: 980,
  customers: 760,
  aov: Math.round(totalRevenue / 980),
};

/** Percentage change vs the previous period (for the little trend pills). */
export const kpiTrends = { revenue: 12.4, orders: 8.1, customers: 15.2, aov: 3.9 };

export type OrderStatus =
  | "Delivered"
  | "Shipped"
  | "Processing"
  | "COD Pending"
  | "Cancelled";

export const recentOrders: {
  id: string;
  customer: string;
  city: string;
  product: string;
  amount: number;
  status: OrderStatus;
  date: string;
}[] = [
  { id: "NRM-2041", customer: "Ayesha Khan", city: "Lahore", product: "STEMCY Stem Cell Activator", amount: 38000, status: "Delivered", date: "May 28" },
  { id: "NRM-2040", customer: "Bilal Ahmed", city: "Karachi", product: "Sun Ban Sunscreen ×2", amount: 7600, status: "Processing", date: "May 28" },
  { id: "NRM-2039", customer: "Fatima Noor", city: "Islamabad", product: "Skin Revital Vit C Serum", amount: 3450, status: "Delivered", date: "May 27" },
  { id: "NRM-2038", customer: "Hamza Sheikh", city: "Rawalpindi", product: "Redensyl Forte Oil ×2", amount: 4960, status: "COD Pending", date: "May 27" },
  { id: "NRM-2037", customer: "Zara Malik", city: "Faisalabad", product: "Revitalizing Elixir", amount: 2900, status: "Delivered", date: "May 26" },
  { id: "NRM-2036", customer: "Usman Tariq", city: "Multan", product: "Stem Cell Revital Serum", amount: 15000, status: "Shipped", date: "May 26" },
  { id: "NRM-2035", customer: "Hina Raza", city: "Lahore", product: "STEMCY Stem Cell Activator", amount: 38000, status: "Delivered", date: "May 25" },
  { id: "NRM-2034", customer: "Omar Farooq", city: "Sialkot", product: "Sun Ban Sunscreen", amount: 3800, status: "Cancelled", date: "May 25" },
];
