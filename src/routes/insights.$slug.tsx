import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { getPost, mdToHtml, posts } from "@/lib/insights";
import { Highlight } from "@/components/highlight";
import { ArrowLeft } from "lucide-react";

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
            <Highlight>{post.excerpt}</Highlight>
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

        {/* Read More Section */}
        {otherPosts.length > 0 && (
          <footer className="mt-20 border-t border-hairline pt-12">
            <h3 className="text-xl font-extrabold text-ink">Read more insights</h3>
            <div className="grid gap-6 sm:grid-cols-2 mt-6">
              {otherPosts.map((op) => (
                <Link
                  key={op.slug}
                  to="/insights/$slug"
                  params={{ slug: op.slug }}
                  className="group block border border-hairline p-5 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-[var(--orange)]/30 transition-all duration-300"
                >
                  <span className="text-[10px] font-bold text-[var(--orange)] uppercase">
                    {new Date(op.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <h4 className="font-extrabold text-ink mt-1 group-hover:text-[var(--orange)] transition-colors duration-300 leading-snug">
                    {op.title}
                  </h4>
                </Link>
              ))}
            </div>
          </footer>
        )}
      </article>
    </SiteShell>
  );
}
