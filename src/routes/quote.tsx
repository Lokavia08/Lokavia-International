import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteShell } from "@/components/site-shell";
import { Highlight } from "@/components/highlight";
import { products } from "@/lib/products";
import { Check, Mail, MapPin, Phone } from "lucide-react";
import { trackRfqSubmission } from "@/lib/analytics";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get a Quote — Lokavia" },
      {
        name: "description",
        content:
          "Request an export quote from Lokavia. Share your volumes, destination port, and packaging needs — we respond within one business day.",
      },
      { property: "og:title", content: "Get a Quote — Lokavia" },
      {
        property: "og:description",
        content: "Request an export quote for bulk agri-commodities.",
      },
      { property: "og:image", content: "https://lokaviainternational.com/Logo%20Light.png" },
      { property: "og:url", content: "https://lokaviainternational.com/quote" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: QuotePage,
});

function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    // Honeypot spam check
    if (formData.get("website")) {
      setSubmitted(true);
      setSubmitting(false);
      return;
    }

    const data = Object.fromEntries(formData.entries());
    delete data.website;

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbz6ecmQmrQSpC-dyVJiDM4ULrmCGGEJQIbE0vsKRAIb9KynqEhlGgwbc_JtjtT_YdXd/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          mode: "no-cors",
        }
      );
      setSubmitted(true);
      trackRfqSubmission();
    } catch (err) {
      console.error("Form submission error:", err);
      setError("Failed to send request. Please try again or email us directly at info@lokaviainternational.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 lg:px-10 lg:pt-28">
        <div className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
          Contact · International <Highlight>buyers</Highlight>
        </div>
        <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
          Get a quote.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
          <Highlight>
            Share the commodity, target volume, and destination port. Our export
            desk responds within one business day with pricing, spec sheets, and
            documentation.
          </Highlight>
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-32 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="rounded-md border border-hairline p-10">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[oklch(0.95_0.05_150)]">
                  <Check className="text-[var(--navy)]" size={20} />
                </div>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-ink">
                  Request received.
                </h2>
                <p className="mt-3 max-w-md text-ink-soft">
                  <Highlight>
                    Our export desk will get back to you at the email you provided
                    within one business day. Please check your spam or junk folder
                    if you do not receive our confirmation email shortly.
                  </Highlight>
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-hairline px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:text-white active:translate-y-0"
                >
                  Send another quote
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Honeypot spam protection field */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                />

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Full name" name="name" required />
                  <Field
                    label="Company"
                    name="company"
                    required
                    placeholder="Legal entity"
                  />
                  <Field
                    label="Work email"
                    name="email"
                    type="email"
                    required
                  />
                  <Field
                    label="Phone number"
                    name="phone"
                    type="tel"
                    required
                    placeholder="e.g. +49 123 456789"
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label>Product</Label>
                    <select
                      name="product"
                      required
                      defaultValue=""
                      className="mt-2 h-12 w-full rounded-md border border-hairline bg-background px-3 text-sm text-ink outline-none focus:border-ink"
                    >
                      <option value="" disabled>
                        Select a commodity
                      </option>
                      {products.map((p) => (
                        <option key={p.slug} value={p.slug}>
                          {p.name}
                        </option>
                      ))}
                      <option value="other">Other / not listed</option>
                    </select>
                  </div>
                  <div>
                    <Label>Volume</Label>
                    <select
                      name="volume"
                      required
                      defaultValue=""
                      className="mt-2 h-12 w-full rounded-md border border-hairline bg-background px-3 text-sm text-ink outline-none focus:border-ink"
                    >
                      <option value="" disabled>
                        Select target volume
                      </option>
                      <option value="1-2 MT">1-2 MT</option>
                      <option value="2-5 MT">2-5 MT</option>
                      <option value="5-10 MT">5-10 MT</option>
                      <option value="10-15 MT">10-15 MT</option>
                      <option value="15-20 MT">15-20 MT</option>
                      <option value="20+ MT / FCL">20+ MT / FCL</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    label="Destination country"
                    name="destinationCountry"
                    placeholder="e.g. Germany"
                    required
                  />
                </div>

                <div>
                  <Label>Additional requirements</Label>
                  <textarea
                    name="notes"
                    rows={5}
                    placeholder="Packaging, private label, specific certifications, timeline…"
                    className="mt-2 w-full rounded-md border border-hairline bg-background p-3 text-sm text-ink outline-none focus:border-ink"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                )}

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--orange)] px-7 py-4 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-md hover:brightness-105 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:brightness-100"
                  >
                    {submitting ? "Sending..." : "Send request →"}
                  </button>
                  <p className="text-xs text-ink-soft">
                    <Highlight>We reply within one business day.</Highlight>
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Aside */}
          <aside className="lg:col-span-5">
            <div className="rounded-md border border-hairline p-8">
              <h2 className="text-xl font-bold text-ink">Export desk</h2>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 text-[var(--navy)]" strokeWidth={1.5} />
                  <div>
                    <div className="text-ink-soft">Email</div>
                    <div className="mt-1 text-ink">
                      <a href="mailto:info@lokaviainternational.com" className="hover:text-[var(--orange)] transition-colors">
                        info@lokaviainternational.com
                      </a>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={18} className="mt-0.5 text-[var(--navy)]" strokeWidth={1.5} />
                  <div>
                    <div className="text-ink-soft">Phone / WhatsApp</div>
                    <div className="mt-1 text-ink">
                      <a href="https://wa.me/917042955773" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--orange)] transition-colors">
                        +91 7042955773
                      </a>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 text-[var(--navy)]" strokeWidth={1.5} />
                  <div>
                    <div className="text-ink-soft">Head office</div>
                    <div className="mt-1 text-ink">Surat, Gujarat, India</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 rounded-md bg-[oklch(0.97_0.003_260)] p-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-soft">
                What to expect
              </h3>
              <ol className="mt-5 space-y-4 text-sm text-ink">
                {[
                  "Response with pricing indication within 1 business day.",
                  "Spec sheet and third-party lab reports on request.",
                  "Sample shipment (500 g – 2 kg) available before order.",
                  "PI issued once specifications and Incoterms are confirmed.",
                ].map((s, i) => (
                  <li key={s} className="flex gap-3">
                    <span className="text-xs font-semibold text-ink-soft">
                      0{i + 1}
                    </span>
                    <span><Highlight>{s}</Highlight></span>
                  </li>
                ))}
              </ol>
            </div>

            <p className="mt-8 text-xs text-ink-soft">
              <Highlight>
                Lokavia serves international buyers only. We do not fulfil domestic
                retail orders.
              </Highlight>
            </p>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-md border border-hairline bg-background px-3 text-sm text-ink outline-none placeholder:text-ink-soft/60 focus:border-ink"
      />
    </div>
  );
}