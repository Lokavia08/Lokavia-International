import productsData from "./products.json";

export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  origin: string;
  form: string;
  meshOptions: string[];
  packaging: string[];
  moqKg: number;
  shelfLifeMonths: number | string;
  applications: string[];
  specs: { label: string; value: string }[];
  certifications: string[];
  introduction?: string;
  metaTitle?: string;
  metaDescription?: string;
  originHighlights?: { title: string; text: string }[];
  physicochemicalSpecs?: { label: string; value: string }[];
  microbiologicalSpecs?: { label: string; value: string }[];
  storageHighlights?: { title: string; value: string; desc: string }[];
  complianceHighlights?: { title: string; text: string }[];
  documentList?: string[];
  faqs?: { question: string; answer: string }[];
  variants?: {
    id: string;
    name: string;
    category: string;
    tagline: string;
    description: string;
    origin: string;
    moqKg: number;
    shelfLifeMonths: number | string;
    meshOptions: string[];
    packaging: string[];
    specs: { label: string; value: string }[];
    applications: string[];
    certifications?: string[];
    introduction?: string;
    originHighlights?: { title: string; text: string }[];
    physicochemicalSpecs?: { label: string; value: string }[];
    microbiologicalSpecs?: { label: string; value: string }[];
    storageHighlights?: { title: string; value: string; desc: string }[];
    complianceHighlights?: { title: string; text: string }[];
    documentList?: string[];
    faqs?: { question: string; answer: string }[];
  }[];
};

export const products = productsData.products as Product[];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);