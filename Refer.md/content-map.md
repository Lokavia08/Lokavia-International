# Lokavia Content Map

This document serves as a single, comprehensive reference of all user-facing text content on the Lokavia website. It outlines the verbatim text, its location in the code, and its production status (Final vs. Placeholder).

---

## Site-Wide Elements

### Header (Navigation Bar)
*   **File Path**: [site-header.tsx](file:///c:/Users/lokes/OneDrive/Desktop/lokaviainternational.com/src/components/site-header.tsx)
*   **Status**: Final
*   **Content**:
    *   **Logo Alt Text**: `"Lokavia"`
    *   **Nav Link 1**: `"Home"` (routes to `/`)
    *   **Nav Link 2**: `"Products"` (routes to `/products`)
    *   **Nav Link 3**: `"About"` (routes to `/about`)
    *   **Nav Link 4**: `"Quality & Sourcing"` (routes to `/quality-sourcing`)
    *   **CTA Button (Desktop & Mobile)**: `"Get a Quote"` (routes to `/quote`)

### Footer
*   **File Path**: [site-footer.tsx](file:///c:/Users/lokes/OneDrive/Desktop/lokaviainternational.com/src/components/site-footer.tsx)
*   **Status**: Mixed (Contact details contain placeholders)
*   **Content**:
    *   **Company Tagline**: `"Agri-commodity exporter shipping dehydrated vegetables, spices, and nutraceutical fibre to buyers across 20+ countries."`
    *   **Navigation Title**: `"Explore"`
    *   **Explore Links**:
        *   `"Home"` (routes to `/`)
        *   `"Products"` (routes to `/products`)
        *   `"About"` (routes to `/about`)
        *   `"Quality & Sourcing"` (routes to `/quality-sourcing`)
        *   `"Insights"` (routes to `/insights`)
        *   `"FAQ"` (routes to `/faq`)
        *   `"Get a Quote"` (routes to `/quote`)
    *   **Contact Title**: `"Contact"`
    *   **Contact Info**:
        *   `"info@lokaviainternational.com"` (Final/Real contact email)
        *   `"+91 7042955773"` (Final/Real contact phone)
        *   `"Surat, India"` (Final/Real head office location)
    *   **Copyright Text**: `"© 2026 Lokavia International"` (Dynamic year evaluation)
    *   **Legal Links**:
        *   `"Privacy Policy"` (routes to `/privacy-policy`)
        *   `"Terms of Use"` (routes to `/terms-of-use`)
        *   `"FAQ"` (routes to `/faq`)
    *   **B2B Limitation Note**: `"Serving international buyers only."`

### Cookie Consent Banner
*   **File Path**: [cookie-consent.tsx](file:///c:/Users/lokes/OneDrive/Desktop/lokaviainternational.com/src/components/cookie-consent.tsx)
*   **Status**: Final
*   **Content**:
    *   **Banner Title**: `"Cookie Preference"`
    *   **Banner Paragraph**: `"We use cookies to enhance your experience and analyze site traffic. By clicking \"Accept\", you agree to our use of cookies per our Privacy Policy."`
    *   **Decline Button**: `"Decline"`
    *   **Accept Button**: `"Accept"`

---

## Route: Home (`/`)
*   **File Path**: [index.tsx](file:///c:/Users/lokes/OneDrive/Desktop/lokaviainternational.com/src/routes/index.tsx)

### 1. Hero Section
*   **Status**: Final
*   **Content**:
    *   **Eyebrow label**: `"Agri-commodity exporter · India"`
    *   **Headline**: `"Bulk agri-commodities, built for global buyers."`
    *   **Subheadline**: `"Lokavia supplies dehydrated onion, garlic, ginger, and psyllium husk to food manufacturers, ingredient distributors, and private-label brands — built to the mesh size, moisture, and purity specifications your production line requires."`
    *   **Primary CTA Button**: `"Get a Quote"` (routes to `/quote`)
    *   **Secondary CTA Link**: `"Explore products"` (routes to `/products`)

### 2. Quick Stat Bar
*   **Status**: Mixed (Stat numbers are targets)
*   **Content**:
    *   **Stat 1 Label**: `"Target export markets"`
    *   **Stat 1 Value**: `"20+"`
    *   **Stat 2 Label**: `"SKUs in catalogue"`
    *   **Stat 2 Value**: `"4"` (Evaluates dynamically from products array length)
    *   **Stat 3 Label**: `"MOQ from"`
    *   **Stat 3 Value**: `"2000 kg"`
    *   **Stat 4 Label**: `"Certifications"`
    *   **Stat 4 Value**: `"FSSAI"` (Active registration)

### 3. Pinned Product Cycle Showcase ("What we ship")
*   **Status**: Final
*   **Content**:
    *   **Section Eyebrow**: `"Catalogue"`
    *   **Section Headline**: `"What we ship."`
    *   **Desktop CTA Link**: `"All products →"` (routes to `/products`)
    *   **Active Item Details (Two-Column Grid)**:
        *   **Onion Powder**:
            *   Category Eyebrow: `"Dehydrated Vegetables"`
            *   End-use Tag: `"For seasoning blends, snacks, and RTE food manufacturing"`
            *   Product Name: `"Onion Powder"`
            *   Description: `"Dehydrated white onion, milled to a consistent grade for sauces, seasonings, snack coatings, and ready-meal manufacturing."`
            *   CTA Link: `"View Details"` (routes to `/products/onion-powder`)
        *   **Garlic Powder**:
            *   Category Eyebrow: `"Dehydrated Vegetables"`
            *   End-use Tag: `"For flavor systems, spice blends, and QSR applications"`
            *   Product Name: `"Garlic Powder"`
            *   Description: `"Steam-treated, low-temperature-dried garlic milled to a fine powder. Preserves sharp aroma and pungency for industrial seasoning use."`
            *   CTA Link: `"View Details"` (routes to `/products/garlic-powder`)
        *   **Ginger Powder**:
            *   Category Eyebrow: `"Dehydrated Vegetables"`
            *   End-use Tag: `"For spice blends and functional food formulation"`
            *   Product Name: `"Ginger Powder"`
            *   Description: `"Dehydrated ginger root milled to a fine powder. Clean flavour and sharp heat, optimized for beverage production and spice blending."`
            *   CTA Link: `"View Details"` (routes to `/products/ginger-powder`)
        *   **Psyllium Husk**:
            *   Category Eyebrow: `"Nutraceutical Fibre"`
            *   End-use Tag: `"Food-grade and nutraceutical-grade dietary fiber"`
            *   Product Name: `"Psyllium Husk"`
            *   Description: `"99% purity psyllium husk (Plantago ovata). Premium mucilage content, ideal as an organic binder, stabilizer, and fibre enrichment."`
            *   CTA Link: `"View Details"` (routes to `/products/psyllium-husk`)

### 4. Value Pillars
*   **Status**: Final
*   **Content**:
    *   **Pillar 1 Title**: `"Sourced at origin"`
    *   **Pillar 1 Body**: `"Direct partnerships with growers in Gujarat, Madhya Pradesh, Kerala, and Assam — traceable lot by lot."`
    *   **Pillar 2 Title**: `"Certified & tested"`
    *   **Pillar 2 Body**: `"FSSAI registered. ISO 22000 & HACCP in planned pipeline, with third-party lab reports on every consignment."` (**ISO & HACCP are target/planned certifications**)
    *   **Pillar 3 Title**: `"Export-ready logistics"`
    *   **Pillar 3 Body**: `"FOB, CIF, and DDP terms. Documentation, phytosanitary, and container loading handled in-house."`

### 5. Pinned About Sequence ("Built for buyers who import at scale")
*   **Status**: Final
*   **Content**:
    *   **Section Eyebrow**: `"About Lokavia"`
    *   **Base Headline Outline**: `"Built for [Cycled Word] who import at scale."`
    *   **Cycled Headline Words & Sync Paragraphs**:
        *   **Cycled Word**: `"buyers"`
            *   Paragraph: `"We work with food manufacturers, ingredient distributors, and private-label brands who need consistent grades, predictable lead times, and clean paperwork. Today the catalogue is focused on four flagship commodities — the roadmap adds pulses, oilseeds, and dehydrated fruit as buyer demand qualifies each category."`
        *   **Cycled Word**: `"manufacturers"`
            *   Paragraph: `"We supply consistent-grade dehydrated commodities built for production-line reliability — matched moisture content, mesh size, and batch-to-batch consistency your formulation depends on. Today the catalogue covers four flagship commodities, with more added as your production needs grow."`
        *   **Cycled Word**: `"traders"`
            *   Paragraph: `"We supply bulk agri-commodities with the reliability serious trading requires — consistent availability, competitive FOB pricing, and documentation that moves with the shipment, not behind it. Today's catalogue covers four flagship commodities, expanding as demand across your markets grows."`
        *   **Cycled Word**: `"suppliers"`
            *   Paragraph: `"We work with suppliers who need a dependable upstream partner — traceable sourcing, verified quality, and paperwork that holds up when it reaches your own customers. Today the catalogue covers four flagship commodities, with more added as your sourcing needs expand."`
        *   **Cycled Word**: `"distributors"`
            *   Paragraph: `"We supply distributors who need predictable inventory and consistent specs across every reorder — no surprises in grade, packaging, or lead time. Today the catalogue covers four flagship commodities, growing as your distribution network does."`
    *   **Static Certificate Grid**:
        *   Certificate 1: `"FSSAI"` | Subtext: `"Licensed food business"`
        *   Certificate 2: `"APEDA"` | Subtext: `"Registered exporter"`
        *   Certificate 3: `"ISO 22000"` | Subtext: `"Planned pipeline"`
        *   Certificate 4: `"HACCP"` | Subtext: `"Planned pipeline"`

### 6. Bottom CTA Band
*   **Status**: Final
*   **Content**:
    *   **Headline**: `"Ready to source your next container?"`
    *   **CTA Button**: `"Get a Quote"` (routes to `/quote`)

---

## Route: About Us (`/about`)
*   **File Path**: [about.tsx](file:///c:/Users/lokes/OneDrive/Desktop/lokaviainternational.com/src/routes/about.tsx)

### 1. Hero Section
*   **Status**: Final
*   **Content**:
    *   **Eyebrow label**: `"About Lokavia"`
    *   **Headline**: `"Sourcing agri-commodities for the global food sector."`
    *   **Intro Paragraph**: `"Lokavia supplies dehydrated vegetables, spices, and nutraceutical fibre to food manufacturers and distributors across 20+ countries at industrial scale."`

### 2. Large Curated Stat Cards
*   **Status**: Mixed (Stats are targets/placeholders)
*   **Content**:
    *   **Card 1**:
        *   Value: `"4"`
        *   Title: `"Flagship SKU Commodities"`
        *   Detail: `"Dehydrated Onion, Garlic, Ginger, & Psyllium Husk"`
        *   Label tag: `"Export Scale"`
    *   **Card 2**:
        *   Value: `"20+"`
        *   Title: `"Target Export Markets"`
        *   Detail: `"Priority regions in Southeast Asia, Europe, and Americas"`
        *   Label tag: `"Global Outreach"`
    *   **Card 3**:
        *   Value: `"Active"`
        *   Title: `"IEC & GST Registrations"`
        *   Detail: `"Fully registered with DGFT and Ministry of Finance"`
        *   Label tag: `"DGFT Verified"`

### 3. Mission & Vision
*   **Status**: Final
*   **Content**:
    *   **Mission Title**: `"Our Mission"` (Index: `"01"`)
    *   **Mission Paragraph**: `"We build traceable, dependable origin pipelines for food manufacturers who require consistent grades, clean paperwork, and predictable shipping timelines. By partnering directly with farmers and processors in major agricultural belts, we ensure quality control from procurement to dispatch."`
    *   **Vision Title**: `"Our Vision"` (Index: `"02"`)
    *   **Vision Paragraph**: `"To expand our export catalogue systematically into additional agricultural commodity categories while maintaining a single, uncompromised standard of compliance, container loading quality, and analytical testing on every consignment."`

### 4. Compliance & Registrations Section
*   **Status**: Mixed (Certifications are annotated with real status)
*   **Content**:
    *   **Section Eyebrow**: `"Verification & Status"`
    *   **Section Headline**: `"Compliance & Registrations"`
    *   **Intro Paragraph**: `"We operate with absolute transparency. Here is the verified status of our export licensing and food safety certifications."`
    *   **Item 1 (Active)**: `"IEC (Import Export Code)"` | Subtext: `"Registered with DGFT, Ministry of Commerce & Industry."`
    *   **Item 2 (Active)**: `"GST Registration"` | Subtext: `"Registered in Gujarat state for commercial operations."`
    *   **Item 3 (Active)**: `"FSSAI"` | Subtext: `"Food safety and standards licensing for food business operations."`
    *   **Item 4 (In Progress)**: `"APEDA Registration"` | Subtext: `"Agricultural and Processed Food Products Export Development Authority."`
    *   **Item 5 (Planned Pipeline - Placeholder)**: `"ISO 22000 & HACCP"` | Subtext: `"Planned implementation of Food Safety Management System standards post-facility setup."`
    *   **Item 6 (Planned Pipeline - Placeholder)**: `"US FDA Facility Registration"` | Subtext: `"Planned facility registration ahead of North American shipments."`

### 5. Why Partner Pillars
*   **Status**: Final
*   **Content**:
    *   **Section Eyebrow**: `"OPERATIONAL STANDARDS"`
    *   **Section Headline**: `"Why global buyers partner with us."`
    *   **Intro Paragraph**: `"We design our business around the operational realities of international procurement desks."`
    *   **Pillar 1 Title**: `"Traceability at Source"`
    *   **Pillar 1 Body**: `"We coordinate sourcing directly from farms and partner dehydrators across Gujarat, Madhya Pradesh, Kerala, and Assam."`
    *   **Pillar 2 Title**: `"Analytical Testing"`
    *   **Pillar 2 Body**: `"Strict laboratory checks on critical specs like moisture percentage, microbiology profile, and particle size mesh."`
    *   **Pillar 3 Title**: `"Export Logistics"`
    *   **Pillar 3 Body**: `"Professional container stuffing, moisture-barrier bulk packaging linings, and sea freight handling from major ports."`

### 6. Closing CTA
*   **Status**: Final
*   **Content**:
    *   **Headline**: `"Ready to source your next container?"`
    *   **CTA Button**: `"Get a Quote"` (routes to `/quote`)

---

## Route: Products Overview (`/products`)
*   **File Path**: [products.index.tsx](file:///c:/Users/lokes/OneDrive/Desktop/lokaviainternational.com/src/routes/products.index.tsx)

### 1. Header Section
*   **Status**: Final
*   **Content**:
    *   **SEO Title**: `"Dehydrated Food Ingredients | Lokavia"`
    *   **Meta Description**: `"Premium dehydrated onion, garlic, ginger, and psyllium husk for global food manufacturers and distributors."`
    *   **Eyebrow label**: `"Catalogue · 2026"`
    *   **Headline**: `"Our Products"`
    *   **Description**: `"Explore Lokavia's range of premium dehydrated food ingredients for food manufacturing, ingredient distribution, and private-label applications."`

### 2. Editorial Product Rows
*   **Status**: Final (Overridden locally in index route)
*   **Content**:
    *   **Row 1: Onion Powder**
        *   Index: `"01"`
        *   Category: `"Dehydrated Vegetable Ingredient"`
        *   Product Name: `"Dehydrated Onion Powder"`
        *   Description: `"Fine, flavorful onion powder for seasonings, sauces, snacks, and ready-to-eat foods."`
        *   Applications: `"Seasonings • Sauces • Snacks • Ready Meals"`
        *   Button: `"View Specifications →"`
    *   **Row 2: Garlic Powder**
        *   Index: `"02"`
        *   Category: `"Dehydrated Vegetable Ingredient"`
        *   Product Name: `"Dehydrated Garlic Powder"`
        *   Description: `"High-quality garlic powder for spice blends, marinades, sauces, and food processing."`
        *   Applications: `"Seasonings • Marinades • Sauces • Meat Processing"`
        *   Button: `"View Specifications →"`
    *   **Row 3: Ginger Powder**
        *   Index: `"03"`
        *   Category: `"Dehydrated Vegetable Ingredient"`
        *   Product Name: `"Dehydrated Ginger Powder"`
        *   Description: `"Aromatic ginger powder for bakery, beverages, seasonings, and health food applications."`
        *   Applications: `"Bakery • Beverages • Seasonings • Health Foods"`
        *   Button: `"View Specifications →"`
    *   **Row 4: Psyllium Husk**
        *   Index: `"04"`
        *   Category: `"Natural Dietary Fiber Ingredient"`
        *   Product Name: `"Psyllium Husk"`
        *   Description: `"Natural soluble fiber for food, nutraceutical, bakery, and dietary supplement applications."`
        *   Applications: `"Functional Foods • Supplements • Bakery • Health Products"`
        *   Button: `"View Specifications →"`

### 3. Closing CTA Band
*   **Status**: Final
*   **Content**:
    *   **Headline**: `"Need a category we don't list yet?"`
    *   **Subheadline**: `"We qualify new commodities on request. Tell us what you import and at what volume."`
    *   **CTA Button**: `"Get a Quote"` (routes to `/quote`)

---

## Route: Product Details (`/products/$slug`)
*   **File Path**: [products.$slug.tsx](file:///c:/Users/lokes/OneDrive/Desktop/lokaviainternational.com/src/routes/products.$slug.tsx)
*   **Base Specs**: Fetched dynamically from `products.json` or local tab constants.

### 1. General Details (Onion Powder / Garlic Powder / Ginger Powder)
*   **Status**: Final (tagline, specs, applications, and packaging are verbatim from JSON catalog database)
*   **Content**:
    *   **Breadcrumbs**: `"Products / [Product Name]"`
    *   **Onion Powder**:
        *   Tagline: `"Uniform, low-moisture, custom mesh."`
        *   Description: `"Dehydrated white onion, milled to a consistent grade for sauces, seasonings, snack coatings, and ready-meal manufacturing."`
        *   Origin: `"Gujarat, India"`
        *   MOQ: `"2000 kg"`
        *   Shelf Life: `"12-18 months"`
        *   Mesh: `"80-100"`
        *   Technical specs:
            *   `Moisture`: `≤ 6%`
            *   `Ash`: `≤ 5%`
            *   `Color`: `Creamy white`
            *   `Total plate count`: `≤ 50,000 CFU/g`
        *   Applications: `"Seasoning blends"`, `"Sauces & ketchups"`, `"Snack coatings"`, `"Ready meals"`
        *   Packaging: `"25 kg multi-wall paper bag with PE liner"`, `"Bulk 1000 kg jumbo bag"`, `"Private-label retail packs"`
        *   Certifications: `"FSSAI"`, `"APEDA"`
    *   **Garlic Powder**:
        *   Tagline: `"High-allicin, dehydrated at low temperature."`
        *   Description: `"Steam-treated, low-temperature-dried garlic milled to a fine powder. Preserves sharp aroma and pungency for industrial seasoning use."`
        *   Origin: `"Madhya Pradesh, India"`
        *   MOQ: `"2000 kg"`
        *   Shelf Life: `"24 months"`
        *   Mesh: `"80-100"`
        *   Technical specs:
            *   `Moisture`: `max 3.25%`
            *   `Ash`: `max 4.31%`
            *   `Color`: `Light Cream to Light Brown`
            *   `Volatile oil`: `≥ 0.3%`
        *   Applications: `"Spice blends"`, `"Marinades & dressings"`, `"Meat & poultry seasoning"`, `"Instant noodles"`
        *   Packaging: `"25 kg multi-wall paper bag with PE liner"`, `"Bulk 1000 kg jumbo bag"`, `"Private-label retail packs"`
        *   Certifications: `"FSSAI"`, `"APEDA"`
    *   **Ginger Powder**:
        *   Tagline: `"Clean, high-gingerol dried ginger."`
        *   Description: `"Dehydrated ginger root milled to a fine powder. Clean flavour and sharp heat, optimized for beverage production and spice blending."`
        *   Origin: `"North-East / Assam, India"`
        *   MOQ: `"2000 kg"`
        *   Shelf Life: `"18-24 months"`
        *   Mesh: `"80-100"`
        *   Technical specs:
            *   `Moisture`: `max 4.85%`
            *   `Ash`: `max 3.94%`
            *   `Color`: `brown`
            *   `Gingerol content`: `≥ 1.5%`
        *   Applications: `"Beverage production (ginger ale/beer)"`, `"Bakery & gingerbread"`, `"Spice mixes & curries"`, `"Herbal teas"`
        *   Packaging: `"25 kg multi-wall paper bag with PE liner"`, `"Bulk 1000 kg jumbo bag"`, `"Private-label retail packs"`
        *   Certifications: `"FSSAI"`, `"APEDA"`, `"Organic (on request)"`
    *   **CTA Button (General)**: `"Request quote for [Product Name]"` (routes to `/quote?product=[slug]`)
    *   **Pillars (Specification)**:
        *   Title: `"Technical profile."`
        *   Detail: `"Third-party lab reports are issued with every consignment. Bespoke specifications available on request."`

### 2. Tabbed Details: Psyllium Husk
*   **Status**: Mixed (Food-Grade specs contain placeholders pending client confirmation)
*   **Content**:
    *   **Tab Triggers**: `"Nutraceutical Fibre"` | `"Food-Grade"`
    *   **Tab Content A: Nutraceutical Fibre (verbatim from JSON)**:
        *   Tagline: `"99% purity, high swelling index."`
        *   Description: `"99% purity psyllium husk (Plantago ovata). Premium mucilage content, ideal as an organic binder, stabilizer, and fibre enrichment."`
        *   Origin: `"Gujarat, India"`
        *   MOQ: `"2000 kg"`
        *   Shelf Life: `"24 months"`
        *   Mesh: `"Husk · 40 · 60 · 80"`
        *   Technical specs:
            *   `Purity`: `≥ 99%`
            *   `Swell volume`: `≥ 40 ml/g`
            *   `Moisture`: `≤ 9%`
            *   `Light extraneous matter`: `≤ 1.0%`
        *   Applications: `"Dietary supplements"`, `"High-fibre pharmaceutical formulations"`, `"Metabolic health products"`, `"Pet food & animal nutrition"`
        *   Packaging: `"25 kg multi-wall paper bag with PE liner"`, `"Bulk 1000 kg jumbo bag"`, `"Private-label retail packs"`
        *   Certifications: `"FSSAI"`, `"APEDA"`, `"Kosher"`, `"Halal"`
    *   **Tab Content B: Food-Grade (verbatim from JSON database)**:
        *   Tagline: `"Clean, consistent binder and dietary fibre for food manufacturing."`
        *   Description: `"Food-grade psyllium husk and powder sourced from Gujarat agricultural belt, ideal as a natural stabilizer, binder, and fiber-enrichment ingredient in commercial baking, gluten-free formulations, and meat processing."`
        *   Origin: `"Gujarat, India"`
        *   MOQ: `"2000 kg"`
        *   Shelf Life: `"24 months"`
        *   Mesh: `"30 (husk) · 40 mesh powder · 70 mesh powder · 100 mesh powder"`
        *   Technical specs (**Placeholder specifications**):
            *   `Purity`: `85% / 95% / 98%`
            *   `Swell volume`: `≥ 30 ml/g`
            *   `Moisture`: `≤ 11%`
            *   `Foreign matter`: `≤ 1.0%`
        *   Applications: `"Gluten-free baking & bread"`, `"Meat processing & binder"`, `"Thickening & stabilization"`, `"Breakfast cereals & bars"`
        *   Packaging: `"25 kg paper bag with PE liner"`, `"Bulk 500 kg jumbo bags"`
        *   Certifications: `"FSSAI"`, `"APEDA"`, `"Kosher"`, `"Halal"`

### 3. Other Commodities Carousel Link
*   **Status**: Final
*   **Content**:
    *   **Carousel Title**: `"Other commodities"`
    *   **Carousel Action**: `"All products →"` (routes to `/products`)

---

## Route: Quality & Sourcing (`/quality-sourcing`)
*   **File Path**: [quality-sourcing.tsx](file:///c:/Users/lokes/OneDrive/Desktop/lokaviainternational.com/src/routes/quality-sourcing.tsx)

### 1. Hero Section
*   **Status**: Final
*   **Content**:
    *   **Headline**: `"Traceability and testing for\ninternational supply chains."`
    *   **Paragraph**: `"We enforce consistent grades, analytical compliance, and container security on every consignment, ensuring raw materials align with your manufacturing standards."`

### 2. Sourcing Approach
*   **Status**: Final
*   **Content**:
    *   **Eyebrow label**: `"Sourcing Protocol"`
    *   **Headline**: `"Direct Origin Partnerships"`
    *   **Paragraph 1**: `"Our sourcing strategy relies on direct partnerships with vetted processors and agricultural suppliers in major producing hubs. By working with processing units in Gujarat (onion and psyllium), Madhya Pradesh (garlic), and Kerala/Assam (ginger), we eliminate intermediary handling and secure consistent raw materials."`
    *   **Paragraph 2**: `"Every supplier partner is selected based on sanitary and phytosanitary infrastructure, grading reliability, and compliance history. This direct oversight allows us to maintain lot traceability from processing to container dispatch."`

### 3. QC Lab Verification Section
*   **Status**: Mixed (Lab testing names contain placeholders pending processor coordination)
*   **Content**:
    *   **Eyebrow label**: `"Testing & Analysis"`
    *   **Headline**: `"Laboratory Verification"`
    *   **Paragraph**: `"Consignments undergo analytical verification at ISO/IEC 17025 accredited laboratories to guarantee physical and chemical parameters."`
    *   **Pillars (Cards)**:
        *   **Moisture Control**: `"Verification of moisture levels to prevent caking and microbial activity: ≤ 6% for onion/garlic, ≤ 10% for ginger and psyllium."`
        *   **Mesh Size Accuracy**: `"Mechanical sieving confirms uniform particle distribution (60, 80, 100 mesh options) to match flow properties in dry blending."`
        *   **MRL Compliance**: `"Strict pesticide residue screening, heavy metals, and microbiological assay testing to meet EU and FDA import regulations."`
    *   **Disclaimer/Notes box**: `"Verification Standards: Third-party surveyor analysis (e.g., pre-shipment inspections) is available on demand. Batch certificates of analysis (COA) are generated and issued with every export container."`

### 4. Logistics Section
*   **Status**: Final
*   **Content**:
    *   **Eyebrow label**: `"Logistics & Cargo"`
    *   **Headline**: `"Containment Standards"`
    *   **Paragraph 1**: `"Agri-commodities are highly sensitive to moisture and ambient conditions. We pack products in multi-wall kraft paper bags with food-grade polyethylene (PE) liners or durable woven bags. This packaging protects against external moisture during transit."`
    *   **Paragraph 2**: `"Before stuffing, all shipping containers are checked for clean walls, absence of foreign odor, and water-tight seals. Palletization and strapping are executed according to international shipping norms to prevent shifts or damage inside the container."`

### 5. Closing CTA Band
*   **Status**: Final
*   **Content**:
    *   **Headline**: `"Ready to initiate your supply?"`
    *   **Subheadline**: `"Request formal specifications or get an FOB/CIF price estimate for your volume."`
    *   **CTA Button**: `"Get a Quote"` (routes to `/quote`)

---

## Route: Get a Quote (`/quote`)
*   **File Path**: [quote.tsx](file:///c:/Users/lokes/OneDrive/Desktop/lokaviainternational.com/src/routes/quote.tsx)

### 1. Header Section
*   **Status**: Final
*   **Content**:
    *   **Eyebrow label**: `"Contact · International buyers"`
    *   **Headline**: `"Get a quote."`
    *   **Paragraph**: `"Share the commodity, target volume, and destination port. Our export desk responds within one business day with pricing, spec sheets, and documentation."`

### 2. Form (RFQ Fields)
*   **Status**: Final
*   **Content**:
    *   **Fields**:
        *   `"Full name"` (Input field)
        *   `"Company"` | Placeholder: `"Legal entity"`
        *   `"Work email"` (Input field)
        *   `"Phone number"` | Placeholder: `"e.g. +49 123 456789"`
        *   `"Product"` | Dropdown options: `"Select a commodity"` (Disabled default), `"Onion Powder"`, `"Garlic Powder"`, `"Ginger Powder"`, `"Psyllium Husk"`, `"Other / not listed"`
        *   `"Volume"` | Dropdown options: `"Select target volume"` (Disabled default), `"1-2 MT"`, `"2-5 MT"`, `"5-10 MT"`, `"10-15 MT"`, `"15-20 MT"`, `"20+ MT / FCL"`
        *   `"Destination country"` | Placeholder: `"e.g. Germany"`
        *   `"Additional requirements"` | Placeholder: `"Packaging, private label, specific certifications, timeline…"`
    *   **CTA Submit Button**: `"Send request →"` (Changes to `"Sending..."` while submitting)
    *   **Small Help Label**: `"We reply within one business day."`
    *   **Validation Error Text**: `"Failed to send request. Please try again or email us directly at info@lokaviainternational.com."`

### 3. Success State Response (Shown post-submission)
*   **Status**: Final
*   **Content**:
    *   **Title**: `"Request received."`
    *   **Paragraph**: `"Our export desk will get back to you at the email you provided within one business day. Please check your spam or junk folder if you do not receive our confirmation email shortly."`
    *   **CTA Reset Button**: `"Send another quote"` (Returns user to empty form)

### 4. Side Info Card
*   **Status**: Mixed (Phone number contains placeholder)
*   **Content**:
    *   **Title**: `"Export desk"`
    *   **Email Info**: `Email: info@lokaviainternational.com`
    *   **Phone Info**: `Phone / WhatsApp: +91 7042955773` (Final/Real contact phone)
    *   **Address Info**: `Head office: Surat, Gujarat, India`
    *   **Title 2**: `"What to expect"`
    *   **Expected Step 1**: `"Response with pricing indication within 1 business day."`
    *   **Expected Step 2**: `"Spec sheet and third-party lab reports on request."`
    *   **Expected Step 3**: `"Sample shipment (500 g – 2 kg) available before order."`
    *   **Expected Step 4**: `"PI issued once specifications and Incoterms are confirmed."`
    *   **B2B Note**: `"Lokavia serves international buyers only. We do not fulfil domestic retail orders."`

---

## Route: Resources/Insights Placeholder (`/insights`)
*   **File Path**: [insights.tsx](file:///c:/Users/lokes/OneDrive/Desktop/lokaviainternational.com/src/routes/insights.tsx)
*   **Status**: Placeholder (Page is draft until articles are published; meta tags set to `noindex, nofollow`)

### 1. Main Heading
*   **Content**:
    *   **Eyebrow label**: `"Resources & Insights"`
    *   **Headline**: `"Trade insights,\npublishing soon."`
    *   **Paragraph**: `"We are building a library of reference guides covering agricultural export logistics, quality compliance testing, and global sourcing parameters."`

### 2. Category Preview Boxes
*   **Content**:
    *   **Box 1 Title**: `"Export Logistics"`
    *   **Box 1 Body**: `"Detailed reports on transit times, ocean freight handling, and container insulation standards for temperature-sensitive cargo."`
    *   **Box 2 Title**: `"Compliance Updates"`
    *   **Box 2 Body**: `"Factual summaries on MRL regulations, pesticide residue testing limits, and import standards for EU and US markets."`

---

## Route: Privacy Policy (`/privacy-policy`)
*   **File Path**: [privacy-policy.tsx](file:///c:/Users/lokes/OneDrive/Desktop/lokaviainternational.com/src/routes/privacy-policy.tsx)

### 1. Header
*   **Status**: Final draft
*   **Content**:
    *   **Eyebrow label**: `"Legal & Compliance"`
    *   **Headline**: `"Privacy Policy"`
    *   **Subtext**: `"Last Updated: July 2026"`

### 2. Mandatory Disclaimer Banner
*   **Status**: Removed (Banner deleted for production readiness)
*   **Content**: None

### 3. Policy Sections
*   **Status**: Final draft
*   **Content**:
    *   **Section 1 Title**: `"1. Data Collected via RFQ Form"`
    *   **Section 1 Body**: `"We collect personal and professional information directly submitted through our Request for Quote (RFQ) form. This information includes:"` (Lists Name, Company, Email, Phone, Commodity, Volume, Destination, Message).
    *   **Section 2 Title**: `"2. Data Storage & System Integration"`
    *   **Section 2 Body**: `"Information submitted through the RFQ form is securely stored and synchronized with a private Google Sheets database managed internally. This setup is utilized strictly for lead management, preparation of Proforma Invoices (PI), and coordinating logistics."`
    *   **Section 3 Title**: `"3. Third-Party Sharing"`
    *   **Section 3 Body**: `"We do not sell, rent, trade, or share your contact details or procurement records with outside marketers or third parties. Data is shared internally with the Lokavia export desk and, where required by law, with regulatory and customs authorities to facilitate international trade compliance."`
    *   **Section 4 Title**: `"4. Cookies & Web Analytics"`
    *   **Section 4 Body**: `"This website plans to utilize Google Analytics 4 (GA4) to evaluate web traffic and visitor patterns. When active, GA4 collects anonymized data (including pages visited, geographic location by country, and session duration) via standard browser cookies."`
    *   **Section 5 Title**: `"5. Your Rights & Contact Method"`
    *   **Section 5 Body**: `"Under relevant privacy laws, you have the right to request access to the information we hold about your business, request corrections, or request complete deletion of your lead data from our records. For any such requests or privacy-related questions, contact us at: info@lokaviainternational.com"`

---

## Route: Terms of Use (`/terms-of-use`)
*   **File Path**: [terms-of-use.tsx](file:///c:/Users/lokes/OneDrive/Desktop/lokaviainternational.com/src/routes/terms-of-use.tsx)

### 1. Header
*   **Status**: Final draft
*   **Content**:
    *   **Eyebrow label**: `"Legal & Compliance"`
    *   **Headline**: `"Terms of Use"`
    *   **Subtext**: `"Last Updated: July 2026"`

### 2. Mandatory Disclaimer Banner
*   **Status**: Removed (Banner deleted for production readiness)
*   **Content**: None

### 3. Policy Sections
*   **Status**: Final draft
*   **Content**:
    *   **Section 1 Title**: `"1. Acceptable Use"`
    *   **Section 1 Body**: `"This website is provided for legitimate sourcing, trade inquiries, and catalog viewing purposes. You agree not to engage in any automated scraping of website data, attempt unauthorized vulnerability tests, or submit false or fraudulent contact details via the Request for Quote (RFQ) interface."`
    *   **Section 2 Title**: `"2. Intellectual Property"`
    *   **Section 2 Body**: `"All text, custom graphics, logo designs, spec sheets, and catalog details displayed on this website are the intellectual property of Lokavia International. Reproduction, copying, or redistribution of these assets for commercial purposes without prior written consent is prohibited."`
    *   **Section 3 Title**: `"3. RFQ Submissions & Non-Binding Status"`
    *   **Section 3 Body**: `"Submitting a Request for Quote (RFQ) through this website does not constitute a binding trade contract, purchase order, or commercial commitment. All quotations, specifications, shipping dates, and pricing are finalized only upon the formal issuance and countersigning of a Proforma Invoice (PI) and Sales Contract."`
    *   **Section 4 Title**: `"4. Limitation of Liability"`
    *   **Section 4 Body**: `"Lokavia International provides this website \"as is\" and makes no guarantees regarding the continuous availability or error-free state of the platform. We are not liable for any direct or indirect business disruptions, loss of data, or shipping delay disputes arising from the use of, or inability to access, this website."`
    *   **Section 5 Title**: `"5. Governing Law"`
    *   **Section 5 Body**: `"These Terms of Use are governed by the laws of India. Any legal disputes or claims arising out of the use of this website shall be subject to the exclusive jurisdiction of the competent courts in Surat, Gujarat, India."`

---

## Route: Error 404 Page (Not Found Route)
*   **File Path**: [__root.tsx](file:///c:/Users/lokes/OneDrive/Desktop/lokaviainternational.com/src/routes/__root.tsx) (in `NotFoundComponent`)

### 1. Main Content Card
*   **Status**: Final
*   **Content**:
    *   **Eyebrow label**: `"Error 404"`
    *   **Headline**: `"Page not found."`
    *   **Description**: `"The page you are looking for does not exist or has been moved. If you are looking for export pricing, spec sheets, or ordering details, please request a quote."`
    *   **Secondary Link**: `"Return to Homepage"` (routes to `/`)
    *   **Primary CTA Button**: `"Get a Quote →"` (routes to `/quote`)

---

## Route: FAQ (`/faq`)
*   **File Path**: [faq.tsx](file:///c:/Users/lokes/OneDrive/Desktop/lokaviainternational.com/src/routes/faq.tsx)

### 1. Main Header
*   **Status**: Final
*   **Content**:
    *   **Eyebrow label**: `"Help Center"`
    *   **Headline**: `"Frequently Asked Questions"`
    *   **Description**: `"Find answers regarding our dehydrated ingredients, quality certifications, customization capabilities, and global shipping policies."`

### 2. FAQ Questions and Answers
*   **Status**: Final (contains 37 detailed Q&A items across categories: Products, Quality & Certifications, Packaging & Private Label, Orders & Pricing, Shipping & Export, Company, Payments, General)

