import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/quality-sourcing", label: "Quality & Sourcing" },
  { to: "/insights", label: "Insights" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldFloat = scrolled && !open;

  return (
    <header
      className={`sticky z-40 transition-all duration-300 ${
        shouldFloat
          ? "top-4 mx-auto w-[calc(100%-2rem)] max-w-7xl rounded-full border border-hairline bg-background/70 shadow-lg backdrop-blur"
          : "top-0 w-full border-b border-hairline bg-background/70 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link
          to="/"
          className="flex items-center transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <img
            src="/Logo + Wordmark light.svg"
            alt="Lokavia"
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="nav-link text-sm font-medium text-ink-soft hover:text-ink"
              activeProps={{ className: "active text-ink" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/quote"
            className="hidden items-center gap-2 rounded-full bg-[var(--orange)] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-md hover:brightness-105 active:scale-[0.98] md:inline-flex"
          >
            Get a Quote
            <span aria-hidden>→</span>
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-hairline bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-medium text-ink"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/quote"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--orange)] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98]"
            >
              Get a Quote →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}