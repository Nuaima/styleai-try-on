import { Sparkles, ShoppingBag } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "@/context/CartContext";

export const Navbar = () => {
  const { count } = useCart();

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `transition-smooth hover:text-accent ${isActive ? "text-accent" : ""}`;

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
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <NavLink to="/collection" className={navClass}>Collection</NavLink>
          <NavLink to="/try-on" className={navClass}>Virtual Try-On</NavLink>
        </nav>
        <Link
          to="/cart"
          className="relative inline-flex items-center gap-2 rounded-sm border border-primary/30 px-4 py-2 text-sm font-medium transition-smooth hover:bg-primary/5"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">Cart</span>
          {count > 0 && (
            <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};
