import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { formatPKR } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const SHIPPING_THRESHOLD = 5000;
const SHIPPING_FEE = 250;

const Checkout = () => {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    shipping_address: "",
    city: "",
  });

  const shipping = subtotal === 0 ? 0 : subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container py-24 text-center">
          <h1 className="font-display text-3xl">Nothing to checkout</h1>
          <Link to="/collection" className="mt-4 inline-block text-accent underline">
            Browse the collection →
          </Link>
        </main>
      </div>
    );
  }

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderItems = items.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        size: i.size,
        quantity: i.quantity,
        price: i.product.price,
      }));

      const { data, error } = await supabase
        .from("orders")
        .insert({
          ...form,
          items: orderItems,
          total_amount: total,
        })
        .select("id")
        .single();

      if (error) throw error;
      toast.success("Order placed! 🎉");
      clear();
      navigate(`/order-success?id=${data.id}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message ?? "Could not place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none transition-smooth focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-12 lg:py-16">
        <h1 className="mb-8 font-display text-4xl md:text-5xl">Checkout</h1>

        <form onSubmit={placeOrder} className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-6 rounded-sm bg-card p-6 shadow-card md:p-8">
            <div>
              <h2 className="font-display text-2xl">Contact</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider">Full name</label>
                  <input required value={form.customer_name} onChange={onChange("customer_name")} className={inputCls} placeholder="Ayesha Khan" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider">Email</label>
                  <input required type="email" value={form.customer_email} onChange={onChange("customer_email")} className={inputCls} placeholder="you@example.com" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider">Phone</label>
                  <input required value={form.customer_phone} onChange={onChange("customer_phone")} className={inputCls} placeholder="+92 300 1234567" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl">Shipping</h2>
              <div className="mt-4 grid gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider">Address</label>
                  <textarea required rows={3} value={form.shipping_address} onChange={onChange("shipping_address")} className={inputCls} placeholder="House #, Street, Area" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider">City</label>
                  <input required value={form.city} onChange={onChange("city")} className={inputCls} placeholder="Karachi" />
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-accent/30 bg-accent/10 p-4 text-sm">
              <p className="flex items-center gap-2 font-medium">
                <ShieldCheck className="h-4 w-4 text-accent" /> Cash on Delivery
              </p>
              <p className="mt-1 text-muted-foreground">
                Pay in cash when your order arrives. Available across Pakistan.
              </p>
            </div>
          </div>

          <aside className="h-fit space-y-4 rounded-sm bg-secondary/50 p-6 shadow-card">
            <h2 className="font-display text-2xl">Your Order</h2>
            <ul className="space-y-3">
              {items.map((i) => (
                <li key={`${i.product.id}-${i.size}`} className="flex items-center gap-3 text-sm">
                  <div className="h-14 w-12 shrink-0 overflow-hidden rounded-sm bg-muted">
                    <img src={i.product.image} alt={i.product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium leading-tight">{i.product.name}</p>
                    <p className="text-xs text-muted-foreground">Size {i.size} · Qty {i.quantity}</p>
                  </div>
                  <span className="font-medium">{formatPKR(i.product.price * i.quantity)}</span>
                </li>
              ))}
            </ul>

            <dl className="space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatPKR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd>{shipping === 0 ? "Free" : formatPKR(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base">
                <dt className="font-display">Total</dt>
                <dd className="font-display font-semibold">{formatPKR(total)}</dd>
              </div>
            </dl>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-soft transition-smooth hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Placing order…</> : "Place Order"}
            </button>
          </aside>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
