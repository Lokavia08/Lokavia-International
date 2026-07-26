import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Highlight } from "@/components/highlight";
import { posts } from "@/lib/insights";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Insights & Industry News — Lokavia" },
      {
        name: "description",
        content:
          "Industry insights, supply chain trends, and agricultural commodity updates from the Lokavia team.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Insights & Industry News — Lokavia" },
      {
        property: "og:description",
        content: "Market reports and trade insights for dehydrated agri-commodities.",
      },
      { property: "og:image", content: "https://www.lokaviainternational.com/Logo%20Light.png" },
      { property: "og:url", content: "https://www.lokaviainternational.com/insights" },
    ],
  }),
  component: InsightsPage,
});

/* ── helpers ── */

function getPostCategory(post: any): string {
  const t = (post.title || "").toLowerCase();
  if (t.includes("logistics") || t.includes("transit") || t.includes("shipping") || t.includes("packaging"))
    return "Logistics";
  if (t.includes("compliance") || t.includes("mrl") || t.includes("quality") || t.includes("testing"))
    return "Compliance";
  if (t.includes("sourcing") || t.includes("india") || t.includes("spice"))
    return "Sourcing";
  if (t.includes("psyllium") || t.includes("demand") || t.includes("market"))
    return "Market Trends";
  return "Industry News";
}

function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...Array.from(new Set(posts.map(getPostCategory)))];

  const filteredPosts = posts
    .filter((p) => activeCategory === "All" || getPostCategory(p) === activeCategory)
    .filter(
      (p) =>
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Latest 3 posts for sidebar
  const latestPosts = posts.slice(0, 3);

  // Unique tags derived from categories
  const allTags = Array.from(new Set(posts.map(getPostCategory)));

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-32 lg:px-10 lg:pt-36 lg:pb-48">
        {/* ── Page Header ── */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-ink-soft font-medium tracking-wide">
            <Link to="/" className="hover:text-[var(--orange)] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-ink font-semibold">Insights</span>
          </div>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            <Highlight>Ideas</Highlight> that <Highlight>Inspire</Highlight>.
          </h1>
        </div>

        {/* ── Results Bar ── */}
        <div className="flex items-center gap-4 mb-10 border-b border-hairline pb-4">
          <span className="text-xs text-ink-soft font-medium">
            Showing <span className="font-bold text-[var(--orange)]">{filteredPosts.length}</span> article{filteredPosts.length !== 1 ? "s" : ""}
          </span>
          {activeCategory !== "All" && (
            <button
              onClick={() => setActiveCategory("All")}
              className="text-xs font-semibold text-ink-soft hover:text-[var(--orange)] transition-colors ml-auto"
            >
              Clear filter ×
            </button>
          )}
        </div>

        {/* ── Two-Column Layout: Posts Grid + Sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* ── Left: Post Cards Grid ── */}
          <div className="lg:col-span-8">
            {filteredPosts.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <li key={post.slug} className="group">
                    <Link
                      to="/insights/$slug"
                      params={{ slug: post.slug }}
                      className="block"
                    >
                      {/* Image */}
                      {post.image && (
                        <div className="overflow-hidden rounded-xl bg-[oklch(0.97_0.003_260)] border border-hairline aspect-[4/3]">
                          <img
                            src={post.image}
                            alt={post.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        </div>
                      )}
                      {/* Meta */}
                      <div className="mt-4">
                        <h2 className="text-base font-extrabold text-ink leading-snug transition-colors duration-300 group-hover:text-[var(--orange)]">
                          {post.title}
                        </h2>
                        <p className="mt-2 text-xs text-ink-soft">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}{" "}
                          <span className="text-ink-soft/60">by</span>{" "}
                          <span className="font-semibold text-[var(--orange)]">Lokavia Team</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-20 border border-dashed border-hairline rounded-2xl">
                <h3 className="text-lg font-bold text-ink">No articles found</h3>
                <p className="mt-2 text-sm text-ink-soft">
                  Try a different search term or select "All" to see all articles.
                </p>
              </div>
            )}
          </div>

          {/* ── Right: Sidebar ── */}
          <aside className="lg:col-span-4 space-y-10">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-hairline bg-white px-4 py-3 pr-10 text-sm text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-[var(--orange)]/30 focus:border-[var(--orange)]/50 transition-all"
              />
              <Search
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft/50"
              />
            </div>

            {/* All Categories */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-ink mb-4">
                All Categories
              </h3>
              <ul className="space-y-2.5">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <li key={cat}>
                      <button
                        onClick={() => setActiveCategory(cat)}
                        className={`flex items-center gap-2 text-sm transition-colors duration-200 w-full text-left ${
                          isActive
                            ? "text-[var(--orange)] font-bold"
                            : "text-ink-soft hover:text-ink font-medium"
                        }`}
                      >
                        {isActive && <span className="text-[var(--orange)]">→</span>}
                        <span>{cat === "All" ? "All Topics" : cat}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Latest Posts */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-ink mb-4">
                Latest Posts
              </h3>
              <ul className="space-y-5">
                {latestPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      to="/insights/$slug"
                      params={{ slug: post.slug }}
                      className="group flex items-start gap-4"
                    >
                      {post.image && (
                        <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-[oklch(0.97_0.003_260)] border border-hairline">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="min-w-0">
                        <span className="text-[10px] text-ink-soft font-medium">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <h4 className="text-sm font-bold text-ink leading-snug mt-0.5 group-hover:text-[var(--orange)] transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h4>
                        <span className="text-[10px] text-ink-soft/60 mt-0.5 block">
                          by <span className="font-semibold text-ink-soft">Lokavia Team</span>
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Tags */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-ink mb-4">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveCategory(tag)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 ${
                      activeCategory === tag
                        ? "bg-[var(--navy)] text-white shadow-sm"
                        : "bg-[oklch(0.97_0.003_260)] border border-hairline text-ink-soft hover:bg-[var(--navy)] hover:text-white hover:border-transparent"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
