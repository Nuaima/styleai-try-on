export const Footer = () => (
  <footer className="border-t border-border/40 bg-background py-10">
    <div className="container flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
      <p>© {new Date().getFullYear()} Saturn. Crafted in orbit.</p>
      <p>Free shipping across Pakistan on orders over Rs. 5,000.</p>
    </div>
  </footer>
);
