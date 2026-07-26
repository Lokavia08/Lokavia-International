import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Highlight } from "@/components/highlight";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Lokavia" },
      {
        name: "description",
        content: "Lokavia International's privacy policy regarding data collection, processing, and GDPR compliance.",
      },
      { property: "og:title", content: "Privacy Policy — Lokavia" },
      {
        property: "og:description",
        content: "Learn how we protect and process your data.",
      },
      { property: "og:image", content: "https://www.lokaviainternational.com/Logo%20Light.png" },
      { property: "og:url", content: "https://www.lokaviainternational.com/privacy-policy" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-24 lg:px-10 lg:pt-28">
        <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
          Legal & Compliance
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-ink-soft">Last Updated: July 2026</p>

        {/* Policy Body */}
        <div className="mt-12 space-y-8 text-sm leading-relaxed text-ink-soft border-t border-hairline pt-8">
          <div>
            <h2 className="text-lg font-bold text-ink mb-3">1. Data Collected via RFQ Form</h2>
            <p>
              <Highlight>
                We collect personal and professional information directly submitted through our Request for Quote (RFQ) form. 
                This information includes:
              </Highlight>
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
              <li>Full name and company</li>
              <li>Work email address</li>
              <li>Phone number</li>
              <li>Selected commodity (SKU)</li>
              <li>Target order volume</li>
              <li>Destination country</li>
              <li>Additional message and requirements</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">2. Data Storage & System Integration</h2>
            <p>
              Information submitted through the RFQ form is securely stored and synchronized with a private Google Sheets database 
              managed internally. This setup is utilized strictly for lead management, preparation of Proforma Invoices (PI), 
              and coordinating logistics.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">3. Third-Party Sharing</h2>
            <p>
              <Highlight>
                We do not sell, rent, trade, or share your contact details or procurement records with outside marketers or third parties. 
                Data is shared internally with the Lokavia export desk and, where required by law, with regulatory and customs authorities 
                to facilitate international trade compliance.
              </Highlight>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">4. Cookies & Web Analytics</h2>
            <p>
              This website plans to utilize Google Analytics 4 (GA4) to evaluate web traffic and visitor patterns. When active, GA4 
              collects anonymized data (including pages visited, geographic location by country, and session duration) via standard 
              browser cookies.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">5. <Highlight>Your</Highlight> Rights & Contact Method</h2>
            <p>
              <Highlight>
                Under relevant privacy laws, you have the right to request access to the information we hold about your business, 
                request corrections, or request complete deletion of your lead data from our records. For any such requests or 
                privacy-related questions, contact us at:
              </Highlight>
            </p>
            <p className="mt-2 font-semibold text-ink">
              info@lokaviainternational.com
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
