import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { getProduct, products, type Product } from "@/lib/products";
import { Highlight } from "@/components/highlight";
import { ArrowUpRight, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product not found — Lokavia" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    const title = product.metaTitle || `${product.name} — Lokavia`;
    const description = product.metaDescription || product.description;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: `https://www.lokaviainternational.com${product.image}` },
        { property: "og:url", content: `https://www.lokaviainternational.com/products/${product.slug}` },
        { property: "og:type", content: "product" },
        { name: "robots", content: "index, follow" },
      ],
      links: [
        { rel: "canonical", href: `https://www.lokaviainternational.com/products/${product.slug}` },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-4xl font-bold text-ink">Product not found</h1>
        <p className="mt-4 text-ink-soft">
          This SKU is not currently in our export catalogue.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:opacity-70"
        >
          Back to products →
        </Link>
      </div>
    </SiteShell>
  ),
  errorComponent: ({ error, reset }) => (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-3xl font-bold text-ink">Something went wrong</h1>
        <p className="mt-4 text-sm text-ink-soft">{error.message}</p>
        <button
          onClick={reset}
          className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    </SiteShell>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const others = products.filter((p) => p.slug !== product.slug);
  const isPsyllium = product.slug === "psyllium-husk";

  // Grade variants loaded dynamically from products.json
  const foodGradeVariant = product.variants?.find((v) => v.id === "food-grade");
  const foodGradeProduct = foodGradeVariant ? { ...product, ...foodGradeVariant } : product;

  const nutraceuticalVariant = product.variants?.find((v) => v.id === "nutraceutical");
  const nutraceuticalProduct = nutraceuticalVariant ? { ...product, ...nutraceuticalVariant } : product;

  const productSchema = isPsyllium && product.variants && product.variants.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ProductGroup",
    "name": product.name,
    "description": product.description,
    "url": `https://www.lokaviainternational.com/products/${product.slug}`,
    "brand": {
      "@type": "Brand",
      "name": "Lokavia"
    },
    "hasVariant": product.variants.map((v) => ({
      "@type": "Product",
      "name": v.name,
      "description": v.description,
      "sku": `${product.slug}-${v.id}`,
      "category": v.category,
      "image": `https://www.lokaviainternational.com${product.image}`,
      "offers": {
        "@type": "Offer",
        "url": `https://www.lokaviainternational.com/quote?product=${product.slug}&variant=${v.id}`,
        "price": "0.00",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "description": "Bulk export contract pricing upon Request for Quote (RFQ)"
        },
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Lokavia International"
        }
      },
      "additionalProperty": [
        ...v.specs.map((s) => ({
          "@type": "PropertyValue",
          "name": s.label,
          "value": s.value
        })),
        {
          "@type": "PropertyValue",
          "name": "Minimum Order Quantity",
          "value": `${v.moqKg} kg`,
          "unitCode": "KGM"
        },
        {
          "@type": "PropertyValue",
          "name": "Shelf Life",
          "value": `${v.shelfLifeMonths} months`
        }
      ]
    }))
  } : {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": `https://www.lokaviainternational.com${product.image}`,
    "description": product.description,
    "category": product.category,
    "brand": {
      "@type": "Brand",
      "name": "Lokavia"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Lokavia International",
      "url": "https://www.lokaviainternational.com"
    },
    "countryOfOrigin": {
      "@type": "Country",
      "name": product.origin
    },
    "material": product.form,
    "additionalProperty": [
      ...product.specs.map((s) => ({
        "@type": "PropertyValue",
        "name": s.label,
        "value": s.value
      })),
      {
        "@type": "PropertyValue",
        "name": "Minimum Order Quantity",
        "value": `${product.moqKg} kg`,
        "unitCode": "KGM"
      },
      {
        "@type": "PropertyValue",
        "name": "Shelf Life",
        "value": `${product.shelfLifeMonths} months`
      }
    ],
    "offers": {
      "@type": "Offer",
      "url": `https://www.lokaviainternational.com/quote?product=${product.slug}`,
      "price": "0.00",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "description": "Bulk export contract pricing upon Request for Quote (RFQ)"
      },
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Lokavia International"
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Products",
        "item": "https://www.lokaviainternational.com/products"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": product.name,
        "item": `https://www.lokaviainternational.com/products/${product.slug}`
      }
    ]
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-10">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink-soft">
          <Link to="/products" className="hover:text-ink">
            Products
          </Link>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </div>
      </div>

      {isPsyllium ? (
        <Tabs defaultValue="nutraceutical" className="w-full">
          <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-10">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2">
              <TabsTrigger value="nutraceutical">Nutraceutical Fibre</TabsTrigger>
              <TabsTrigger value="food-grade">Food-Grade</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="nutraceutical" className="mt-0 transition-all duration-300 data-[state=active]:animate-in data-[state=active]:fade-in-50">
            <ProductDetails p={nutraceuticalProduct} slug={product.slug} />
          </TabsContent>

          <TabsContent value="food-grade" className="mt-0 transition-all duration-300 data-[state=active]:animate-in data-[state=active]:fade-in-50">
            <ProductDetails p={foodGradeProduct} slug={product.slug} />
          </TabsContent>
        </Tabs>
      ) : (
        <ProductDetails p={product} slug={product.slug} />
      )}

      {/* Others */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="flex items-end justify-between border-b border-hairline pb-6">
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Other commodities
            </h2>
            <Link
              to="/products"
              className="text-sm font-semibold text-ink hover:opacity-70"
            >
              All products →
            </Link>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-3">
            {others.map((p) => (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="group block transition-all duration-300 hover:-translate-y-1"
              >
                <div className="overflow-hidden rounded-md bg-[oklch(0.97_0.003_260)] shadow-sm transition-all duration-300 group-hover:shadow-md">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={1200}
                    height={1200}
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-ink">{p.name}</h3>
                <p className="mt-1 text-sm text-ink-soft">{p.category}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function FaqAccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-xl border border-hairline bg-white overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left font-semibold text-ink hover:text-[var(--orange)] transition-colors duration-300 flex justify-between items-center gap-4"
      >
        <span>{question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-sm text-ink-soft leading-relaxed border-t border-hairline pt-4 bg-[oklch(0.99_0.001_260)]">
          {answer}
        </div>
      )}
    </div>
  );
}

function ProductDetails({ p, slug }: { p: any; slug: string }) {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-8 pb-20 lg:px-10 lg:pt-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="group overflow-hidden rounded-xl border border-hairline bg-[oklch(0.97_0.003_260)] shadow-md hover:shadow-xl transition-all duration-500">
              <img
                src={p.image}
                alt={p.name}
                width={1200}
                height={1200}
                className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
              {p.category}
            </div>
            <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              {p.name}
            </h1>
            <p className="mt-6 text-xl leading-snug text-ink">
              <Highlight>{p.tagline}</Highlight>
            </p>
            
            {/* AEO/GEO Opener */}
            {p.introduction && (
              <div className="mt-8 border-l-2 border-[var(--orange)] pl-4 py-1">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-ink">
                  What is {p.name}?
                </h2>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                  <Highlight>{p.introduction}</Highlight>
                </p>
              </div>
            )}

            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft">
              <Highlight>
                {`Lokavia supplies ${p.name.toLowerCase()} from India for food manufacturers, ingredient distributors, and private-label brands that need consistent mesh size, low moisture, export packaging, and reliable documentation. Each order can be aligned to buyer specifications, destination-market requirements, and planned production use.`}
              </Highlight>
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-hairline pt-8">
              <div>
                <dt className="text-xs uppercase tracking-widest text-ink-soft">
                  Origin
                </dt>
                <dd className="mt-2 text-lg font-semibold text-ink">
                  {p.origin}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-ink-soft">
                  MOQ
                </dt>
                <dd className="mt-2 text-lg font-semibold text-ink">
                  {p.moqKg} kg
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-ink-soft">
                  Shelf life
                </dt>
                <dd className="mt-2 text-lg font-semibold text-ink">
                  {p.shelfLifeMonths} months
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-ink-soft">
                  Mesh
                </dt>
                <dd className="mt-2 text-lg font-semibold text-ink">
                  {p.meshOptions.join(" · ")}
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/quote"
                search={{ product: slug } as never}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--orange)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-md hover:brightness-105 active:scale-[0.98]"
              >
                Request quote for {p.name} <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Specs + analytical profile */}
      <section className="border-t border-hairline bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
                Specification
              </div>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink">
                Technical profile.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
                <Highlight>
                  Third-party lab reports are issued with every consignment. Bespoke
                  specifications available on request.
                </Highlight>
              </p>
            </div>
            
            <div className="lg:col-span-8">
              {p.physicochemicalSpecs || p.microbiologicalSpecs ? (
                <div className="grid gap-12 md:grid-cols-2">
                  {/* Physicochemical Specs */}
                  {p.physicochemicalSpecs && (
                    <div>
                      <h3 className="text-base font-bold text-ink border-b border-hairline pb-2 mb-4 uppercase tracking-wider text-ink-soft">
                        Physicochemical Parameters
                      </h3>
                      <div className="divide-y divide-hairline">
                        {p.physicochemicalSpecs.map((s: any) => (
                          <div key={s.label} className="py-3.5 flex justify-between gap-4 text-sm">
                            <span className="font-medium text-ink-soft">{s.label}</span>
                            <span className="font-bold text-ink text-right">{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Microbiological Specs */}
                  {p.microbiologicalSpecs && (
                    <div>
                      <h3 className="text-base font-bold text-ink border-b border-hairline pb-2 mb-4 uppercase tracking-wider text-ink-soft">
                        Microbiological Limits
                      </h3>
                      <div className="divide-y divide-hairline">
                        {p.microbiologicalSpecs.map((s: any) => (
                          <div key={s.label} className="py-3.5 flex justify-between gap-4 text-sm">
                            <span className="font-medium text-ink-soft">{s.label}</span>
                            <span className="font-bold text-ink text-right">{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {p.specs.map((s: any) => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-hairline bg-[oklch(0.99_0.001_260)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-[var(--orange)]/30"
                    >
                      <dt className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{s.label}</dt>
                      <dd className="mt-2 text-xl font-bold text-ink tracking-tight">{s.value}</dd>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing & Sourcing Hubs Section */}
      {p.originHighlights && p.originHighlights.length > 0 && (
        <section className="border-t border-hairline bg-[oklch(0.99_0.001_260)]">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
                Agricultural Origin
              </span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink">
                Sourced at Origin.
              </h2>
              <div className="mt-8 space-y-6">
                {p.originHighlights.map((hl: any, idx: number) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-ink">{hl.title}</h3>
                      <p className="mt-1 text-sm text-ink-soft leading-relaxed">{hl.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-hairline shadow-md aspect-[16/10]">
                <div className="w-full h-full bg-[var(--navy)]/5 flex flex-col justify-center p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--orange)]/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--navy)]/5 rounded-full blur-3xl -ml-20 -mb-20"></div>
                  <div className="relative z-10">
                    <div className="text-xs font-semibold uppercase tracking-widest text-[var(--orange)] mb-2">
                      Sourcing Hub Protocol
                    </div>
                    <h3 className="text-xl font-bold text-ink mb-4">
                      Traceable Origin Pipeline
                    </h3>
                    <ul className="space-y-3 text-sm text-ink-soft">
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--orange)] font-bold">✓</span>
                        <span>Direct contracts with farms in vetted regional belts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--orange)] font-bold">✓</span>
                        <span>Harvesting timed at peak sugar and oil concentrations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--orange)] font-bold">✓</span>
                        <span>Low-temperature dehydration to lock in essential volatile oils</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--orange)] font-bold">✓</span>
                        <span>Lot-by-lot traceability from field drying to final export stuffing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Applications + packaging */}
      <section className="border-t border-hairline bg-[oklch(0.985_0.002_260)]/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-24 lg:grid-cols-2 lg:px-10">
          <div className="rounded-2xl border border-hairline bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md">
            <h3 className="text-2xl font-bold tracking-tight text-ink">
              Applications
            </h3>
            <p className="mt-2 text-sm text-ink-soft">
              Suitable for a wide range of industrial and culinary uses:
            </p>
            <ul className="mt-6 space-y-4">
              {p.applications.map((a: string) => (
                <li key={a} className="flex items-start gap-3 text-base text-ink">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="leading-normal"><Highlight>{a}</Highlight></span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="rounded-2xl border border-hairline bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-ink">
                Packaging
              </h3>
              <p className="mt-2 text-sm text-ink-soft">
                Standard export-grade packaging configurations:
              </p>
              <ul className="mt-6 space-y-4">
                {p.packaging.map((pack: string) => (
                  <li key={pack} className="flex items-start gap-3 text-base text-ink">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--navy)]/5 text-[var(--navy)]">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span className="leading-normal"><Highlight>{pack}</Highlight></span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-10 border-t border-hairline pt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink-soft">
                Verified Certifications
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.certifications.map((c: string) => (
                  <span
                    key={c}
                    className="rounded-full bg-[var(--navy)]/5 px-3.5 py-1 text-xs font-semibold text-[var(--navy)] transition-colors duration-300 hover:bg-[var(--navy)] hover:text-white"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preservation & Compliance Section */}
      {((p.storageHighlights && p.storageHighlights.length > 0) || (p.complianceHighlights && p.complianceHighlights.length > 0)) && (
        <section className="border-t border-hairline bg-white">
          <div className="mx-auto max-w-7xl grid gap-8 px-6 py-24 lg:grid-cols-2 lg:px-10">
            {p.storageHighlights && p.storageHighlights.length > 0 && (
              <div className="rounded-2xl border border-hairline p-8 bg-[oklch(0.99_0.001_260)] shadow-sm">
                <h3 className="text-2xl font-bold tracking-tight text-ink">
                  Storage & Preservation
                </h3>
                <p className="mt-2 text-sm text-ink-soft">
                  Precise environment thresholds required to maintain product shelf life:
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {p.storageHighlights.map((hl: any, idx: number) => (
                    <div key={idx} className="rounded-xl border border-hairline bg-white p-4 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                          {hl.title}
                        </div>
                        <div className="mt-1 text-base font-extrabold text-[var(--orange)] tracking-tight">
                          {hl.value}
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-ink-soft leading-normal">
                        {hl.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {p.complianceHighlights && p.complianceHighlights.length > 0 && (
              <div className="rounded-2xl border border-hairline p-8 bg-[oklch(0.99_0.001_260)] shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-ink">
                    Import Regulations & Compliance
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft">
                    Vetted documentation compliance for standard global shipping pipelines:
                  </p>
                  <div className="mt-6 space-y-4">
                    {p.complianceHighlights.map((hl: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-ink">{hl.title}</h4>
                          <p className="mt-0.5 text-xs text-ink-soft leading-normal">{hl.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Documentation Section */}
      {p.documentList && p.documentList.length > 0 && (
        <section className="border-t border-hairline bg-[oklch(0.985_0.002_260)]/60">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="rounded-2xl border border-hairline bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold tracking-tight text-ink">
                Export Documentation Checklist
              </h3>
              <p className="mt-2 text-sm text-ink-soft">
                We supply a complete document pack with every ocean shipment to ensure clean customs clearance at destination ports:
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {p.documentList.map((doc: string) => (
                  <div key={doc} className="flex items-center gap-3 text-sm text-ink">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <span className="text-xs">✓</span>
                    </span>
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Product-Specific FAQs Accordion */}
      {p.faqs && p.faqs.length > 0 && (
        <section className="border-t border-hairline bg-white">
          <div className="mx-auto max-w-3xl px-6 py-24 lg:px-10">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
                Product Help
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {p.faqs.map((faq: any, idx: number) => (
                <FaqAccordionItem key={idx} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sample Request Banner */}
      <section className="border-t border-hairline bg-[var(--navy)] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--orange)]">
            Quality Assurance Verification
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            Request a Commercial Sample
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base text-gray-300 leading-relaxed">
            We understand that food manufacturing lines require strict pre-shipment approvals. Lokavia offers 500g to 2kg sample shipments dispatched via express air courier for laboratory testing and sensory evaluation before contract signing.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/quote"
              search={{ product: slug } as never}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--orange)] px-8 py-4 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-md hover:brightness-105 active:scale-[0.98]"
            >
              Order Testing Sample <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}