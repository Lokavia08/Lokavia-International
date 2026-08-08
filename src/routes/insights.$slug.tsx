import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { getPost, mdToHtml, posts } from "@/lib/insights";
import { TextHighlight } from "@/components/highlight";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article not found — Lokavia" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | Lokavia Insights` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: `${post.title} | Lokavia Insights` },
        { property: "og:description", content: post.excerpt },
        { property: "og:image", content: post.image ? `https://www.lokaviainternational.com${post.image}` : "" },
        { property: "og:url", content: `https://www.lokaviainternational.com/insights/${post.slug}` },
        { property: "og:type", content: "article" },
        { name: "robots", content: "index, follow" },
      ],
      links: [
        { rel: "canonical", href: `https://www.lokaviainternational.com/insights/${post.slug}` },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-4xl font-bold text-ink">Article not found</h1>
        <p className="mt-4 text-ink-soft">
          This article is not currently published.
        </p>
        <Link
          to="/insights"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:opacity-70"
        >
          <ArrowLeft size={16} /> Back to Insights
        </Link>
      </div>
    </SiteShell>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData() as { post: any };
  const htmlContent = mdToHtml(post.body);
  const otherPosts = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 lg:pt-14 lg:pb-32">
        {/* Back navigation */}
        <Link
          to="/insights"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-[var(--orange)] transition-colors duration-300 mb-8"
        >
          <ArrowLeft size={16} /> Back to Insights
        </Link>

        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Main Article Content */}
          <article className="lg:col-span-8">
            {/* Article Header */}
            <header className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--orange)]">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-ink sm:leading-tight">
                {post.title}
              </h1>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink-soft italic">
                <TextHighlight>{post.excerpt}</TextHighlight>
              </p>
            </header>

            {/* Cover Image */}
            {post.image && (
              <div className="overflow-hidden rounded-2xl border border-hairline shadow-sm mb-10 bg-[oklch(0.97_0.003_260)] aspect-video">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Body */}
            <div 
              className="prose prose-slate max-w-none text-ink-soft"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 sticky top-24 space-y-8">
            {/* Suggested Articles Sidebar Widget */}
            {otherPosts.length > 0 && (
              <div className="rounded-2xl border border-hairline p-6 bg-background/50 shadow-sm">
                <div className="flex items-center justify-between border-b border-hairline pb-4 mb-5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-ink">
                    Suggested Articles
                  </h3>
                  <Link
                    to="/insights"
                    className="text-xs font-semibold text-[var(--orange)] hover:underline flex items-center gap-1"
                  >
                    View all <ArrowRight size={12} />
                  </Link>
                </div>

                <div className="space-y-4">
                  {otherPosts.map((op) => (
                    <Link
                      key={op.slug}
                      to="/insights/$slug"
                      params={{ slug: op.slug }}
                      className="group flex gap-3 p-3 rounded-xl hover:bg-white hover:border hover:border-hairline hover:shadow-sm transition-all duration-200"
                    >
                      {op.image && (
                        <div className="w-16 h-16 shrink-0 overflow-hidden rounded-lg bg-[oklch(0.97_0.003_260)] border border-hairline">
                          <img
                            src={op.image}
                            alt={op.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="flex flex-col justify-center min-w-0">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--orange)]">
                          {new Date(op.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <h4 className="text-xs font-bold text-ink group-hover:text-[var(--orange)] transition-colors leading-snug line-clamp-2 mt-0.5">
                          {op.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Quote CTA Box */}
            <div className="rounded-2xl border border-hairline p-6 bg-white shadow-sm text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--orange)]">
                B2B Bulk Supply
              </span>
              <h4 className="mt-2 text-lg font-bold text-ink">
                Looking for Export Pricing?
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                Get custom specification sheets, COA samples, and FOB/CIF quotes within 24 hours.
              </p>
              <Link
                to="/quote"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--orange)] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:brightness-105"
              >
                Request a Quote <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}
