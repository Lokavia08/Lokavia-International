import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { TextHighlight } from "@/components/highlight";
import { posts } from "@/lib/insights";
import {
  ArrowRight,
  Search,
  FileText,
  Sparkles,
  Rocket,
  Building2,
  Package,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Trade Insights & Export Guides | Lokavia" },
      {
        name: "description",
        content:
          "Guides on agri-commodity export logistics, quality compliance, MRL testing, and global sourcing trends from the Lokavia team.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Trade Insights & Export Guides | Lokavia" },
      {
        property: "og:description",
        content:
          "Guides on agri-commodity export logistics, quality compliance, MRL testing, and global sourcing trends from the Lokavia team.",
      },
      { property: "og:image", content: "https://www.lokaviainternational.com/logo-light.png" },
      { property: "og:url", content: "https://www.lokaviainternational.com/insights" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://www.lokaviainternational.com/insights" },
    ],
  }),
  component: InsightsPage,
});

/* ── Category & Icon helper ── */
interface CategoryMeta {
  name: string;
  icon: any;
}

const CATEGORY_MAP: Record<string, CategoryMeta> = {
  All: { name: "All Articles", icon: FileText },
  Spotlight: { name: "Spotlight", icon: Sparkles },
  "Product Updates": { name: "Product Updates", icon: Rocket },
  Company: { name: "Company", icon: Building2 },
  Productivity: { name: "Productivity", icon: Package },
};

function getPostCategory(post: any): string {
  const t = (post.title || "").toLowerCase();
  const slug = (post.slug || "").toLowerCase();

  if (slug.includes("psyllium") || t.includes("nutraceutical") || t.includes("spotlight")) {
    return "Spotlight";
  }
  if (slug.includes("onion-powder-vs-flakes") || slug.includes("garlic-powder") || t.includes("specifications")) {
    return "Product Updates";
  }
  if (slug.includes("how-to-import") || t.includes("logistics") || t.includes("import")) {
    return "Company";
  }
  return "Productivity";
}

function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Spotlight", "Product Updates", "Company", "Productivity"];

  const filteredPosts = posts
    .filter((p) => activeCategory === "All" || getPostCategory(p) === activeCategory)
    .filter(
      (p) =>
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <SiteShell>
      <div className="bg-[#F8F9FA] min-h-screen py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ── Top Hero Banner (Matching Reference Image) ── */}
          <div className="relative rounded-3xl bg-white border border-slate-200/80 p-8 sm:p-12 lg:p-16 text-center shadow-2xs mb-10 sm:mb-14 overflow-hidden">
            {/* Subtle ambient light gradient background effect */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--orange)]/5 blur-3xl rounded-full pointer-events-none" />

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100/80 border border-slate-200/90 text-slate-700 mx-auto mb-4">
              <FileText size={13} className="text-slate-500" />
              <span>Blog</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Insight and Updates
            </h1>

            {/* Subtitle */}
            <p className="mt-4 max-w-2xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed">
              <TextHighlight>
                A collection of hand-picked articles for buyers, by industry experts. Deep dives, insights, and honest advice to navigate the global agri-commodity landscape.
              </TextHighlight>
            </p>
          </div>

          {/* ── Section Title & Filter Bar ── */}
          <div className="space-y-6 mb-8">
            {/* Section Header */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                All Articles
              </h2>
              <p className="mt-1 text-sm text-slate-500 max-w-3xl">
                <TextHighlight>
                  Find or list articles that will help buyers scale with confidence. Simplify sourcing with our technical guides and carefully vetted library from the start.
                </TextHighlight>
              </p>
            </div>

            {/* Search + Category Filter Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
              {/* Search Input Box */}
              <div className="relative w-full md:w-80 shrink-0">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/90 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--orange)]/20 focus:border-[var(--orange)] shadow-2xs transition-all"
                />
              </div>

              {/* Filter Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                {categories.map((catKey) => {
                  const meta = CATEGORY_MAP[catKey] || { name: catKey, icon: FileText };
                  const IconComponent = meta.icon;
                  const isActive = activeCategory === catKey;

                  return (
                    <button
                      key={catKey}
                      onClick={() => setActiveCategory(catKey)}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                        isActive
                          ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                          : "bg-white text-slate-600 border-slate-200/90 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <IconComponent
                        size={13}
                        className={isActive ? "text-amber-400" : "text-slate-400"}
                      />
                      <span>{meta.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Article Cards Grid ── */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post) => {
                const category = getPostCategory(post);
                const meta = CATEGORY_MAP[category] || { name: category, icon: FileText };
                const IconComponent = meta.icon;

                return (
                  <article
                    key={post.slug}
                    className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <Link
                      to="/insights/$slug"
                      params={{ slug: post.slug }}
                      className="block flex-1 flex flex-col"
                    >
                      {/* Card Cover Image */}
                      {post.image && (
                        <div className="rounded-xl overflow-hidden aspect-[16/10] bg-slate-100 mb-4 border border-slate-100">
                          <img
                            src={post.image}
                            alt={post.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      {/* Meta Line: Category Badge + Date */}
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2.5">
                        <span className="inline-flex items-center gap-1 font-bold text-[var(--orange)]">
                          <IconComponent size={13} />
                          <span>{meta.name}</span>
                        </span>
                        <span className="text-slate-300">•</span>
                        <span>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-[var(--orange)] transition-colors line-clamp-2 mb-2">
                        <TextHighlight>{post.title}</TextHighlight>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6 flex-1">
                        <TextHighlight>{post.excerpt}</TextHighlight>
                      </p>
                    </Link>

                    {/* Learn More Link Footer */}
                    <div className="pt-2 border-t border-slate-100">
                      <Link
                        to="/insights/$slug"
                        params={{ slug: post.slug }}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[var(--orange)] group-hover:translate-x-1 transition-transform"
                      >
                        <span>Learn More</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-2xl">
              <h3 className="text-lg font-bold text-slate-900">No articles found</h3>
              <p className="mt-2 text-sm text-slate-500">
                Try a different search term or select "All Articles" to see all posts.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </SiteShell>
  );
}
