import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Highlight } from "@/components/highlight";
import { ArrowUpRight, ShieldCheck, Ship, Sprout } from "lucide-react";
import heroExportImg from "@/assets/hero-export.jpg";
import exportLogisticsImg from "@/assets/export-logistics.png";
import qualityTestingImg from "@/assets/quality-testing.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Lokavia" },
      {
        name: "description",
        content:
          "Learn about Lokavia's commitment to quality, B2B export logistics, and global sourcing compliance.",
      },
      { property: "og:title", content: "About Us — Lokavia" },
      {
        property: "og:description",
        content:
          "Sourcing agri-commodities for the global food sector with strict compliance.",
      },
      { property: "og:image", content: "https://www.lokaviainternational.com/logo-light.png" },
      { property: "og:url", content: "https://www.lokaviainternational.com/about" },
      { property: "og:type", content: "website" },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      {/* 1. Hero Section */}
      <section className="bg-background px-6 pt-20 pb-20 lg:px-10 lg:pt-32 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink-soft">
              <span className="h-px w-8 bg-ink" />
              About <Highlight>Lokavia</Highlight>
              <span className="h-px w-8 bg-ink" />
            </div>
            <h1 className="mt-8 text-5xl font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Sourcing agri-commodities for the global food sector.
            </h1>
            <p className="mt-8 mx-auto max-w-2xl text-lg leading-relaxed text-ink-soft">
              <Highlight>
                Lokavia supplies dehydrated vegetables, spices, and nutraceutical fibre
                to food manufacturers and distributors across 20+ countries at industrial scale.
              </Highlight>
            </p>
          </div>
        </div>
      </section>

      {/* 2. Curved Photo Section (Fully covered by heroExportImg, with stat card inside) */}
      <section className="relative w-full h-[540px] md:h-[630px] lg:h-[750px] bg-background">
        {/* Inner container with overflow-hidden for image and SVGs */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={heroExportImg}
            alt="Lokavia export port logistics and shipping containers"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Top Curve Overlay - starts high at sides, curves/dips down in center */}
          <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
            <svg
              viewBox="0 0 1440 120"
              preserveAspectRatio="none"
              className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[120px] text-background"
            >
              <path d="M0,0 L1440,0 Q720,120 0,0 Z" fill="currentColor" />
            </svg>
          </div>

          {/* Bottom Curve Overlay - curves upward to complete the lens/hourglass shape */}
          <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
            <svg
              viewBox="0 0 1440 120"
              preserveAspectRatio="none"
              className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[120px] text-background"
            >
              <path d="M0,120 Q720,0 1440,120 Z" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Floating Stat Card (centered inside the photo container) */}
        <div className="absolute inset-0 flex items-center justify-center z-20 px-6">
          <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl border border-hairline overflow-hidden">
            {/* Row 1 - Darkest background */}
            <div className="bg-ink text-white flex flex-col sm:flex-row sm:items-center justify-between p-8 md:p-10 gap-6">
              <div className="flex items-center gap-6 min-w-[160px]">
                <span className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--orange)]">4</span>
                <div className="w-px h-14 bg-white/20 hidden sm:block" />
              </div>
              <div className="flex-1 text-base md:text-lg text-gray-300">
                Flagship SKU Commodities
                <br />
                <span className="text-sm text-gray-400">Dehydrated Onion, Garlic, Ginger, & Psyllium Husk</span>
              </div>
              <span className="inline-block self-start sm:self-center rounded-full bg-white/10 text-white border border-white/20 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider">
                Export Scale
              </span>
            </div>

            {/* Row 2 - Medium background */}
            <div className="bg-[oklch(0.45_0.006_260)] text-white flex flex-col sm:flex-row sm:items-center justify-between p-8 md:p-10 gap-6">
              <div className="flex items-center gap-6 min-w-[160px]">
                <span className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--orange)]">20+</span>
                <div className="w-px h-14 bg-white/20 hidden sm:block" />
              </div>
              <div className="flex-1 text-base md:text-lg text-gray-200">
                Target Export Markets
                <br />
                <span className="text-sm text-gray-300">Priority regions in Southeast Asia, Europe, and Americas</span>
              </div>
              <span className="inline-block self-start sm:self-center rounded-full bg-white/10 text-white border border-white/20 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider">
                Global Outreach
              </span>
            </div>

            {/* Row 3 - Lightest background */}
            <div className="bg-[oklch(0.95_0.003_260)] text-ink flex flex-col sm:flex-row sm:items-center justify-between p-8 md:p-10 gap-6">
              <div className="flex items-center gap-6 min-w-[160px]">
                <span className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--orange)]">Active</span>
                <div className="w-px h-14 bg-ink/20 hidden sm:block" />
              </div>
              <div className="flex-1 text-base md:text-lg text-ink-soft">
                IEC & GST Registrations
                <br />
                <span className="text-sm text-ink-soft/80">Fully registered with DGFT and Ministry of Finance</span>
              </div>
              <span className="inline-block self-start sm:self-center rounded-full bg-ink/10 text-ink border border-ink/20 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider">
                DGFT Verified
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision (Moved outside the curve area into its own separate white background section) */}
      <section className="bg-background px-6 pt-24 pb-24 lg:px-10 lg:pt-32 lg:pb-32">
        <div className="mx-auto max-w-7xl space-y-24 lg:space-y-36">
          {/* Row 01: Mission */}
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center justify-between border-b border-hairline pb-4">
                <span className="text-sm font-semibold uppercase tracking-widest text-ink-soft">
                  <Highlight>Our Mission</Highlight>
                </span>
                <span className="text-xs uppercase tracking-widest text-ink-soft font-mono">
                  01
                </span>
              </div>
              <p className="text-lg leading-relaxed text-ink-soft">
                <Highlight>
                  We build traceable, dependable origin pipelines for food manufacturers who require
                  consistent grades, clean paperwork, and predictable shipping timelines. By partnering
                  directly with farmers and processors in major agricultural belts, we ensure quality control
                  from procurement to dispatch.
                </Highlight>
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl bg-[oklch(0.97_0.003_260)]">
                <img
                  src={exportLogisticsImg}
                  alt="Pallets of packaged spices inside a clean export logistics warehouse showing export readiness"
                  width={1200}
                  height={800}
                  className="aspect-[3/2] w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Row 02: Vision */}
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 lg:order-2 space-y-6">
              <div className="flex items-center justify-between border-b border-hairline pb-4">
                <span className="text-sm font-semibold uppercase tracking-widest text-ink-soft">
                  <Highlight>Our Vision</Highlight>
                </span>
                <span className="text-xs uppercase tracking-widest text-ink-soft font-mono">
                  02
                </span>
              </div>
              <p className="text-lg leading-relaxed text-ink-soft">
                <Highlight>
                  To expand our export catalogue systematically into additional agricultural commodity categories
                  while maintaining a single, uncompromised standard of compliance, container loading quality, and
                  analytical testing on every consignment.
                </Highlight>
              </p>
            </div>
            <div className="lg:col-span-6 lg:order-1">
              <div className="overflow-hidden rounded-2xl bg-[oklch(0.97_0.003_260)]">
                <img
                  src={qualityTestingImg}
                  alt="Modern quality control testing laboratory for dehydrated powders"
                  width={1200}
                  height={800}
                  className="aspect-[3/2] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Registrations Section */}
      <section className="border-t border-hairline bg-[oklch(0.98_0.001_260)] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
                Verification & Status
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink">
                Compliance & Registrations
              </h2>
              <p className="mt-4 text-sm text-ink-soft leading-relaxed">
                <Highlight>
                  We operate with absolute transparency. Here is the verified status of our export licensing
                  and food safety certifications.
                </Highlight>
              </p>
            </div>
            <div className="lg:col-span-8 grid gap-4 sm:grid-cols-2">
              {/* Real / Active Registrations */}
              <div className="border border-hairline bg-background rounded p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-md">
                <span className="inline-block rounded bg-[oklch(0.92_0.04_140)] text-[oklch(0.35_0.08_140)] px-2 py-0.5 text-xs font-semibold tracking-wider uppercase mb-3">
                  Active
                </span>
                <h3 className="text-lg font-bold text-ink">IEC (Import Export Code)</h3>
                <p className="mt-1 text-xs text-ink-soft">Registered with DGFT, Ministry of Commerce & Industry.</p>
              </div>

              <div className="border border-hairline bg-background rounded p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-md">
                <span className="inline-block rounded bg-[oklch(0.92_0.04_140)] text-[oklch(0.35_0.08_140)] px-2 py-0.5 text-xs font-semibold tracking-wider uppercase mb-3">
                  Active
                </span>
                <h3 className="text-lg font-bold text-ink">GST Registration</h3>
                <p className="mt-1 text-xs text-ink-soft">Registered in Gujarat state for commercial operations.</p>
              </div>

              <div className="border border-hairline bg-background rounded p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-md">
                <span className="inline-block rounded bg-[oklch(0.92_0.04_140)] text-[oklch(0.35_0.08_140)] px-2 py-0.5 text-xs font-semibold tracking-wider uppercase mb-3">
                  Active
                </span>
                <h3 className="text-lg font-bold text-ink">FSSAI</h3>
                <p className="mt-1 text-xs text-ink-soft">Food safety and standards licensing for food business operations.</p>
              </div>

              {/* In Progress Registrations */}
              <div className="border border-hairline bg-background rounded p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-md">
                <span className="inline-block rounded bg-[oklch(0.94_0.03_70)] text-[oklch(0.5_0.1_50)] px-2 py-0.5 text-xs font-semibold tracking-wider uppercase mb-3">
                  In Progress
                </span>
                <h3 className="text-lg font-bold text-ink">APEDA Registration</h3>
                <p className="mt-1 text-xs text-ink-soft">Agricultural and Processed Food Products Export Development Authority.</p>
              </div>

              {/* Planned / Placeholder Certifications */}
              {/* NOTE: ISO and HACCP are placeholders and not yet held by the entity. Marked as planned. */}
              <div className="border border-hairline bg-background rounded p-6 opacity-75 transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-md hover:opacity-90">
                <span className="inline-block rounded bg-muted text-muted-foreground px-2 py-0.5 text-xs font-semibold tracking-wider uppercase mb-3">
                  Planned Pipeline
                </span>
                <h3 className="text-lg font-bold text-ink">ISO 22000 & HACCP</h3>
                <p className="mt-1 text-xs text-ink-soft">Planned implementation of Food Safety Management System standards post-facility setup.</p>
              </div>

              <div className="border border-hairline bg-background rounded p-6 opacity-75 transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-md hover:opacity-90">
                <span className="inline-block rounded bg-muted text-muted-foreground px-2 py-0.5 text-xs font-semibold tracking-wider uppercase mb-3">
                  Planned Pipeline
                </span>
                <h3 className="text-lg font-bold text-ink">US FDA Facility Registration</h3>
                <p className="mt-1 text-xs text-ink-soft">Planned facility registration ahead of North American shipments.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Values / Why Lokavia Section (Dark layout) */}
      <section className="bg-ink text-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--orange)]">
              OPERATIONAL STANDARDS
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              <Highlight>Why global buyers partner with us.</Highlight>
            </h2>
            <p className="mt-6 text-base text-gray-400 leading-relaxed">
              <Highlight>
                We design our business around the operational realities of international procurement desks.
              </Highlight>
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Sprout,
                title: "Traceability at Source",
                description:
                  "We coordinate sourcing directly from farms and partner dehydrators across Gujarat, Madhya Pradesh, Kerala, and Assam.",
              },
              {
                icon: ShieldCheck,
                title: "Analytical Testing",
                description:
                  "Strict laboratory checks on critical specs like moisture percentage, microbiology profile, and particle size mesh.",
              },
              {
                icon: Ship,
                title: "Export Logistics",
                description:
                  "Professional container stuffing, moisture-barrier bulk packaging linings, and sea freight handling from major ports.",
              },
            ].map((pillar) => (
              <div key={pillar.title} className="border border-hairline/10 bg-background/5 p-8 rounded-lg transition-all duration-300 hover:border-hairline/25 hover:bg-background/10 hover:-translate-y-1 group">
                <pillar.icon size={28} className="text-[var(--orange)] transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                <h3 className="mt-6 text-xl font-semibold">{pillar.title}</h3>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                  <Highlight>{pillar.description}</Highlight>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-hairline bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
                Common Questions
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-10">
              {[
                {
                  q: "What does Lokavia export?",
                  a: "Lokavia exports four primary dehydrated agri-commodities: onion powder, garlic powder, ginger powder, and psyllium husk. We supply these ingredients in bulk to food manufacturers, ingredient distributors, and private-label brands globally."
                },
                {
                  q: "Where is Lokavia based?",
                  a: "Lokavia is headquartered in Surat, Gujarat, India."
                },
                {
                  q: "Is Lokavia a manufacturer or a trading company?",
                  a: "Lokavia is a merchant exporter — sourcing directly from vetted growers and processors, managing quality verification, and handling export documentation and logistics on behalf of international buyers."
                },
                {
                  q: "What certifications does Lokavia hold?",
                  a: "Lokavia currently holds active Import Export Code (IEC), GST, and FSSAI registrations. Additional export registrations like APEDA are in progress, while ISO 22000, HACCP, and US FDA facility registrations are in our planned pipeline."
                }
              ].map((faq) => (
                <div key={faq.q} className="border-b border-hairline pb-8 last:border-0 last:pb-0">
                  <h3 className="text-lg font-semibold text-ink"><Highlight>{faq.q}</Highlight></h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft"><Highlight>{faq.a}</Highlight></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Closing CTA Band */}
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
