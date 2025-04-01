"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

interface CookieContextType {
  cookies: any;
  setCookie: (
    name: string,
    value: any,
    options?: Cookies.CookieAttributes
  ) => void;
  removeCookie: (name: string, options?: Cookies.CookieAttributes) => void;
  updateGoogleConsent: (hasConsent: boolean) => void;
}

const CookieConsentContext = createContext<CookieContextType | undefined>(
  undefined
);

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider"
    );
  }
  return context;
};

interface CookieConsentProviderProps {
  children: ReactNode;
}

export const COOKIE_VERSION = "1.1.0";

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    __consentUpdated?: boolean;
  }
}

export const CookieConsentProvider = ({
  children,
}: CookieConsentProviderProps) => {
  const [cookies, setCookies] = useState<any>({});

  // Function to update Google consent mode using gtag API per Google's docs
  const updateGoogleConsent = (hasConsent: boolean) => {
    if (typeof window !== "undefined") {
      // Prevent duplicate updates
      if (window.__consentUpdated) return;

      window.__consentUpdated = true;
      const consentState = hasConsent ? "granted" : "denied";

      // Use the gtag function if available
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          ad_user_data: consentState,
          ad_personalization: consentState,
          ad_storage: consentState,
          analytics_storage: consentState,
        });
      }
      // Fallback to dataLayer.push for older implementations
      else if (window.dataLayer) {
        window.dataLayer.push({
          event: "consent_update",
          consent: {
            ad_storage: consentState,
            ad_user_data: consentState,
            ad_personalization: consentState,
            analytics_storage: consentState,
          },
        });
      }
    }
  };

  // Set a cookie with a given name, value and options
  const setCookie = (
    name: string,
    value: any,
    options?: Cookies.CookieAttributes
  ) => {
    try {
      // Convert the value to a JSON string
      const stringValue = JSON.stringify(value);
      // Set the cookie
      Cookies.set(name, stringValue, options);
      // Update the cookies state
      setCookies((prevCookies: any) => ({ ...prevCookies, [name]: value }));
    } catch (error) {
      console.error("Error setting cookie:", error);
    }
  };

  // Remove a cookie with a given name and options
  const removeCookie = (name: string, options?: Cookies.CookieAttributes) => {
    try {
      // Remove the cookie
      Cookies.remove(name, options);
      // Update the cookies state
      setCookies((prevCookies: any) => {
        const newCookies = { ...prevCookies };
        delete newCookies[name];
        return newCookies;
      });
    } catch (error) {
      console.error("Error removing cookie:", error);
    }
  };

  // Load all cookies when the component mounts
  useEffect(() => {
    try {
      // Get all cookies
      const allCookies = Cookies.get();
      // Convert each cookie value from a JSON string to an object
      const parsedCookies: any = {};
      Object.entries(allCookies).forEach(([name, value]) => {
        try {
          parsedCookies[name] = JSON.parse(value as string);
        } catch (error) {
          parsedCookies[name] = value;
        }
      });
      // Set the cookies state
      setCookies(parsedCookies);
    } catch (error) {
      console.error("Error loading cookies:", error);
    }
  }, []);

  return (
    <CookieConsentContext.Provider
      value={{ cookies, setCookie, removeCookie, updateGoogleConsent }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

export default CookieConsentProvider;
