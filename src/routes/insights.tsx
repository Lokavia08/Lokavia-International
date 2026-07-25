import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Highlight } from "@/components/highlight";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights & Industry News — Lokavia" },
      {
        name: "description",
        content:
          "Industry insights, supply chain trends, and agricultural commodity updates from the Lokavia team.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Insights & Industry News — Lokavia" },
      {
        property: "og:description",
        content: "Market reports and trade insights for dehydrated agri-commodities.",
      },
      { property: "og:image", content: "https://lokaviainternational.com/Logo%20Light.png" },
      { property: "og:url", content: "https://lokaviainternational.com/insights" },
    ],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-32 lg:px-10 lg:pt-36 lg:pb-48">
        <div className="border-l-2 border-[var(--orange)] pl-6 md:pl-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
            Resources & Insights
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Trade insights,
            <br />
            publishing soon.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
            <Highlight>
              We are building a library of reference guides covering agricultural export logistics, 
              quality compliance testing, and global sourcing parameters.
            </Highlight>
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-hairline p-6 bg-[oklch(0.98_0.001_260)]">
            <h3 className="text-base font-bold text-ink">Export Logistics</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft">
              Detailed reports on transit times, ocean freight handling, and container insulation 
              standards for temperature-sensitive cargo.
            </p>
          </div>
          <div className="rounded-xl border border-hairline p-6 bg-[oklch(0.98_0.001_260)]">
            <h3 className="text-base font-bold text-ink">Compliance Updates</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft">
              Factual summaries on MRL regulations, pesticide residue testing limits, and import 
              standards for EU and US markets.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
