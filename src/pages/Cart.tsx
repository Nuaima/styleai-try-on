import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { formatPKR } from "@/data/products";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

const SHIPPING_THRESHOLD = 5000;
const SHIPPING_FEE = 250;

const Cart = () => {
  const { items, updateQty, remove, subtotal } = useCart();
  const shipping = subtotal === 0 ? 0 : subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container py-24 text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" strokeWidth={1.2} />
          <h1 className="mt-6 font-display text-4xl">Your cart is empty</h1>
          <p className="mt-3 text-muted-foreground">Find something you love.</p>
          <Link
            to="/collection"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 font-medium text-primary-foreground transition-smooth hover:bg-primary/90"
          >
            Browse the collection →
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-12 lg:py-16">
        <h1 className="mb-8 font-display text-4xl md:text-5xl">Your Cart</h1>

        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="flex gap-4 rounded-sm bg-card p-4 shadow-card">
                <Link to={`/product/${item.product.id}`} className="block h-28 w-24 shrink-0 overflow-hidden rounded-sm bg-muted">
                  <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link to={`/product/${item.product.id}`} className="font-display text-lg hover:text-accent">
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {item.product.category} · Size {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => remove(item.product.id, item.size)}
                      className="rounded-sm p-1.5 text-muted-foreground transition-smooth hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="inline-flex items-center rounded-sm border border-border">
                      <button
                        onClick={() => updateQty(item.product.id, item.size, item.quantity - 1)}
                        className="grid h-9 w-9 place-items-center transition-smooth hover:bg-muted"
                        aria-label="Decrease"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.product.id, item.size, item.quantity + 1)}
                        className="grid h-9 w-9 place-items-center transition-smooth hover:bg-muted"
                        aria-label="Increase"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="font-display text-lg font-semibold">
                      {formatPKR(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-sm bg-secondary/50 p-6 shadow-card">
            <h2 className="font-display text-2xl">Order Summary</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium">{formatPKR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="font-medium">{shipping === 0 ? "Free" : formatPKR(shipping)}</dd>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground">
                  Add {formatPKR(SHIPPING_THRESHOLD - subtotal)} more for free shipping.
                </p>
              )}
              <div className="border-t border-border pt-3">
                <div className="flex justify-between text-base">
                  <dt className="font-display">Total</dt>
                  <dd className="font-display font-semibold">{formatPKR(total)}</dd>
                </div>
              </div>
            </dl>

            <Link
              to="/checkout"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-soft transition-smooth hover:bg-primary/90"
            >
              Checkout →
            </Link>
            <Link
              to="/collection"
              className="mt-3 block text-center text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
