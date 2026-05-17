import { ShoppingBag } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "@/context/CartContext";

export const Navbar = () => {
  const { count } = useCart();

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1.5 text-sm transition-smooth hover:text-foreground ${
      isActive ? "text-foreground rounded-md ring-1 ring-foreground/40" : "text-foreground/70"
    }`;

  return (
    <header className="absolute left-0 right-0 top-0 z-40 px-4 pt-5">
      <div className="container flex items-center justify-between gap-4">
        {/* Pill nav */}
        <div className="flex flex-1 items-center justify-between rounded-full border border-border/60 bg-background/80 px-6 py-2.5 shadow-soft backdrop-blur-md">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-accent">🪐</span>
            <span className="font-display text-2xl">Saturn</span>
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            <NavLink to="/" end className={navClass}>Home</NavLink>
            <NavLink to="/try-on" className={navClass}>Try-On</NavLink>
            <NavLink to="/collection" className={navClass}>Collection</NavLink>
            <NavLink to="/#story" className={navClass}>Story</NavLink>
          </nav>
        </div>
        <Link
          to="/cart"
          className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-border/60 bg-background/80 shadow-soft backdrop-blur-md transition-smooth hover:bg-background"
        >
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};
