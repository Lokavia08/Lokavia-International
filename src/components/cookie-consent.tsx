import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";

import { initGoogleTags } from "@/lib/analytics";

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    } else if (consent === "accepted") {
      initGoogleTags();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
    initGoogleTags();
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-lg border border-hairline bg-background p-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h4 className="text-sm font-bold text-ink">Cookie Preference</h4>
          <p className="mt-2 text-xs leading-relaxed text-ink-soft">
            We use cookies to enhance your experience and analyze site traffic. By clicking "Accept", you agree to our use of cookies per our{" "}
            <Link
              to="/privacy-policy"
              className="underline text-ink hover:text-[var(--orange)] transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <button
          onClick={handleDecline}
          className="text-ink-soft hover:text-ink transition-colors p-0.5 rounded-full hover:bg-hairline/20"
          aria-label="Close panel"
        >
          <X size={16} />
        </button>
      </div>
      <div className="mt-4 flex items-center justify-end gap-3">
        <button
          onClick={handleDecline}
          className="text-xs font-semibold text-ink-soft hover:text-ink transition-colors px-3 py-2"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
