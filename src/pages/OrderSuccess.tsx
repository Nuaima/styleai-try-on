import { Link, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";

const OrderSuccess = () => {
  const [params] = useSearchParams();
  const id = params.get("id");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-24 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-accent" strokeWidth={1.2} />
        <h1 className="mt-6 font-display text-4xl md:text-5xl">Thank you ✦</h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Your order has been placed. We'll send a confirmation to your email shortly and ship within 2–3 working days.
        </p>
        {id && (
          <p className="mt-4 text-xs text-muted-foreground">
            Order reference: <span className="font-mono text-foreground">{id.slice(0, 8).toUpperCase()}</span>
          </p>
        )}
        <div className="mt-10 flex justify-center gap-3">
          <Link to="/collection" className="rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-smooth hover:bg-primary/90">
            Continue shopping
          </Link>
          <Link to="/try-on" className="rounded-sm border border-primary/30 px-6 py-3 text-sm font-medium transition-smooth hover:bg-primary/5">
            Try on more tees
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
