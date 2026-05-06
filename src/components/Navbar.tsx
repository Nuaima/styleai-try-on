import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" strokeWidth={1.5} />
          <span className="font-display text-2xl font-semibold tracking-wide">
            SATURN
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="#collection" className="transition-smooth hover:text-accent">
            Collection
          </a>
          <a href="#tryon" className="transition-smooth hover:text-accent">
            Virtual Try-On
          </a>
          <a href="#about" className="transition-smooth hover:text-accent">
            About
          </a>
        </nav>
        <a
          href="#tryon"
          className="rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-smooth hover:bg-primary/90"
        >
          Try On
        </a>
      </div>
    </header>
  );
};
