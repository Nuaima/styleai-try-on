import { useState, useRef, useEffect } from "react";
import { Product, products, formatPKR } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Sparkles, Loader2, Download, RotateCcw, Check } from "lucide-react";
import { toast } from "sonner";

interface Props {
  initialProduct?: Product | null;
}

const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const imgUrlToDataUrl = async (url: string): Promise<string> => {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const TryOnStudio = ({ initialProduct }: Props) => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [selected, setSelected] = useState<Product | null>(initialProduct ?? null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialProduct) {
      setSelected(initialProduct);
      setResult(null);
      // scroll into view
      const el = document.getElementById("tryon");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [initialProduct]);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Image is too large. Please pick one under 8MB.");
      return;
    }
    const data = await fileToDataUrl(file);
    setUserImage(data);
    setResult(null);
  };

  const runTryOn = async () => {
    if (!userImage) return toast.error("Upload a photo of yourself first.");
    if (!selected) return toast.error("Pick a tee to try on.");

    setLoading(true);
    setResult(null);
    try {
      const garmentImage = await imgUrlToDataUrl(selected.image);
      const { data, error } = await supabase.functions.invoke("try-on", {
        body: {
          userImage,
          garmentImage,
          garmentName: selected.name,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      if (!data?.image) throw new Error("No image returned");

      setResult(data.image);
      toast.success("Try-on ready ✨");
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message ?? "Try-on failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setUserImage(null);
    setResult(null);
  };

  return (
    <section id="tryon" className="bg-secondary/40 py-20 lg:py-28">
      <div className="container">
        <div className="mb-12 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
            ✦ The Studio
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            Virtual Try-On
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Upload your photo, choose a Saturn tee, and our AI will dress you in it instantly.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* LEFT — uploader & preview */}
          <div className="rounded-sm bg-card p-6 shadow-card md:p-8">
            <h3 className="font-display text-2xl">1. Your Photo</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              A clear, front-facing shot from waist up works best.
            </p>

            {!userImage ? (
              <button
                onClick={() => fileInput.current?.click()}
                className="mt-6 flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 rounded-sm border-2 border-dashed border-border bg-background/50 transition-smooth hover:border-accent hover:bg-accent/5"
              >
                <Upload className="h-10 w-10 text-muted-foreground" strokeWidth={1.5} />
                <span className="font-medium">Upload a photo</span>
                <span className="text-xs text-muted-foreground">JPG / PNG · up to 8MB</span>
              </button>
            ) : (
              <div className="mt-6 space-y-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
                  <img src={userImage} alt="You" className="h-full w-full object-cover" />
                </div>
                <button
                  onClick={() => fileInput.current?.click()}
                  className="text-sm font-medium text-accent underline-offset-4 hover:underline"
                >
                  Replace photo
                </button>
              </div>
            )}
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />

            <h3 className="mt-8 font-display text-2xl">2. Pick a Tee</h3>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
              {products.map((p) => {
                const active = selected?.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => { setSelected(p); setResult(null); }}
                    className={`relative aspect-square overflow-hidden rounded-sm border-2 transition-smooth ${
                      active ? "border-accent shadow-card" : "border-transparent hover:border-border"
                    }`}
                    title={p.name}
                  >
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                    {active && (
                      <span className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-accent text-accent-foreground">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {selected && (
              <p className="mt-3 text-sm text-muted-foreground">
                Selected: <span className="font-medium text-foreground">{selected.name}</span> · {formatPKR(selected.price)}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={runTryOn}
                disabled={loading || !userImage || !selected}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-soft transition-smooth hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</>
                ) : (
                  <><Sparkles className="h-4 w-4" /> Generate Try-On</>
                )}
              </button>
              {(userImage || result) && (
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-3.5 text-sm font-medium transition-smooth hover:bg-muted"
                  title="Reset"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* RIGHT — result */}
          <div className="rounded-sm bg-gradient-warm p-6 shadow-card md:p-8">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl text-foreground">3. Your Look</h3>
              {result && (
                <a
                  href={result}
                  download="saturn-tryon.png"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                >
                  <Download className="h-4 w-4" /> Save
                </a>
              )}
            </div>

            <div className="mt-6 grid aspect-[4/5] place-items-center overflow-hidden rounded-sm bg-background/40">
              {loading ? (
                <div className="flex flex-col items-center gap-3 text-foreground">
                  <Loader2 className="h-10 w-10 animate-spin" strokeWidth={1.5} />
                  <p className="font-medium">Styling your look…</p>
                  <p className="text-xs opacity-70">This usually takes 10–20 seconds</p>
                </div>
              ) : result ? (
                <img src={result} alt="Try-on result" className="h-full w-full object-cover" />
              ) : (
                <div className="px-8 text-center text-foreground/70">
                  <Sparkles className="mx-auto h-10 w-10 text-foreground/40" strokeWidth={1.5} />
                  <p className="mt-3 font-display text-xl text-foreground">
                    Your virtual try-on appears here
                  </p>
                  <p className="mt-1 text-sm">
                    Upload a photo and pick a tee to begin.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
