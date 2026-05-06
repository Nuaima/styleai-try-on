import { Link } from "react-router-dom";
import heroImg from "@/assets/hero.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="container grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-32">
        <div className="space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-accent-foreground">
            ✦ AI Virtual Try-On
          </span>
          <h1 className="text-balance font-display text-5xl font-semibold leading-[1.05] md:text-6xl lg:text-7xl">
            Wear the future,
            <br />
            <span className="italic text-accent">before it's yours.</span>
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">
            Saturn crafts premium graphic tees for those who orbit their own world.
            Upload a photo, choose your tee, and see it on you — instantly.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/try-on"
              className="group inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 font-medium text-primary-foreground shadow-soft transition-smooth hover:translate-y-[-2px] hover:shadow-card"
            >
              Try On Now
              <span className="transition-smooth group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/collection"
              className="inline-flex items-center gap-2 rounded-sm border border-primary/30 px-7 py-3.5 font-medium text-foreground transition-smooth hover:bg-primary/5"
            >
              Browse Collection
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-sm bg-gradient-gold opacity-30 blur-2xl" />
          <img
            src={heroImg}
            alt="Saturn premium tee on model"
            width={1920}
            height={1080}
            className="relative aspect-[4/5] w-full rounded-sm object-cover shadow-soft"
          />
        </div>
      </div>
    </section>
  );
};
