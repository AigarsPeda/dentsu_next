"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  COOKIE_VERSION,
  useCookieConsent,
} from "@/contexts/CookieConsentContext";

// Extend Window interface to track consent initialization
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    __consentInitialized?: boolean;
    __consentUpdated?: boolean;
  }
}

interface GoogleTagManagerProps {
  gtmId: string;
}

export default function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  const { cookies } = useCookieConsent();

  useEffect(() => {
    if (!gtmId) return;

    // Initialize dataLayer if not already done
    window.dataLayer = window.dataLayer || [];

    // Define gtag function
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    // Initialize consent only once per page load
    if (!window.__consentInitialized) {
      window.__consentInitialized = true;

      // Check if user has existing preferences
      if (cookies?.necessary && cookies.necessary.version === COOKIE_VERSION) {
        // User has made a choice - apply it directly
        if (!window.__consentUpdated) {
          window.__consentUpdated = true;
          const consentState = cookies.necessary.nonNecessary
            ? "granted"
            : "denied";

          gtag("consent", "update", {
            ad_user_data: consentState,
            ad_personalization: consentState,
            ad_storage: consentState,
            analytics_storage: consentState,
          });
        }
      } else {
        // No choice yet - set defaults
        gtag("consent", "default", {
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          analytics_storage: "denied",
          wait_for_update: 500,
        });
      }
    } else if (
      cookies?.necessary &&
      !window.__consentUpdated &&
      cookies.necessary.version === COOKIE_VERSION
    ) {
      // This handles the case where cookies load after initialization
      window.__consentUpdated = true;
      const consentState = cookies.necessary.nonNecessary
        ? "granted"
        : "denied";

      gtag("consent", "update", {
        ad_user_data: consentState,
        ad_personalization: consentState,
        ad_storage: consentState,
        analytics_storage: consentState,
      });
    }
  }, [gtmId, cookies]);

  if (!gtmId) {
    return null;
  }

  return (
    <Script
      id="gtm-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        // Only run this code if consent hasn't been initialized yet
        if (!window.__consentInitialized) {
          // Initialize GTM
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        }
        `,
      }}
    />
  );
}
