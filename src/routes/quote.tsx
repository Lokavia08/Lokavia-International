import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect, type FormEvent } from "react";
import { SiteShell } from "@/components/site-shell";
import { TextHighlight } from "@/components/highlight";
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
      { property: "og:image", content: "https://www.lokaviainternational.com/logo-light.png" },
      { property: "og:url", content: "https://www.lokaviainternational.com/quote" },
      { property: "og:type", content: "website" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://www.lokaviainternational.com/quote" },
    ],
  }),
  component: QuotePage,
});

function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialCode, setDialCode] = useState("+91");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    // Merge dial code + phone number into one field
    const rawPhone = formData.get("phoneNumber") as string;
    formData.set("phone", `${dialCode} ${rawPhone}`.trim());
    formData.delete("phoneNumber");

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
          Contact · International <TextHighlight>buyers</TextHighlight>
        </div>
        <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
          <TextHighlight>Request a Bulk Export Quote</TextHighlight>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
          <TextHighlight>
            Share your target product, volume, destination country, preferred packaging, and required documents. Our export desk will respond with pricing guidance, specification options, and next steps within one business day.
          </TextHighlight>
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
                  <TextHighlight>
                    Our export desk will get back to you at the email you provided
                    within one business day. Please check your spam or junk folder
                    if you do not receive our confirmation email shortly.
                  </TextHighlight>
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
                  <PhoneField dialCode={dialCode} onDialCodeChange={setDialCode} />
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
                    <TextHighlight>We reply within one business day.</TextHighlight>
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
                    <span><TextHighlight>{s}</TextHighlight></span>
                  </li>
                ))}
              </ol>
            </div>

            <p className="mt-8 text-xs text-ink-soft">
              <TextHighlight>
                Lokavia serves international buyers only. We do not fulfil domestic
                retail orders.
              </TextHighlight>
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

// ---------------------------------------------------------------------------
// Country-code data
// ---------------------------------------------------------------------------
const COUNTRY_CODES: { code: string; name: string; dial: string }[] = [
  { code: "AF", name: "Afghanistan", dial: "+93" },
  { code: "AL", name: "Albania", dial: "+355" },
  { code: "DZ", name: "Algeria", dial: "+213" },
  { code: "AR", name: "Argentina", dial: "+54" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "AT", name: "Austria", dial: "+43" },
  { code: "BD", name: "Bangladesh", dial: "+880" },
  { code: "BE", name: "Belgium", dial: "+32" },
  { code: "BR", name: "Brazil", dial: "+55" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "CO", name: "Colombia", dial: "+57" },
  { code: "HR", name: "Croatia", dial: "+385" },
  { code: "CZ", name: "Czech Republic", dial: "+420" },
  { code: "DK", name: "Denmark", dial: "+45" },
  { code: "EG", name: "Egypt", dial: "+20" },
  { code: "ET", name: "Ethiopia", dial: "+251" },
  { code: "FI", name: "Finland", dial: "+358" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "GH", name: "Ghana", dial: "+233" },
  { code: "GR", name: "Greece", dial: "+30" },
  { code: "HU", name: "Hungary", dial: "+36" },
  { code: "IN", name: "India", dial: "+91" },
  { code: "ID", name: "Indonesia", dial: "+62" },
  { code: "IR", name: "Iran", dial: "+98" },
  { code: "IQ", name: "Iraq", dial: "+964" },
  { code: "IE", name: "Ireland", dial: "+353" },
  { code: "IL", name: "Israel", dial: "+972" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "JO", name: "Jordan", dial: "+962" },
  { code: "KZ", name: "Kazakhstan", dial: "+7" },
  { code: "KE", name: "Kenya", dial: "+254" },
  { code: "KW", name: "Kuwait", dial: "+965" },
  { code: "LB", name: "Lebanon", dial: "+961" },
  { code: "MY", name: "Malaysia", dial: "+60" },
  { code: "MX", name: "Mexico", dial: "+52" },
  { code: "MA", name: "Morocco", dial: "+212" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "NZ", name: "New Zealand", dial: "+64" },
  { code: "NG", name: "Nigeria", dial: "+234" },
  { code: "NO", name: "Norway", dial: "+47" },
  { code: "OM", name: "Oman", dial: "+968" },
  { code: "PK", name: "Pakistan", dial: "+92" },
  { code: "PE", name: "Peru", dial: "+51" },
  { code: "PH", name: "Philippines", dial: "+63" },
  { code: "PL", name: "Poland", dial: "+48" },
  { code: "PT", name: "Portugal", dial: "+351" },
  { code: "QA", name: "Qatar", dial: "+974" },
  { code: "RO", name: "Romania", dial: "+40" },
  { code: "RU", name: "Russia", dial: "+7" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "SN", name: "Senegal", dial: "+221" },
  { code: "ZA", name: "South Africa", dial: "+27" },
  { code: "KR", name: "South Korea", dial: "+82" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "LK", name: "Sri Lanka", dial: "+94" },
  { code: "SE", name: "Sweden", dial: "+46" },
  { code: "CH", name: "Switzerland", dial: "+41" },
  { code: "TW", name: "Taiwan", dial: "+886" },
  { code: "TZ", name: "Tanzania", dial: "+255" },
  { code: "TH", name: "Thailand", dial: "+66" },
  { code: "TN", name: "Tunisia", dial: "+216" },
  { code: "TR", name: "Turkey", dial: "+90" },
  { code: "UG", name: "Uganda", dial: "+256" },
  { code: "UA", name: "Ukraine", dial: "+380" },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "US", name: "United States", dial: "+1" },
  { code: "UZ", name: "Uzbekistan", dial: "+998" },
  { code: "VN", name: "Vietnam", dial: "+84" },
  { code: "YE", name: "Yemen", dial: "+967" },
  { code: "ZM", name: "Zambia", dial: "+260" },
];

