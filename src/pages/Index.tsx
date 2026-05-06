import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { Sparkles, Camera, ShirtIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const featured = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />

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

        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="mb-12 flex items-end justify-between gap-4">
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
                  ✦ Featured
                </span>
                <h2 className="mt-3 font-display text-4xl md:text-5xl">
                  This week's drops
                </h2>
              </div>
              <Link to="/collection" className="hidden text-sm font-medium text-accent underline-offset-4 hover:underline md:inline">
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>

            <div className="mt-12 text-center">
              <Link to="/collection" className="inline-flex items-center gap-2 rounded-sm border border-primary/30 px-7 py-3.5 font-medium transition-smooth hover:bg-primary/5">
                Browse the full collection →
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-primary py-20 text-primary-foreground">
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
            <Link to="/try-on" className="mt-8 inline-flex items-center gap-2 rounded-sm bg-accent px-7 py-3.5 font-medium text-accent-foreground transition-smooth hover:bg-accent/90">
              <Sparkles className="h-4 w-4" />
              Try on a Saturn tee
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Index;
