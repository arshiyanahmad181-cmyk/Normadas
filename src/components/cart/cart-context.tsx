"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products } from "@/lib/products";

export interface CartItem {
  slug: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (slug: string, qty?: number) => void;
  removeItem: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  totalItems: number;
  subtotal: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "normadas-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  // Persist on change (after initial hydration).
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = (slug: string, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === slug ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { slug, qty }];
    });
  };

  const removeItem = (slug: string) =>
    setItems((prev) => prev.filter((i) => i.slug !== slug));

  const setQty = (slug: string, qty: number) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, qty } : i))
    );

  const clear = () => setItems([]);

  const { totalItems, subtotal } = useMemo(() => {
    let totalItems = 0;
    let subtotal = 0;
    for (const item of items) {
      const product = products.find((p) => p.slug === item.slug);
      if (!product) continue;
      totalItems += item.qty;
      subtotal += product.price * item.qty;
    }
    return { totalItems, subtotal };
  }, [items]);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    setQty,
    clear,
    totalItems,
    subtotal,
    isOpen,
    setOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
