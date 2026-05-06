import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TryOnStudio } from "@/components/TryOnStudio";
import { products, Product } from "@/data/products";

const TryOn = () => {
  const [params] = useSearchParams();
  const [initial, setInitial] = useState<Product | null>(null);

  useEffect(() => {
    const id = params.get("product");
    if (id) {
      const p = products.find((x) => x.id === id);
      if (p) setInitial(p);
    }
  }, [params]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <TryOnStudio initialProduct={initial} />
      </main>
      <Footer />
    </div>
  );
};

export default TryOn;
