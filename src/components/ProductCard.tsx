import { Product, formatPKR } from "@/data/products";
import { Sparkles } from "lucide-react";

interface Props {
  product: Product;
  onTryOn: (p: Product) => void;
}

export const ProductCard = ({ product, onTryOn }: Props) => {
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm bg-card shadow-card transition-smooth hover:translate-y-[-4px] hover:shadow-soft">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-smooth group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-foreground backdrop-blur">
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-xl leading-tight">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-display text-lg font-semibold">
            {formatPKR(product.price)}
          </span>
          <button
            onClick={() => onTryOn(product)}
            className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-4 py-2 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-smooth hover:bg-accent hover:text-accent-foreground"
          >
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
            Try On
          </button>
        </div>
      </div>
    </article>
  );
};
