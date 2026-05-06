import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { TryOnStudio } from "@/components/TryOnStudio";
import { products, Product } from "@/data/products";
import { Sparkles, Camera, ShirtIcon } from "lucide-react";

const Index = () => {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />

        {/* HOW IT WORKS */}
        <section className="border-y border-border/50 bg-card py-16">
          <div className="container grid gap-8 md:grid-cols-3">
            {[
              { icon: Camera, title: "Upload your photo", text: "A clear front-facing shot is all we need." },
              { icon: ShirtIcon, title: "Choose a Saturn tee", text: "Pick from our curated collection." },
              { icon: Sparkles, title: "See it on you", text: "AI dresses you in seconds. Made to feel real." },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-start gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-sm bg-accent/15 text-accent">
                  <s.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="font-display text-2xl">{s.title}</h3>
                <p className="text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* COLLECTION */}
        <section id="collection" className="py-20 lg:py-28">
          <div className="container">
            <div className="mb-12 flex items-end justify-between gap-4">
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
                  ✦ The Collection
                </span>
                <h2 className="mt-3 font-display text-4xl md:text-5xl">
                  Tees, in orbit.
                </h2>
              </div>
              <p className="hidden max-w-sm text-muted-foreground md:block">
                Ten signatures. Heavyweight cotton. Designed in-house, printed with care.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} onTryOn={setSelected} />
              ))}
            </div>
          </div>
        </section>

        <TryOnStudio initialProduct={selected} />

        {/* ABOUT */}
        <section id="about" className="bg-primary py-20 text-primary-foreground">
          <div className="container max-w-3xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
              ✦ About Saturn
            </span>
            <h2 className="mt-4 font-display text-4xl italic md:text-5xl">
              "Style isn't worn — it's orbited."
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-primary-foreground/70">
              Saturn is a Pakistan-based wardrobe label crafting graphic and minimal tees
              for those who treat clothing like a quiet rebellion. Every piece is printed
              on premium 240gsm cotton, made to outlast the season.
            </p>
          </div>
        </section>

        <footer className="border-t border-border/40 bg-background py-10">
          <div className="container flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
            <p>© {new Date().getFullYear()} Saturn. Crafted in orbit.</p>
            <p>Free shipping across Pakistan on orders over Rs. 5,000.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
