import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { products, formatPKR } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Sparkles, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

const SIZES = ["XS", "S", "M", "L", "XL"];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const { add } = useCart();
  const [size, setSize] = useState("M");

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-32 text-center">
          <h1 className="font-display text-3xl">Product not found</h1>
          <Link to="/collection" className="mt-4 inline-block text-accent underline">
            Back to collection
          </Link>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    add(product, size, 1);
    toast.success(`${product.name} (${size}) added to cart`);
  };

  const handleBuyNow = () => {
    add(product, size, 1);
    navigate("/cart");
  };

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-12 lg:py-16">
        <Link to="/collection" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to collection
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-sm bg-card shadow-card">
            <img src={product.image} alt={product.name} className="aspect-[4/5] w-full object-cover" />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
                {product.category}
              </span>
              <h1 className="mt-2 font-display text-4xl md:text-5xl">{product.name}</h1>
              <p className="mt-3 font-display text-2xl font-semibold">{formatPKR(product.price)}</p>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-wider">Size</p>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`grid h-11 w-11 place-items-center rounded-sm border text-sm font-medium transition-smooth ${
                      size === s
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-card hover:border-accent/50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleBuyNow}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-soft transition-smooth hover:bg-primary/90"
              >
                <ShoppingBag className="h-4 w-4" /> Buy Now
              </button>
              <button
                onClick={handleAdd}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm border border-primary/30 px-6 py-3.5 font-medium transition-smooth hover:bg-primary/5"
              >
                Add to Cart
              </button>
            </div>

            <Link
              to={`/try-on?product=${product.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-accent/40 bg-accent/10 px-6 py-3.5 font-medium text-foreground transition-smooth hover:bg-accent/20"
            >
              <Sparkles className="h-4 w-4 text-accent" /> Try It On Virtually
            </Link>

            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
              {[
                "Premium 240gsm combed cotton",
                "Pre-shrunk, soft hand-feel",
                "Ships within 2–3 working days across Pakistan",
                "Free shipping on orders over Rs. 5,000",
              ].map((line) => (
                <li key={line} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent" /> {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="mt-24">
          <h2 className="mb-6 font-display text-2xl">You might also like</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="group block">
                <div className="overflow-hidden rounded-sm bg-card shadow-card">
                  <img src={p.image} alt={p.name} className="aspect-[4/5] w-full object-cover transition-smooth group-hover:scale-[1.03]" />
                </div>
                <p className="mt-2 text-sm font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">{formatPKR(p.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
