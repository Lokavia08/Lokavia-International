import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Highlight } from "@/components/highlight";

export const Route = createFileRoute("/terms-of-use")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Lokavia" },
      {
        name: "description",
        content: "Terms and conditions governing the use of Lokavia's website and commercial inquiries.",
      },
      { property: "og:title", content: "Terms of Use — Lokavia" },
      {
        property: "og:description",
        content: "Commercial terms of use for Lokavia.",
      },
      { property: "og:image", content: "https://lokaviainternational.com/Logo%20Light.png" },
      { property: "og:url", content: "https://lokaviainternational.com/terms-of-use" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TermsOfUsePage,
});

function TermsOfUsePage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-24 lg:px-10 lg:pt-28">
        <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
          Legal & Compliance
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Terms of Use
        </h1>
        <p className="mt-2 text-sm text-ink-soft">Last Updated: July 2026</p>

        {/* Terms Body */}
        <div className="mt-12 space-y-8 text-sm leading-relaxed text-ink-soft border-t border-hairline pt-8">
          <div>
            <h2 className="text-lg font-bold text-ink mb-3">1. Acceptable Use</h2>
            <p>
              <Highlight>
                This website is provided for legitimate sourcing, trade inquiries, and catalog viewing purposes. 
                You agree not to engage in any automated scraping of website data, attempt unauthorized vulnerability tests, 
                or submit false or fraudulent contact details via the Request for Quote (RFQ) interface.
              </Highlight>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">2. Intellectual Property</h2>
            <p>
              <Highlight>
                All text, custom graphics, logo designs, spec sheets, and catalog details displayed on this website are the intellectual 
                property of Lokavia International. Reproduction, copying, or redistribution of these assets for commercial purposes 
                without prior written consent is prohibited.
              </Highlight>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">3. RFQ Submissions & Non-Binding Status</h2>
            <p>
              Submitting a Request for Quote (RFQ) through this website does not constitute a binding trade contract, purchase order, 
              or commercial commitment. All quotations, specifications, shipping dates, and pricing are finalized only upon the formal 
              issuance and countersigning of a Proforma Invoice (PI) and Sales Contract.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">4. Limitation of Liability</h2>
            <p>
              <Highlight>
                Lokavia International provides this website "as is" and makes no guarantees regarding the continuous availability or 
                error-free state of the platform. We are not liable for any direct or indirect business disruptions, loss of data, 
                or shipping delay disputes arising from the use of, or inability to access, this website.
              </Highlight>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">5. Governing Law</h2>
            <p>
              These Terms of Use are governed by the laws of India. Any legal disputes or claims arising out of the use of this website 
              shall be subject to the exclusive jurisdiction of the competent courts in Surat, Gujarat, India.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
