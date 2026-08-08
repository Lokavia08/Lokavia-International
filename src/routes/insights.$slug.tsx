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
  const otherPosts = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl px-6 pt-12 pb-24 lg:pt-16 lg:pb-32">
        {/* Back navigation */}
        <Link
          to="/insights"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-[var(--orange)] transition-colors duration-300 mb-8"
        >
          <ArrowLeft size={16} /> Back to Insights
        </Link>

        {/* Article Header */}
        <header className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--orange)]">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft italic">
            <TextHighlight>{post.excerpt}</TextHighlight>
          </p>
        </header>

        {/* Cover Image */}
        {post.image && (
          <div className="overflow-hidden rounded-2xl border border-hairline shadow-md mb-12 bg-[oklch(0.97_0.003_260)] aspect-video">
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

        {/* Suggested Articles Section */}
        {otherPosts.length > 0 && (
          <footer className="mt-20 border-t border-hairline pt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--orange)]">
                  Continue Reading
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl mt-1">
                  Suggested Articles
                </h3>
              </div>
              <Link
                to="/insights"
                className="hidden text-sm font-semibold text-ink hover:text-[var(--orange)] sm:inline-flex items-center gap-1 transition-colors"
              >
                View all insights <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {otherPosts.map((op) => (
                <Link
                  key={op.slug}
                  to="/insights/$slug"
                  params={{ slug: op.slug }}
                  className="group flex flex-col overflow-hidden border border-hairline rounded-2xl bg-white shadow-sm hover:shadow-md hover:border-[var(--orange)]/40 transition-all duration-300 hover:-translate-y-0.5"
                >
                  {op.image && (
                    <div className="aspect-[16/9] w-full overflow-hidden bg-[oklch(0.97_0.003_260)]">
                      <img
                        src={op.image}
                        alt={op.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--orange)]">
                      {new Date(op.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <h4 className="mt-2 text-lg font-bold text-ink group-hover:text-[var(--orange)] transition-colors leading-snug line-clamp-2">
                      {op.title}
                    </h4>
                    {op.excerpt && (
                      <p className="mt-2 text-xs leading-relaxed text-ink-soft line-clamp-2">
                        {op.excerpt}
                      </p>
                    )}
                    <div className="mt-4 pt-4 border-t border-hairline/60 flex items-center gap-1 text-xs font-semibold text-ink group-hover:text-[var(--orange)] transition-colors">
                      Read article <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </footer>
        )}
      </article>
    </SiteShell>
  );
}
