import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { i18n } from "../i18n-config"; // Import your i18n config file

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string | undefined {
  // Add error handling for negotiator
  try {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    let languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    // Ensure languages is not empty and contains valid values
    if (!languages.length) {
      languages = [i18n.defaultLocale];
    }

    // Filter out any invalid language tags
    languages = languages.filter((lang) => {
      try {
        return Boolean(new Intl.Locale(lang));
      } catch {
        return false;
      }
    });

    const locales: string[] = [...i18n.locales];
    return matchLocale(languages, locales, i18n.defaultLocale);
  } catch (error) {
    console.error("Locale matching error:", error);
    return i18n.defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // First, check for static assets and exclude them from middleware
  if (["/manifest.json", "/favicon.ico", "/robots.txt"].includes(pathname)) {
    return;
  }

  // Check if the URL already has the correct locale format
  const hasLocale = i18n.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // MOST IMPORTANT PART: If already on www and has locale, don't redirect
  if (request.nextUrl.host.startsWith("www.") && hasLocale) {
    return;
  }

  // Handle non-www to www redirect
  if (
    !request.nextUrl.host.startsWith("www.") &&
    !request.nextUrl.host.includes("localhost")
  ) {
    // IMPORTANT: Keep the original path structure when redirecting to www
    const url = request.nextUrl.clone();
    url.host = "www." + request.nextUrl.host;
    return NextResponse.redirect(url, { status: 308 });
  }

  // Only handle locale redirects after www is correct

  // Handle root path
  if (pathname === "/") {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}/`, request.url), {
      status: 308,
    });
  }

  // Add locale if missing
  if (!hasLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url),
      { status: 308 }
    );
  }
}

export const config = {
  // Matcher to exclude paths like `/_next/` and `/api/` which shouldn't be handled by this middleware
  matcher: ["/((?!_next|api).*)"],
};
