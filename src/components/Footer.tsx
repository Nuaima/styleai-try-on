import { Link } from "react-router-dom";
import { Instagram, Twitter, Mail } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border/40 bg-background">
    <div className="container py-16">
      <div className="grid gap-12 md:grid-cols-3">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="text-accent text-2xl">🪐</span>
            <span className="font-display text-3xl">Saturn</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            A celestial wardrobe. Designed to orbit beyond the ordinary.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">Navigate</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <li><Link to="/try-on" className="hover:text-accent">AI Try-On</Link></li>
            <li><Link to="/collection" className="hover:text-accent">Collection</Link></li>
            <li><Link to="/#story" className="hover:text-accent">Story</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">Stay in orbit</h4>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-5 flex overflow-hidden rounded-full border border-border bg-card"
          >
            <input
              type="email"
              placeholder="your@cosmos.com"
              className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="bg-gradient-gold px-5 text-xs font-medium uppercase tracking-[0.2em] text-accent-foreground"
            >
              Join
            </button>
          </form>
          <div className="mt-5 flex gap-4 text-muted-foreground">
            <a href="#" aria-label="Instagram" className="hover:text-accent"><Instagram className="h-5 w-5" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-accent"><Twitter className="h-5 w-5" /></a>
            <a href="#" aria-label="Email" className="hover:text-accent"><Mail className="h-5 w-5" /></a>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-6 text-xs text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Saturn — Wear Your Orbit.</p>
        <p>Crafted in the atmosphere.</p>
      </div>
    </div>
  </footer>
);
