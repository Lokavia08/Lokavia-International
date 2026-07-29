import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Highlight } from "../components/highlight";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="max-w-md">
        <div className="text-xs font-semibold uppercase tracking-widest text-[var(--orange)]">
          Error 404
        </div>
        <h1 className="mt-6 text-5xl font-bold tracking-tight text-ink sm:text-6xl">
          Page not found.
        </h1>
        <p className="mt-6 text-base leading-relaxed text-ink-soft">
          <Highlight>
            The page you are looking for does not exist or has been moved. If you are looking for export pricing, spec sheets, or ordering details, please request a quote.
          </Highlight>
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-hairline px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
          >
            Return to Homepage
          </Link>
          <Link
            to="/quote"
            className="inline-flex items-center justify-center rounded-full bg-[var(--orange)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Get a Quote →
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          <Highlight>This page didn't load</Highlight>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          <Highlight>
            Something went wrong on our end. You can try refreshing or head back home.
          </Highlight>
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lokavia — Agri-Commodity Exports for Global Buyers" },
      {
        name: "description",
        content:
          "Lokavia supplies international buyers with premium dehydrated agri-commodities — onion powder, garlic powder, ginger powder, and psyllium husk — at export scale.",
      },
      { name: "author", content: "Lokavia" },
      { property: "og:title", content: "Lokavia — Agri-Commodity Exports" },
      {
        property: "og:description",
        content:
          "Premium dehydrated agri-commodities for global buyers, shipped at export scale.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/svg+xml", href: "/logo-light.svg" },
      { rel: "apple-touch-icon", href: "/logo-light.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Lokavia",
    "legalName": "Lokavia International",
    "url": "https://www.lokaviainternational.com",
    "logo": "https://www.lokaviainternational.com/logo-light.png",
    "email": "info@lokaviainternational.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "addressCountry": "IN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "info@lokaviainternational.com",
        "areaServed": "worldwide",
        "availableLanguage": ["English", "Hindi"]
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/lokavia"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Lokavia International",
    "url": "https://www.lokaviainternational.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.lokaviainternational.com/products?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EDNW8C018L" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EDNW8C018L');
            `,
          }}
        />
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Analytics />
      <SpeedInsights />
    </QueryClientProvider>
  );
}
