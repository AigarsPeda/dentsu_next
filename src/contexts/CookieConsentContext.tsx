"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Cookie, CookieSetOptions, CookieGetOptions } from "universal-cookie";

type CookieConsentContextType = {
  isNonNecessary: boolean;
  setIsNonNecessary: (value: boolean) => void;
  setCookie: (
    name: "necessary",
    value: Cookie,
    options?: CookieSetOptions
  ) => void;
  cookies: {
    necessary?: any;
  };
};

const CookieConsentContext = createContext<
  CookieConsentContextType | undefined
>(undefined);

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isNonNecessary, setIsNonNecessary] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["necessary"], {
    doNotParse: false,
  });

  return (
    <CookieConsentContext.Provider
      value={{
        setCookie,
        isNonNecessary,
        setIsNonNecessary,
        cookies,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider"
    );
  }
  return context;
};
