import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { TextHighlight } from "@/components/highlight";
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Export Specs, MOQ & Certifications | Lokavia" },
      {
        name: "description",
        content: "Answers on Lokavia's product specs, MOQ, certifications, packaging, and export shipping process for onion, garlic, ginger powder, and psyllium husk buyers.",
      },
      { property: "og:title", content: "FAQ — Export Specs, MOQ & Certifications | Lokavia" },
      {
        property: "og:description",
        content: "Answers on Lokavia's product specs, MOQ, certifications, packaging, and export shipping process for onion, garlic, ginger powder, and psyllium husk buyers.",
      },
      { property: "og:image", content: "https://www.lokaviainternational.com/logo-light.png" },
      { property: "og:url", content: "https://www.lokaviainternational.com/faq" },
      { property: "og:type", content: "website" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://www.lokaviainternational.com/faq" },
    ],
  }),
  component: FAQPage,
});

interface FAQItem {
  q: string;
  a: string | string[];
}

interface FAQSection {
  category: string;
  questions: FAQItem[];
}

function FAQPage() {
  const faqData: FAQSection[] = [
    {
      category: "Products",
      questions: [
        {
          q: "What products does Lokavia export?",
          a: "Lokavia exports dehydrated onion powder, dehydrated garlic powder, dehydrated ginger powder, and psyllium husk for food manufacturers, importers, distributors, and private-label brands."
        },
        {
          q: "What industries use your products?",
          a: "Our products are widely used in seasoning blends, snacks, sauces, ready meals, meat processing, bakery, instant foods, nutraceuticals, and health food manufacturing."
        },
        {
          q: "Are your products suitable for industrial food manufacturing?",
          a: "Yes. Our products are intended for commercial food production and bulk ingredient applications."
        },
        {
          q: "Do you offer different grades or specifications?",
          a: "Yes. We can supply products according to buyer specifications, subject to technical feasibility and order requirements."
        },
        {
          q: "Can you provide custom mesh sizes?",
          a: "Yes. Custom mesh sizes and other technical specifications may be available based on your application."
        },
        {
          q: "What is the shelf life of your products?",
          a: "The standard shelf life is 18 months when stored under recommended conditions."
        },
        {
          q: "How should the products be stored?",
          a: "Store in a cool, dry place away from direct sunlight and moisture. Always keep the packaging tightly sealed after opening."
        },
        {
          q: "Are your products free from artificial colours or preservatives?",
          a: "Our products are processed to preserve their natural characteristics. Product-specific declarations can be shared upon request."
        }
      ]
    },
    {
      category: "Quality & Certifications",
      questions: [
        {
          q: "How do you ensure product quality?",
          a: "Every batch undergoes quality checks to help ensure consistency in appearance, flavour, moisture, and overall quality before dispatch."
        },
        {
          q: "Which certifications do you have?",
          a: "We hold active FSSAI registration. Our products are sourced from ISO 22000, HACCP, and Halal certified processing facilities, with ISO & HACCP in our own planned facility pipeline."
        },
        {
          q: "Can you provide a Certificate of Analysis (COA)?",
          a: "Yes. A Certificate of Analysis can be provided upon request."
        },
        {
          q: "Do you provide product samples?",
          a: "Yes. Samples can be arranged for qualified buyers before bulk orders."
        },
        {
          q: "Are your products export compliant?",
          a: "Yes. Products are supplied with the required export documentation based on the destination country's requirements."
        }
      ]
    },
    {
      category: "Packaging & Private Label",
      questions: [
        {
          q: "What packaging options are available?",
          a: "The standard export packaging is 25 kg. Custom packaging options may also be available."
        },
        {
          q: "Do you offer private labeling?",
          a: "Yes. We offer private labeling for eligible bulk orders."
        },
        {
          q: "Can you customize packaging?",
          a: "Yes. Packaging, labeling, and branding can be customized according to buyer requirements."
        },
        {
          q: "What is the minimum order quantity (MOQ)?",
          a: "Our standard MOQ is 2,000 kg."
        }
      ]
    },
    {
      category: "Orders & Pricing",
      questions: [
        {
          q: "How can I request a quotation?",
          a: "Send us your product name, required quantity, destination country, packaging preference, and any technical specifications. Our team will prepare a customized quotation."
        },
        {
          q: "How is pricing determined?",
          a: "Pricing depends on the product, order quantity, packaging requirements, specifications, destination, and current market conditions."
        },
        {
          q: "Do you offer long-term supply agreements?",
          a: "Yes. We welcome long-term partnerships with manufacturers, distributors, and importers."
        },
        {
          q: "Can I place a trial order?",
          a: "Yes. Trial orders may be available depending on the product and destination."
        }
      ]
    },
    {
      category: "Shipping & Export",
      questions: [
        {
          q: "Which countries do you export to?",
          a: "We supply international buyers across multiple global markets. Please contact us to confirm availability for your country."
        },
        {
          q: "Which Incoterms do you support?",
          a: "Incoterms are discussed based on the customer's requirements and shipment destination."
        },
        {
          q: "What export documents do you provide?",
          a: "Depending on the shipment, we can provide documents such as the Commercial Invoice, Packing List, Certificate of Origin, Certificate of Analysis, Phytosanitary Certificate (where applicable), and other export documents required by the destination country."
        },
        {
          q: "What are the HS codes for your products?",
          a: [
            "Dehydrated Onion Powder — 071220",
            "Dehydrated Garlic Powder — 071290",
            "Dehydrated Ginger Powder — 091012",
            "Psyllium Husk — 121190"
          ]
        },
        {
          q: "How long does order processing take?",
          a: "Lead times vary depending on product availability, quantity, and destination. Our sales team will confirm the estimated timeline with your quotation."
        }
      ]
    },
    {
      category: "Company",
      questions: [
        {
          q: "Is Lokavia a manufacturer or a merchant exporter?",
          a: "Lokavia supplies premium dehydrated food ingredients to global buyers through a reliable sourcing and export network."
        },
        {
          q: "Where is Lokavia located?",
          a: "Lokavia is based in Gujarat, India."
        },
        {
          q: "Why choose Lokavia?",
          a: "We focus on consistent product quality, reliable sourcing, responsive communication, export-ready documentation, and long-term business relationships."
        },
        {
          q: "Who are your typical customers?",
          a: "Our customers include food manufacturers, ingredient distributors, importers, wholesalers, private-label brands, and food processing companies."
        },
        {
          q: "Can you support recurring bulk orders?",
          a: "Yes. We support recurring supply programs for qualified customers."
        }
      ]
    },
    {
      category: "Payments",
      questions: [
        {
          q: "Which payment methods do you accept?",
          a: "Payment terms are discussed during the quotation process and confirmed before order confirmation."
        },
        {
          q: "Which currencies do you accept?",
          a: "International transactions are generally quoted in major trade currencies, depending on the buyer's location and agreed commercial terms."
        }
      ]
    },
    {
      category: "General",
      questions: [
        {
          q: "How do I contact Lokavia?",
          a: "You can contact us through our website, email, phone, or by submitting the inquiry form."
        },
        {
          q: "How quickly will I receive a response?",
          a: "Our team aims to respond to all business inquiries as quickly as possible during business hours."
        },
        {
          q: "Can I speak with your export team before placing an order?",
          a: "Absolutely. Our export team is available to discuss your product requirements, specifications, packaging, and shipping options before you place an order."
        }
      ]
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Filter FAQ items based on search query
  const filteredData = faqData
    .map((section) => {
      const filteredQuestions = section.questions.filter(
        (item) =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (Array.isArray(item.a)
            ? item.a.some((ans) => ans.toLowerCase().includes(searchQuery.toLowerCase()))
            : item.a.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      return {
        ...section,
        questions: filteredQuestions,
      };
    })
    .filter((section) => section.questions.length > 0);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.flatMap((section) =>
      section.questions.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": Array.isArray(item.a) ? item.a.join(" ") : item.a,
        },
      }))
    ),
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 lg:px-10 lg:pt-28">
        {/* Hero Header */}
        <div className="border-b border-hairline pb-12 mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
            Help Center
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 max-w-2xl text-base text-ink-soft">
            <TextHighlight>
              Find answers regarding our dehydrated ingredients, quality certifications, customization capabilities, and global shipping policies.
            </TextHighlight>
          </p>

          {/* Search bar */}
          <div className="mt-8 relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" size={18} />
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-hairline bg-background focus:outline-none focus:ring-1 focus:ring-[var(--orange)] focus:border-[var(--orange)] text-ink"
            />
          </div>
        </div>

        {/* FAQ layout */}
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left quick scroll navigation */}
          <aside className="lg:col-span-3 hidden lg:block sticky top-28 h-fit space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft mb-4">Categories</p>
            {filteredData.map((section) => (
              <a
                key={section.category}
                href={`#${section.category.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                className="block text-sm text-ink-soft hover:text-[var(--orange)] transition-colors py-1"
              >
                {section.category}
              </a>
            ))}
          </aside>

          {/* FAQ Sections */}
          <div className="lg:col-span-9 space-y-12">
            {filteredData.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-hairline rounded-lg">
                <p className="text-ink-soft">No FAQ questions found matching your search query.</p>
              </div>
            ) : (
              filteredData.map((section) => {
                const sectionId = section.category.toLowerCase().replace(/[^a-z0-9]/g, "-");
                return (
                  <section key={section.category} id={sectionId} className="scroll-mt-28 space-y-6">
                    <h2 className="text-xl font-bold tracking-tight text-ink border-b border-hairline pb-2">
                      {section.category}
                    </h2>
                    <div className="divide-y divide-hairline border-b border-hairline">
                      {section.questions.map((item, idx) => {
                        const itemKey = `${section.category}-${idx}`;
                        const isOpen = !!openItems[itemKey];

                        return (
                          <div key={idx} className="py-4">
                            <button
                              onClick={() => toggleItem(itemKey)}
                              className="w-full flex items-center justify-between text-left font-semibold text-ink hover:text-[var(--orange)] transition-colors py-2"
                            >
                              <span><TextHighlight>{item.q}</TextHighlight></span>
                              <ChevronDown
                                size={18}
                                className={`text-ink-soft transition-transform duration-300 ${
                                  isOpen ? "rotate-180 text-[var(--orange)]" : ""
                                }`}
                              />
                            </button>
                            <div
                              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                isOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0 pointer-events-none"
                              }`}
                            >
                              <div className="text-sm leading-relaxed text-ink-soft">
                                <TextHighlight>
                                  {Array.isArray(item.a) ? (
                                    <ul className="list-disc list-inside space-y-1 pl-2">
                                      {item.a.map((line, lIdx) => (
                                        <li key={lIdx}>{line}</li>
                                      ))}
                                    </ul>
                                  ) : (
                                    item.a
                                  )}
                                </TextHighlight>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })
            )}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
