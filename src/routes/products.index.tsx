import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { products } from "@/lib/products";
import { Highlight } from "@/components/highlight";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Dehydrated Food Ingredients | Lokavia" },
      {
        name: "description",
        content:
          "Premium dehydrated onion, garlic, ginger, and psyllium husk for global food manufacturers and distributors.",
      },
      { property: "og:title", content: "Dehydrated Food Ingredients | Lokavia" },
      {
        property: "og:description",
        content: "Premium dehydrated onion, garlic, ginger, and psyllium husk for global food manufacturers and distributors.",
      },
      { property: "og:image", content: "https://lokaviainternational.com/Logo%20Light.png" },
      { property: "og:url", content: "https://lokaviainternational.com/products" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  const newProductData = [
    {
      slug: "onion-powder",
      name: "Dehydrated Onion Powder",
      category: "Dehydrated Vegetable Ingredient",
      description: "Fine, flavorful onion powder for seasonings, sauces, snacks, and ready-to-eat foods.",
      applications: "Seasonings • Sauces • Snacks • Ready Meals"
    },
    {
      slug: "garlic-powder",
      name: "Dehydrated Garlic Powder",
      category: "Dehydrated Vegetable Ingredient",
      description: "High-quality garlic powder for spice blends, marinades, sauces, and food processing.",
      applications: "Seasonings • Marinades • Sauces • Meat Processing"
    },
    {
      slug: "ginger-powder",
      name: "Dehydrated Ginger Powder",
      category: "Dehydrated Vegetable Ingredient",
      description: "Aromatic ginger powder for bakery, beverages, seasonings, and health food applications.",
      applications: "Bakery • Beverages • Seasonings • Health Foods"
    },
    {
      slug: "psyllium-husk",
      name: "Psyllium Husk",
      category: "Natural Dietary Fiber Ingredient",
      description: "Natural soluble fiber for food, nutraceutical, bakery, and dietary supplement applications.",
      applications: "Functional Foods • Supplements • Bakery • Health Products"
    }
  ];

  const displayProducts = products.map((p, i) => {
    const override = newProductData.find((o) => o.slug === p.slug) || {};
    return { ...p, ...override } as typeof p & typeof override;
  });

  return (
    <SiteShell>
      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 lg:px-10 lg:pt-28">
        <div className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
          Catalogue · 2026
        </div>
        <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
          <Highlight>Our Products</Highlight>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
          <Highlight>
            Explore Lokavia's range of premium dehydrated food ingredients for food manufacturing, ingredient distribution, and private-label applications.
          </Highlight>
        </p>
      </section>

      {/* Product list — editorial rows */}
      <section className="mx-auto max-w-7xl px-6 pb-32 lg:px-10">
        <ul className="divide-y divide-hairline border-y border-hairline">
          {displayProducts.map((p, i) => (
            <li key={p.slug} className="transition-all duration-300 hover:bg-orange-50/5">
              <Link
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="group grid grid-cols-1 items-center gap-8 py-10 px-4 -mx-4 rounded-lg md:grid-cols-12 md:gap-6"
              >
                <div className="text-xs font-semibold uppercase tracking-widest text-ink-soft md:col-span-1">
                  0{i + 1}
                </div>
                <div className="md:col-span-3">
                  <div className="overflow-hidden rounded-md bg-[oklch(0.97_0.003_260)]">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      width={1200}
                      height={1200}
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                  </div>
                </div>
                <div className="md:col-span-5">
                  <div className="text-xs uppercase tracking-widest text-ink-soft">
                    {p.category}
                  </div>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    {p.name}
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                    <Highlight>{p.description}</Highlight>
                  </p>
                </div>
                <div className="md:col-span-3">
                  <dl className="space-y-2 text-sm">
                    <div className="flex flex-col gap-1">
                      <dt className="text-ink-soft text-xs font-semibold uppercase tracking-wider">Applications</dt>
                      <dd className="text-ink text-sm leading-relaxed">{p.applications}</dd>
                    </div>
                  </dl>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-all duration-300 group-hover:text-[var(--orange)] group-hover:translate-x-1">
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