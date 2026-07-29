import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { products } from "@/lib/products";
import { Highlight } from "@/components/highlight";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Bulk Onion, Garlic, Ginger Powder & Psyllium Husk | Lokavia" },
      {
        name: "description",
        content:
          "Export-grade dehydrated onion, garlic, ginger powder, and psyllium husk (Plantago ovata) — precise mesh size, moisture, and purity specs for bulk buyers.",
      },
      { property: "og:title", content: "Bulk Onion, Garlic, Ginger Powder & Psyllium Husk | Lokavia" },
      {
        property: "og:description",
        content:
          "Export-grade dehydrated onion, garlic, ginger powder, and psyllium husk (Plantago ovata) — precise mesh size, moisture, and purity specs for bulk buyers.",
      },
      { property: "og:image", content: "https://www.lokaviainternational.com/logo-light.png" },
      { property: "og:url", content: "https://www.lokaviainternational.com/products" },
      { property: "og:type", content: "website" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://www.lokaviainternational.com/products" },
    ],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  const displayProducts = products;

  return (
    <SiteShell>
      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 lg:px-10 lg:pt-28">
        <div className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
          Catalogue · 2026
        </div>
         <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
          <Highlight>Bulk Dehydrated Ingredients from India</Highlight>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
          <Highlight>
            Explore Lokavia's range of premium dehydrated food ingredients for food manufacturing, ingredient distribution, and private-label applications.
          </Highlight>
        </p>
      </section>

      {/* Product list — editorial rows */}
      <section className="mx-auto max-w-7xl px-6 pb-32 lg:px-10">
        <ul className="space-y-8">
          {displayProducts.map((p, i) => (
            <li
              key={p.slug}
              className="group overflow-hidden rounded-2xl border border-hairline bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-[var(--orange)]/35"
            >
              <Link
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-8"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-[var(--orange)] md:col-span-1">
                  0{i + 1}
                </div>
                <div className="md:col-span-3">
                  <div className="overflow-hidden rounded-xl bg-[oklch(0.97_0.003_260)] border border-hairline shadow-inner">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      width={1200}
                      height={1200}
                      className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="md:col-span-5">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[var(--navy)]">
                    {p.category}
                  </div>
                  <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl transition-colors duration-300 group-hover:text-[var(--orange)]">
                    {p.name}
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                    <Highlight>{p.description}</Highlight>
                  </p>
                </div>
                <div className="md:col-span-3 flex flex-col justify-between h-full py-2">
                  <dl className="space-y-2 text-sm">
                    <div className="flex flex-col gap-1">
                      <dt className="text-ink-soft text-xs font-bold uppercase tracking-wider">Applications</dt>
                      <dd className="text-ink text-sm leading-relaxed font-medium">
                        {p.applications.join(" • ")}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-all duration-300 group-hover:text-[var(--orange)] group-hover:translate-x-1">
                    View Specifications →
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="border-t border-hairline">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-20 lg:flex-row lg:items-center lg:px-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              <Highlight>Need a category we don't list yet?</Highlight>
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              <Highlight>
                We qualify new commodities on request. Tell us what you import and at
                what volume.
              </Highlight>
            </p>
          </div>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--orange)] px-7 py-4 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-md hover:brightness-105 active:scale-[0.98]"
          >
            Get a Quote <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}