function flag(code: string) {
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 - 65 + c.charCodeAt(0)))
    .join("");
}

// ---------------------------------------------------------------------------
// PhoneField component
// ---------------------------------------------------------------------------
function PhoneField({
  dialCode,
  onDialCodeChange,
}: {
  dialCode: string;
  onDialCodeChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = COUNTRY_CODES.find((c) => c.dial === dialCode && c.dial === dialCode) ??
    COUNTRY_CODES.find((c) => c.dial === dialCode) ??
    COUNTRY_CODES.find((c) => c.code === "IN")!;

  const filtered = search.trim()
    ? COUNTRY_CODES.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.dial.includes(search)
      )
    : COUNTRY_CODES;

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Focus search when opened
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
  }, [open]);

  return (
    <div>
      <Label>Phone number</Label>
      <div className="mt-2 flex h-12 w-full overflow-visible rounded-md border border-hairline bg-background focus-within:border-ink">
        {/* Dial-code trigger */}
        <div className="relative flex-shrink-0" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-full items-center gap-1.5 border-r border-hairline px-3 text-sm text-ink transition-colors hover:bg-ink/5 focus:outline-none"
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <span className="text-base leading-none">{flag(selected.code)}</span>
            <span className="font-medium">{selected.dial}</span>
            <svg
              className={`h-3 w-3 text-ink-soft transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              viewBox="0 0 12 12"
              fill="none"
            >
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {open && (
            <div
              role="listbox"
              className="absolute left-0 top-[calc(100%+4px)] z-50 w-64 overflow-hidden rounded-md border border-hairline bg-background shadow-lg"
            >
              {/* Search */}
              <div className="border-b border-hairline p-2">
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search country or code…"
                  className="h-8 w-full rounded bg-ink/5 px-3 text-xs text-ink outline-none placeholder:text-ink-soft/60"
                />
              </div>
              {/* List */}
              <ul className="max-h-52 overflow-y-auto">
                {filtered.length === 0 && (
                  <li className="px-4 py-3 text-xs text-ink-soft">No results</li>
                )}
                {filtered.map((c) => (
                  <li key={`${c.code}-${c.dial}`}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={c.dial === dialCode && c.code === selected.code}
                      onClick={() => {
                        onDialCodeChange(c.dial);
                        setOpen(false);
                        setSearch("");
                      }}
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-ink/5 ${
                        c.code === selected.code ? "bg-ink/[0.04] font-semibold" : ""
                      }`}
                    >
                      <span className="text-base">{flag(c.code)}</span>
                      <span className="flex-1 truncate text-ink">{c.name}</span>
                      <span className="text-xs text-ink-soft">{c.dial}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Number input */}
        <input
          name="phoneNumber"
          type="tel"
          required
          placeholder="123 456 7890"
          className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-ink-soft/60"
        />
      </div>
    </div>
  );
}