import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Highlight } from "@/components/highlight";
import { products } from "@/lib/products";
import heroBotanical from "@/assets/hero-botanical.jpg";
import { ArrowUpRight, ShieldCheck, Ship, Sprout } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lokavia | Dehydrated Onion, Garlic & Ginger Powder Exporter, India" },
      {
        name: "description",
        content:
          "Lokavia exports dehydrated onion, garlic, ginger powder, and psyllium husk from India — bulk supply for food manufacturers, distributors, and private-label brands worldwide.",
      },
      { property: "og:title", content: "Lokavia | Dehydrated Onion, Garlic & Ginger Powder Exporter, India" },
      {
        property: "og:description",
        content:
          "Lokavia exports dehydrated onion, garlic, ginger powder, and psyllium husk from India — bulk supply for food manufacturers, distributors, and private-label brands worldwide.",
      },
      { property: "og:image", content: "https://www.lokaviainternational.com/logo-light.png" },
      { property: "og:url", content: "https://www.lokaviainternational.com/" },
      { property: "og:type", content: "website" },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: Index,
});

function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(0);
  currentIndexRef.current = currentIndex;

  const productsTrackRef = useRef<HTMLDivElement>(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [displayProductIndex, setDisplayProductIndex] = useState(0);
  const [isProductTransitioning, setIsProductTransitioning] = useState(false);
  const currentProductIndexRef = useRef(0);
  currentProductIndexRef.current = currentProductIndex;

  const variants = [
    {
      word: "buyers",
      text: "We work with food manufacturers, ingredient distributors, and private-label brands who need consistent grades, predictable lead times, and clean paperwork. Today the catalogue is focused on four flagship commodities — the roadmap adds pulses, oilseeds, and dehydrated fruit as buyer demand qualifies each category."
    },
    {
      word: "manufacturers",
      text: "We supply consistent-grade dehydrated commodities built for production-line reliability — matched moisture content, mesh size, and batch-to-batch consistency your formulation depends on. Today the catalogue covers four flagship commodities, with more added as your production needs grow."
    },
    {
      word: "traders",
      text: "We supply bulk agri-commodities with the reliability serious trading requires — consistent availability, competitive FOB pricing, and documentation that moves with the shipment, not behind it. Today's catalogue covers four flagship commodities, expanding as demand across your markets grows."
    },
    {
      word: "suppliers",
      text: "We work with suppliers who need a dependable upstream partner — traceable sourcing, verified quality, and paperwork that holds up when it reaches your own customers. Today the catalogue covers four flagship commodities, with more added as your sourcing needs expand."
    },
    {
      word: "distributors",
      text: "We supply distributors who need predictable inventory and consistent specs across every reorder — no surprises in grade, packaging, or lead time. Today the catalogue covers four flagship commodities, growing as your distribution network does."
    }
  ];

  const endUses = [
    "For seasoning blends, snacks, and RTE food manufacturing",
    "For flavor systems, spice blends, and QSR applications",
    "For spice blends and functional food formulation",
    "Food-grade and nutraceutical-grade dietary fiber"
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const rect = track.getBoundingClientRect();
      const visibleHeight = window.innerHeight;

      if (rect.top <= 0 && rect.bottom >= visibleHeight) {
        const totalStickyScroll = rect.height - visibleHeight;
        const currentStickyScroll = -rect.top;
        const rawProgress = currentStickyScroll / totalStickyScroll;
        const progress = Math.max(0, Math.min(1, rawProgress));
        const index = Math.min(4, Math.floor(progress * 5));

        if (index !== currentIndexRef.current) {
          setCurrentIndex(index);
          setIsTransitioning(true);
          setTimeout(() => {
            setDisplayIndex(index);
            setIsTransitioning(false);
          }, 200);
        }
      } else if (rect.top > 0) {
        if (currentIndexRef.current !== 0) {
          setCurrentIndex(0);
          setIsTransitioning(true);
          setTimeout(() => {
            setDisplayIndex(0);
            setIsTransitioning(false);
          }, 200);
        }
      } else if (rect.bottom < visibleHeight) {
        if (currentIndexRef.current !== 4) {
          setCurrentIndex(4);
          setIsTransitioning(true);
          setTimeout(() => {
            setDisplayIndex(4);
            setIsTransitioning(false);
          }, 200);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const track = productsTrackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const rect = track.getBoundingClientRect();
      const visibleHeight = window.innerHeight;

      if (rect.top <= 0 && rect.bottom >= visibleHeight) {
        const totalStickyScroll = rect.height - visibleHeight;
        const currentStickyScroll = -rect.top;
        const rawProgress = currentStickyScroll / totalStickyScroll;
        const progress = Math.max(0, Math.min(1, rawProgress));
        const index = Math.min(3, Math.floor(progress * 4));

        if (index !== currentProductIndexRef.current) {
          setCurrentProductIndex(index);
          setIsProductTransitioning(true);
          setTimeout(() => {
            setDisplayProductIndex(index);
            setIsProductTransitioning(false);
          }, 200);
        }
      } else if (rect.top > 0) {
        if (currentProductIndexRef.current !== 0) {
          setCurrentProductIndex(0);
          setIsProductTransitioning(true);
          setTimeout(() => {
            setDisplayProductIndex(0);
            setIsProductTransitioning(false);
          }, 200);
        }
      } else if (rect.bottom < visibleHeight) {
        if (currentProductIndexRef.current !== 3) {
          setCurrentProductIndex(3);
          setIsProductTransitioning(true);
          setTimeout(() => {
            setDisplayProductIndex(3);
            setIsProductTransitioning(false);
          }, 200);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-background border-b border-hairline pt-20 pb-24 lg:pt-32 lg:pb-32">
        {/* Botanical Background Image with subtle scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBotanical}
            alt="Soft watercolor botanical background"
            className="h-full w-full object-cover opacity-50 select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-white/40" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 grid items-end gap-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink-soft">
              <span className="h-px w-8 bg-ink" />
              Agri-commodity exporter · India
            </div>
            <h1 className="mt-8 text-5xl font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[5.5rem]">
              <Highlight>India's agri-commodity exporter,</Highlight>
              <br />
              <Highlight>built for global buyers.</Highlight>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
              <Highlight>
                Lokavia supplies dehydrated onion, garlic, ginger, and psyllium husk
                to food manufacturers, ingredient distributors, and private-label brands —
                built to the mesh size, moisture, and purity specifications your production line requires.
              </Highlight>
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--orange)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-md hover:brightness-105 active:scale-[0.98]"
              >
                Get a Quote <ArrowUpRight size={16} />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-all duration-300 hover:text-[var(--orange)] hover:translate-x-1"
              >
                Explore products <span aria-hidden>→</span>
              </Link>
            </div>


          </div>
          <div className="lg:col-span-4">
            <dl className="grid grid-cols-2 gap-8 border-t border-hairline pt-8">
              <div>
                <dt className="text-xs uppercase tracking-widest text-ink-soft">
                  Target export markets
                </dt>
                <dd className="mt-2 text-3xl font-bold tracking-tight text-ink">
                  20+
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-ink-soft">
                  SKUs in catalogue
                </dt>
                <dd className="mt-2 text-3xl font-bold tracking-tight text-ink">
                  {products.length}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-ink-soft">
                  MOQ from
                </dt>
                <dd className="mt-2 text-3xl font-bold tracking-tight text-ink">
                  2000 kg
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-ink-soft">
                  Certifications
                </dt>
                <dd className="mt-2 text-3xl font-bold tracking-tight text-ink">
                  FSSAI
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>


      {/* Products preview with Pinned Scroll Sequence */}
      <div ref={productsTrackRef} className="relative h-[220vh] w-full border-t border-hairline">
        <div className="sticky top-0 h-[100dvh] w-full flex items-center overflow-hidden">
          <section className="mx-auto w-full max-w-7xl px-6 lg:px-10 py-8 lg:py-0">
            {/* Section Header */}
            <div className="flex items-end justify-between border-b border-hairline pb-6 mb-12">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
                  Catalogue
                </div>
                <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                  <Highlight>What we ship.</Highlight>
                </h2>
              </div>
              <Link
                to="/products"
                className="hidden text-sm font-semibold text-ink transition-all duration-300 hover:text-[var(--orange)] hover:translate-x-1 md:inline-flex"
              >
                All products →
              </Link>
            </div>

            <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">

              {/* Left Column: Image */}
              <div className="flex justify-center">
                <Link
                  to="/products/$slug"
                  params={{ slug: products[displayProductIndex].slug }}
                  className="group block w-full max-w-[480px] aspect-square overflow-hidden rounded-lg bg-[oklch(0.97_0.003_260)] shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                >
                  <img
                    src={products[displayProductIndex].image}
                    alt={products[displayProductIndex].name}
                    className={`aspect-square w-full object-cover transition-all duration-300 group-hover:scale-105 ${isProductTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
                      }`}
                  />
                </Link>
              </div>

              {/* Right Column: Copy content */}
              <div className="space-y-6">
                <div className={`transition-all duration-200 transform ${isProductTransitioning ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
                  }`}>
                  <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft block">
                    {products[displayProductIndex].category}
                  </span>
                  <div className="mt-1 text-xs text-ink-soft">
                    {endUses[displayProductIndex]}
                  </div>
                  <h2 className="mt-2 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                    {products[displayProductIndex].name}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-ink-soft">
                    <Highlight>
                      {products[displayProductIndex].description}
                    </Highlight>
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <Link
                      to="/products/$slug"
                      params={{ slug: products[displayProductIndex].slug }}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-all duration-300 hover:text-[var(--orange)] hover:translate-x-1"
                    >
                      View Details <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>
      </div>

      {/* Value pillars */}
      <section className="border-y border-hairline bg-background">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden bg-hairline sm:grid-cols-3">
          {[
            {
              icon: Sprout,
              title: "Sourced at origin",
              body:
                "Direct partnerships with growers in Gujarat, Madhya Pradesh, Kerala, and Assam — traceable lot by lot.",
            },
            {
              icon: ShieldCheck,
              title: "Certified & tested",
              body:
                "FSSAI registered. ISO 22000 & HACCP in planned pipeline, with third-party lab reports on every consignment.",
            },
            {
              icon: Ship,
              title: "Export-ready logistics",
              body:
                "FOB, CIF, and DDP terms. Documentation, phytosanitary, and container loading handled in-house.",
            },
          ].map((v) => (
            <div key={v.title} className="bg-background p-10 lg:p-12 transition-all duration-300 hover:bg-orange-50/10 group">
              <v.icon size={22} className="text-[var(--navy)] transition-transform duration-300 group-hover:scale-110 group-hover:text-[var(--orange)]" strokeWidth={1.5} />
              <h3 className="mt-6 text-xl font-semibold text-ink transition-colors duration-300 group-hover:text-[var(--navy)]">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Trajectory / trust with Pinned Scroll Sequence */}
      <div ref={trackRef} className="relative h-[250vh] w-full">
        <div className="sticky top-0 h-[100dvh] w-full flex items-center overflow-hidden">
          <section className="mx-auto w-full max-w-7xl px-6 lg:px-10 py-8 lg:py-0">
            <div className="grid gap-16 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
                  About <Highlight>Lokavia</Highlight>
                </div>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                  Built for{" "}
                  <span className={`inline-block transition-all duration-200 transform ${isTransitioning ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0'} accent-word`}>
                    {variants[displayIndex].word}
                  </span>{" "}
                  who import at scale.
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className={`text-lg leading-relaxed text-ink-soft min-h-[140px] md:min-h-[100px] transition-all duration-200 transform ${isTransitioning ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}>
                  <Highlight>
                    {variants[displayIndex].text}
                  </Highlight>
                </p>
                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  {[
                    ["FSSAI", "Licensed food business"],
                    ["APEDA", "Registered exporter"],
                    ["ISO 22000", "Planned pipeline"],
                    ["HACCP", "Planned pipeline"],
                  ].map(([k, v]) => (
                    <div key={k} className="border-t border-hairline pt-4">
                      <div className="text-lg font-semibold text-ink">{k}</div>
                      <div className="mt-1 text-sm text-ink-soft">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* CTA band */}
      <section className="border-t border-hairline">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-20 lg:flex-row lg:items-center lg:px-10">
          <h2 className="max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            <Highlight>Ready to source your next container?</Highlight>
          </h2>
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
