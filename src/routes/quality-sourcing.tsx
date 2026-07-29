import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Highlight } from "@/components/highlight";
import { ArrowUpRight, CheckCircle2, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/quality-sourcing")({
  head: () => ({
    meta: [
      { title: "Quality & Sourcing Standards | MRL Compliance — Lokavia" },
      {
        name: "description",
        content:
          "Moisture control, mesh-size accuracy, and MRL compliance testing on every consignment — sourcing standards for international food-grade agri-commodity buyers.",
      },
      { property: "og:title", content: "Quality & Sourcing Standards | MRL Compliance — Lokavia" },
      {
        property: "og:description",
        content:
          "Moisture control, mesh-size accuracy, and MRL compliance testing on every consignment — sourcing standards for international food-grade agri-commodity buyers.",
      },
      { property: "og:image", content: "https://www.lokaviainternational.com/logo-light.png" },
      { property: "og:url", content: "https://www.lokaviainternational.com/quality-sourcing" },
      { property: "og:type", content: "website" },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: QualitySourcingPage,
});

function QualitySourcingPage() {
  return (
    <SiteShell>
      {/* 1. Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 lg:px-10 lg:pt-28">
        <div className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
          Standards & Vetting
        </div>
        <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
          Traceability and testing for
          <br />
          international supply chains.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
          <Highlight>
            We enforce consistent grades, analytical compliance, and container
            security on every consignment, ensuring raw materials align with your
            manufacturing standards.
          </Highlight>
        </p>
      </section>

      {/* 2. Sourcing Approach */}
      <section className="border-t border-hairline py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
                Sourcing Protocol
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Direct Origin Partnerships
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-lg leading-relaxed text-ink-soft">
                <Highlight>
                  Our sourcing strategy relies on direct partnerships with vetted
                  processors and agricultural suppliers in major producing hubs. By
                  working with processing units in Gujarat (onion and psyllium),
                  Madhya Pradesh (garlic), and Kerala/Assam (ginger), we eliminate
                  intermediary handling and secure consistent raw materials.
                </Highlight>
              </p>
              <p className="mt-6 text-base leading-relaxed text-ink-soft">
                <Highlight>
                  Every supplier partner is selected based on sanitary and phytosanitary
                  infrastructure, grading reliability, and compliance history.
                  This direct oversight allows us to maintain lot traceability
                  from processing to container dispatch.
                </Highlight>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Quality Control Process */}
      <section className="border-t border-hairline bg-[oklch(0.98_0.001_260)] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
                Testing & Analysis
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Laboratory Verification
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Consignments undergo analytical verification at ISO/IEC 17025 accredited
                laboratories to guarantee physical and chemical parameters.
              </p>
            </div>
            <div className="lg:col-span-8">
              {/* PLACEHOLDER: Lab names and specific testing bodies (e.g. SGS, Eurofins, or national testing agencies) to be finalized with clients */}
              <div className="grid gap-8 sm:grid-cols-3">
                <div className="bg-background rounded-xl border border-hairline p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-md">
                  <CheckCircle2 size={24} className="text-[var(--navy)]" strokeWidth={1.5} />
                  <h3 className="mt-4 text-base font-semibold text-ink">Moisture Control</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                    Verification of moisture levels to prevent caking and microbial activity: ≤ 6% for onion/garlic, ≤ 10% for ginger and psyllium.
                  </p>
                </div>
                <div className="bg-background rounded-xl border border-hairline p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-md">
                  <CheckCircle2 size={24} className="text-[var(--navy)]" strokeWidth={1.5} />
                  <h3 className="mt-4 text-base font-semibold text-ink">Mesh Size Accuracy</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                    Mechanical sieving confirms uniform particle distribution (60, 80, 100 mesh options) to match flow properties in dry blending.
                  </p>
                </div>
                <div className="bg-background rounded-xl border border-hairline p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-md">
                  <CheckCircle2 size={24} className="text-[var(--navy)]" strokeWidth={1.5} />
                  <h3 className="mt-4 text-base font-semibold text-ink">MRL Compliance</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                    Strict pesticide residue screening, heavy metals, and microbiological assay testing to meet EU and FDA import regulations.
                  </p>
                </div>
              </div>

              <div className="mt-10 rounded-xl border border-dashed border-hairline bg-background/50 p-6 flex items-start gap-4">
                <ShieldAlert size={20} className="text-[var(--orange)] shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-ink-soft">
                  <strong>Verification Standards:</strong> Third-party surveyor analysis (e.g., pre-shipment inspections) is available on demand. Batch certificates of analysis (COA) are generated and issued with every export container.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Packaging & Logistics */}
      <section className="border-t border-hairline py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
                Logistics & Cargo
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Containment Standards
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-lg leading-relaxed text-ink-soft">
                <Highlight>
                  Agri-commodities are highly sensitive to moisture and ambient conditions. We pack products in multi-wall kraft paper bags with food-grade polyethylene (PE) liners or durable woven bags. This packaging protects against external moisture during transit.
                </Highlight>
              </p>
              <p className="mt-6 text-base leading-relaxed text-ink-soft">
                Before stuffing, all shipping containers are checked for clean walls, absence of foreign odor, and water-tight seals. Palletization and strapping are executed according to international shipping norms to prevent shifts or damage inside the container.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-hairline bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
                Quality Control
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Verification FAQ
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div>
                <h3 className="text-lg font-semibold text-ink">
                  <Highlight>What quality checks does Lokavia perform before export?</Highlight>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  <Highlight>
                    Lokavia performs comprehensive pre-export quality checks: we verify moisture levels (≤ 6% for onion/garlic, ≤ 10% for ginger and psyllium) to prevent caking, perform mechanical sieving for mesh size accuracy (60, 80, 100 mesh options), and conduct pesticide residue screening (MRL), heavy metals, and microbiological assay testing at ISO/IEC 17025 accredited laboratories.
                  </Highlight>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Closing CTA */}
      <section className="border-t border-hairline bg-[oklch(0.985_0.002_260)]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-20 lg:flex-row lg:items-center lg:px-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              <Highlight>Ready to initiate your supply?</Highlight>
            </h2>
            <p className="mt-3 text-sm text-ink-soft">
              <Highlight>
                Request formal specifications or get an FOB/CIF price estimate for your volume.
              </Highlight>
            </p>
          </div>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--orange)] px-7 py-4 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-md hover:brightness-105 active:scale-[0.98] shrink-0"
          >
            Get a Quote <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
