import { Wallet, ShoppingBag, Users, Receipt, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatPKR } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  kpis, kpiTrends, monthlyRevenue, categoryRevenue, topProducts, recentOrders, periodLabel,
  type OrderStatus,
} from "@/lib/admin-data";
import { RevenueChart, CategoryDonut } from "@/components/admin/charts";

const statusStyles: Record<OrderStatus, string> = {
  Delivered: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Shipped: "bg-blue-50 text-blue-700 ring-blue-600/20",
  Processing: "bg-amber-50 text-amber-700 ring-amber-600/20",
  "COD Pending": "bg-neutral-100 text-neutral-700 ring-neutral-500/20",
  Cancelled: "bg-rose-50 text-rose-700 ring-rose-600/20",
};

const kpiCards = [
  { label: "Total Revenue", value: formatPKR(kpis.revenue), trend: kpiTrends.revenue, icon: Wallet },
  { label: "Orders", value: kpis.orders.toLocaleString("en-PK"), trend: kpiTrends.orders, icon: ShoppingBag },
  { label: "Customers", value: kpis.customers.toLocaleString("en-PK"), trend: kpiTrends.customers, icon: Users },
  { label: "Avg. Order Value", value: formatPKR(kpis.aov), trend: kpiTrends.aov, icon: Receipt },
];

export default function AdminDashboard() {
  const maxTop = Math.max(...topProducts.map((p) => p.revenue));

  return (
    <div className="space-y-6">
      {/* ───── KPI cards ───── */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((k, i) => {
          const Icon = k.icon;
          const up = k.trend >= 0;
          return (
            <div
              key={k.label}
              className="admin-rise rounded-xl bg-card p-5 ring-1 ring-foreground/10"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-lg bg-gold/15 text-gold">
                  <Icon className="size-5" />
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                    up ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700",
                  )}
                >
                  {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                  {Math.abs(k.trend)}%
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{k.label}</p>
              <p className="mt-1 font-heading text-2xl font-bold tracking-tight">{k.value}</p>
            </div>
          );
        })}
      </div>

      {/* ───── Revenue chart + category donut ───── */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl bg-card p-5 ring-1 ring-foreground/10 lg:col-span-2">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="font-heading text-base font-semibold">Revenue</h2>
              <p className="text-xs text-muted-foreground">{periodLabel}</p>
            </div>
            <span className="font-heading text-lg font-bold">{formatPKR(kpis.revenue)}</span>
          </div>
          <RevenueChart data={monthlyRevenue} />
        </div>

        <div className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-base font-semibold">Sales by Category</h2>
          <p className="mb-5 text-xs text-muted-foreground">Revenue share</p>
          <CategoryDonut hair={categoryRevenue.hair} skin={categoryRevenue.skin} />
        </div>
      </div>

      {/* ───── Recent orders + top products ───── */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl bg-card ring-1 ring-foreground/10 lg:col-span-2">
          <div className="flex items-center justify-between p-5 pb-3">
            <h2 className="font-heading text-base font-semibold">Recent Orders</h2>
            <span className="text-xs text-muted-foreground">{recentOrders.length} latest</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-y text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-2.5 font-medium">Order</th>
                  <th className="px-5 py-2.5 font-medium">Customer</th>
                  <th className="px-5 py-2.5 font-medium">Amount</th>
                  <th className="px-5 py-2.5 font-medium">Status</th>
                  <th className="px-5 py-2.5 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b last:border-0 hover:bg-muted/40">
                    <td className="px-5 py-3">
                      <div className="font-medium">#{o.id}</div>
                      <div className="max-w-[180px] truncate text-xs text-muted-foreground">{o.product}</div>
                    </td>
                    <td className="px-5 py-3">
                      <div>{o.customer}</div>
                      <div className="text-xs text-muted-foreground">{o.city}</div>
                    </td>
                    <td className="px-5 py-3 font-medium tabular-nums">{formatPKR(o.amount)}</td>
                    <td className="px-5 py-3">
                      <span className={cn("inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset", statusStyles[o.status])}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-muted-foreground">{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-base font-semibold">Top Products</h2>
          <p className="mb-5 text-xs text-muted-foreground">By revenue</p>
          <div className="space-y-4">
            {topProducts.map((p, i) => (
              <div key={p.name}>
                <div className="mb-1.5 flex items-baseline justify-between gap-2 text-sm">
                  <span className="truncate font-medium">{p.name}</span>
                  <span className="shrink-0 tabular-nums text-muted-foreground">{formatPKR(p.revenue)}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="admin-grow-x h-full rounded-full bg-gold"
                    style={{ width: `${(p.revenue / maxTop) * 100}%`, animationDelay: `${i * 80}ms` }}
                  />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {p.units} units · {p.category === "hair" ? "Hair Care" : "Skin Care"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Showing sample analytics for demonstration · connect a database to display live orders.
      </p>
    </div>
  );
}
