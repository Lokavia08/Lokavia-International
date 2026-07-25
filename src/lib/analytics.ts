export const GA_MEASUREMENT_ID = "G-P8EDZ0K5V1"; // GA4 Measurement ID
export const GOOGLE_ADS_ID = "AW-16629252327"; // Google Ads Conversion ID
export const GOOGLE_ADS_CONVERSION_LABEL = "AW-16629252327/rfq_submit"; // Google Ads Conversion Label

// Check if tags are initialized
let tagsInitialized = false;

/**
 * Initializes GA4 and Google Ads tracking only if the user has accepted cookies.
 */
export function initGoogleTags() {
  if (typeof window === "undefined") return;

  const consent = localStorage.getItem("cookie-consent");
  if (consent !== "accepted") {
    return;
  }

  if (tagsInitialized) return;
  tagsInitialized = true;

  try {
    // 1. Inject Gtag script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // 2. Setup dataLayer and default configuration
    const inlineScript = document.createElement("script");
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', { 'anonymize_ip': true });
      gtag('config', '${GOOGLE_ADS_ID}');
    `;
    document.head.appendChild(inlineScript);
  } catch (error) {
    console.error("Failed to initialize Google Analytics / Ads tag:", error);
  }
}

/**
 * Tracks the RFQ form submission event to GA4 and Google Ads.
 */
export function trackRfqSubmission() {
  if (typeof window === "undefined") return;

  const consent = localStorage.getItem("cookie-consent");
  if (consent !== "accepted") {
    // Analytics not accepted, skip tracking
    return;
  }

  // Ensure window.gtag is available
  const gtag = (window as any).gtag;
  if (!gtag) {
    console.warn("gtag is not initialized. Event not tracked.");
    return;
  }

  try {
    // 1. GA4 Conversion Event
    gtag("event", "generate_lead", {
      event_category: "Engagement",
      event_label: "RFQ Submit",
    });

    // 2. Google Ads Conversion Event
    gtag("event", "conversion", {
      send_to: GOOGLE_ADS_CONVERSION_LABEL,
    });
  } catch (error) {
    console.error("Failed to send conversion events:", error);
  }
}
