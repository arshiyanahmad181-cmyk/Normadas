"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Wallet, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/components/cart/cart-context";
import { products } from "@/lib/products";
import { formatPKR } from "@/lib/format";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type Method = "whatsapp" | "jazzcash" | "easypaisa";

const methods: {
  id: Method;
  label: string;
  desc: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "whatsapp",
    label: "Order on WhatsApp",
    desc: "Place your order via chat — fastest option.",
    icon: <MessageCircle className="size-5" />,
  },
  {
    id: "jazzcash",
    label: "JazzCash",
    desc: "Transfer to our JazzCash account.",
    icon: <Wallet className="size-5" />,
  },
  {
    id: "easypaisa",
    label: "Easypaisa",
    desc: "Transfer to our Easypaisa account.",
    icon: <Wallet className="size-5" />,
  },
];

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [method, setMethod] = useState<Method>("whatsapp");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  const lines = items
    .map((item) => {
      const product = products.find((p) => p.slug === item.slug);
      return product ? { ...item, product } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function validate() {
    if (lines.length === 0) {
      toast.error("Your cart is empty.");
      return false;
    }
    if (!form.name || !form.phone || !form.address || !form.city) {
      toast.error("Please fill in your name, phone, address and city.");
      return false;
    }
    return true;
  }

  function buildOrderMessage(payVia: string) {
    const itemLines = lines
      .map(
        (l) =>
          `• ${l.qty} × ${l.product.name} — ${formatPKR(
            l.product.price * l.qty
          )}`
      )
      .join("\n");

    return [
      `*New Order — ${siteConfig.name}*`,
      "",
      "*Items:*",
      itemLines,
      "",
      `*Subtotal:* ${formatPKR(subtotal)}`,
      "",
      "*Customer:*",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Address: ${form.address}, ${form.city}`,
      form.notes && `Notes: ${form.notes}`,
      "",
      `*Payment method:* ${payVia}`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  function sendWhatsApp(payVia: string) {
    const text = encodeURIComponent(buildOrderMessage(payVia));
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, "_blank");
  }

  function handleSubmit() {
    if (!validate()) return;

    if (method === "whatsapp") {
      sendWhatsApp("WhatsApp (to be confirmed)");
      toast.success("Opening WhatsApp with your order…");
      return;
    }

    // jazzcash / easypaisa
    const wallet = method === "jazzcash" ? "JazzCash" : "Easypaisa";
    sendWhatsApp(wallet);
    toast.success(
      `Send ${formatPKR(subtotal)} to our ${wallet} account, then share the screenshot on WhatsApp.`
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold">Checkout</h1>
        <p className="mt-3 text-muted-foreground">Your cart is empty.</p>
        <Button asChild className="mt-6">
          <Link href="/skin-care">Browse products</Link>
        </Button>
      </div>
    );
  }

  const wallet =
    method === "jazzcash"
      ? siteConfig.jazzcash
      : method === "easypaisa"
        ? siteConfig.easypaisa
        : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 font-heading text-3xl font-bold md:text-4xl">
        Checkout
      </h1>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Left: details + payment */}
        <div className="lg:col-span-2 space-y-8">
          {/* Customer details */}
          <section>
            <h2 className="mb-4 font-heading text-lg font-semibold">
              Delivery details
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" required>
                <Input value={form.name} onChange={update("name")} placeholder="Your name" />
              </Field>
              <Field label="Phone" required>
                <Input value={form.phone} onChange={update("phone")} placeholder="03xx xxxxxxx" />
              </Field>
              <Field label="Address" required className="sm:col-span-2">
                <Input value={form.address} onChange={update("address")} placeholder="House, street, area" />
              </Field>
              <Field label="City" required>
                <Input value={form.city} onChange={update("city")} placeholder="City" />
              </Field>
              <Field label="Order notes (optional)" className="sm:col-span-2">
                <Textarea value={form.notes} onChange={update("notes")} rows={3} placeholder="Anything we should know?" />
              </Field>
            </div>
          </section>

          {/* Payment method */}
          <section>
            <h2 className="mb-4 font-heading text-lg font-semibold">
              Payment method
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {methods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border p-4 text-left transition-colors",
                    method === m.id
                      ? "border-gold bg-gold/5 ring-1 ring-gold"
                      : "border-border hover:border-foreground/30"
                  )}
                >
                  <span className="text-gold">{m.icon}</span>
                  <span className="flex-1">
                    <span className="flex items-center gap-2 font-medium">
                      {m.label}
                      {method === m.id && <Check className="size-4 text-gold" />}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {m.desc}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            {/* Wallet transfer instructions */}
            {wallet && (
              <div className="mt-4 rounded-xl border border-border bg-secondary/40 p-4 text-sm">
                <p className="font-medium">
                  Transfer {formatPKR(subtotal)} to:
                </p>
                <p className="mt-1 text-muted-foreground">
                  {wallet.accountTitle} — <span className="font-mono">{wallet.accountNumber}</span>
                </p>
                <p className="mt-2 text-muted-foreground">
                  After paying, tap the button below to send your order &
                  payment screenshot to us on WhatsApp.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Right: summary */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <h2 className="font-heading text-lg font-semibold">Your order</h2>
          <ul className="mt-4 space-y-3">
            {lines.map(({ product, qty }) => (
              <li key={product.slug} className="flex justify-between gap-3 text-sm">
                <span className="text-muted-foreground">
                  {qty} × {product.name}
                </span>
                <span>{formatPKR(product.price * qty)}</span>
              </li>
            ))}
          </ul>
          <Separator className="my-4" />
          <div className="flex justify-between">
            <span className="font-medium">Subtotal</span>
            <span className="font-heading text-lg font-bold">
              {formatPKR(subtotal)}
            </span>
          </div>

          <Button
            size="lg"
            className="mt-6 w-full gap-2"
            onClick={handleSubmit}
          >
            <MessageCircle className="size-4" />
            Place Order
          </Button>

          <button
            type="button"
            onClick={clear}
            className="mt-3 w-full text-center text-xs text-muted-foreground hover:text-destructive"
          >
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label>
        {label}
        {required && <span className="text-gold"> *</span>}
      </Label>
      {children}
    </div>
  );
}
