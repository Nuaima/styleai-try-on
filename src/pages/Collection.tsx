import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

const Collection = () => {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    []
  );
  const [filter, setFilter] = useState("All");

  const list = filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-16 lg:py-20">
        <header className="mb-10 max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">✦ The Collection</span>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Tees, in orbit.</h1>
          <p className="mt-3 text-muted-foreground">
            Ten signatures. Heavyweight cotton. Designed in-house, printed with care.
          </p>
        </header>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-smooth ${
                filter === c
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-card hover:border-accent/50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Collection;
