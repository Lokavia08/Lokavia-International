import { Link } from "@tanstack/react-router";
import { Highlight } from "./highlight";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link
              to="/"
              className="inline-flex"
            >
              <img
                src="/Logo + Wordmark Dark.svg"
                alt="Lokavia"
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              <Highlight>
                Agri-commodity exporter shipping dehydrated vegetables, spices, and
                nutraceutical fibre to buyers across 20+ countries.
              </Highlight>
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Explore
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/quality-sourcing" className="text-gray-300 hover:text-white transition-colors">
                  Quality & Sourcing
                </Link>
              </li>
              <li>
                <Link to="/insights" className="text-gray-300 hover:text-white transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/quote" className="text-gray-300 hover:text-white transition-colors">
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Contact
            </div>
            <ul className="mt-4 space-y-3 text-sm text-gray-300">
              <li>
                <a href="mailto:info@lokaviainternational.com" className="hover:text-white transition-colors">
                  info@lokaviainternational.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/917042955773" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  +91 7042955773
                </a>
              </li>
              <li className="text-gray-400">Surat, India</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-xs text-gray-400 md:flex-row">
          <div>© {new Date().getFullYear()} Lokavia International</div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-use" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link to="/faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
            <span className="text-gray-600 hidden md:inline">|</span>
            <span>
              <Highlight>Currently Serving B2B Buyers Only.</Highlight>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}