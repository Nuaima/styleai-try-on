import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { products, formatPKR } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";
import saturnHero from "@/assets/saturn-hero.jpg";

const Index = () => {
  const featured = products.slice(0, 6);
  const story = products[6] ?? products[0];
  const { add } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* HERO with Saturn background */}
        <section className="relative min-h-screen overflow-hidden">
          <img
            src={saturnHero}
            alt="Saturn planet with rings"
            width={1920}
            height={1280}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />

          {/* Orbit rings */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2">
            <div className="h-[80vmin] w-[80vmin] rounded-full border border-accent/20" />
            <div className="absolute inset-[8%] rounded-full border border-accent/15" />
            <div className="absolute inset-[18%] rounded-full border border-accent/10" />
          </div>

          <div className="container relative z-10 flex min-h-screen flex-col items-center justify-center pt-32 pb-20 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.3em] backdrop-blur">
              <Sparkles className="h-3 w-3 text-accent" /> AI Virtual Try-On
            </span>

            <h1 className="mt-8 max-w-5xl text-balance font-display text-7xl font-normal leading-[0.95] md:text-8xl lg:text-[9rem]">
              Wear Your
              <br />
              <span className="italic text-accent">Orbit.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base text-foreground/80 md:text-lg">
              A celestial wardrobe inspired by the rings of Saturn. Slip into a
              new universe — try every piece on with AI before it lands in your orbit.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/try-on"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-primary-foreground shadow-soft transition-smooth hover:translate-y-[-2px]"
              >
                Try It On
                <ArrowRight className="h-4 w-4 transition-smooth group-hover:translate-x-1" />
              </Link>
              <Link
                to="/collection"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/30 bg-background/60 px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] backdrop-blur transition-smooth hover:bg-background/80"
              >
                Explore Saturn
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURED */}
        <section className="py-24 lg:py-32">
          <div className="container">
            <div className="mb-14 flex items-end justify-between gap-6">
              <div>
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent">
                  ✦ Drop 01 · Summer Orbit
                </span>
                <h2 className="mt-4 font-display text-5xl md:text-6xl">
                  Featured Collection
                </h2>
              </div>
              <Link
                to="/collection"
                className="hidden shrink-0 items-center gap-1 text-xs font-medium uppercase tracking-[0.25em] text-accent underline-offset-4 hover:underline md:inline-flex"
              >
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((o) => (
                <div key={o.id} className="group flex flex-col">
                  <Link
                    to={`/product/${o.id}`}
                    className="relative block aspect-square overflow-hidden rounded-3xl"
                    style={{ backgroundColor: "hsl(225 75% 38%)" }}
                  >
                    <img
                      src={o.image}
                      alt={o.name}
                      loading="lazy"
                      className="h-full w-full object-contain p-6 transition-smooth group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-[10px] font-medium uppercase tracking-widest backdrop-blur">
                      {o.category}
                    </span>
                  </Link>

                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl leading-tight">{o.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{o.description}</p>
                    </div>
                    <span className="shrink-0 font-display text-lg font-semibold">
                      {formatPKR(o.price)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      add(o, "M", 1);
                      toast({ title: "Added to cart", description: `${o.name} · Size M` });
                    }}
                    className="mt-4 w-full translate-y-2 rounded-full bg-foreground py-3 text-[10px] uppercase tracking-[0.3em] text-background opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:opacity-90"
                  >
                    Add to cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STORY TEASER */}
        <section id="story" className="border-t border-border/50 bg-card py-24 lg:py-32">
          <div className="container grid items-center gap-16 lg:grid-cols-2">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent">
                ✦ The Saturn philosophy
              </span>
              <h2 className="mt-4 font-display text-4xl italic leading-[1.05] md:text-5xl lg:text-6xl">
                Fashion as a universe.
              </h2>
              <p className="mt-6 max-w-md text-muted-foreground">
                We design garments the way astronomers map the sky — with patience,
                with wonder, with reverence for the soft light at the edge of things.
                Every piece in Saturn is a small moon: quiet, gravitational, and made to orbit you.
              </p>
              <Link
                to="/collection"
                className="mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-accent underline-offset-4 hover:underline"
              >
                Read our story <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 rounded-sm bg-gradient-gold opacity-25 blur-2xl" />
              <img
                src={story.image}
                alt="Saturn philosophy"
                className="relative aspect-[4/5] w-full rounded-sm object-cover shadow-soft"
              />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Index;
