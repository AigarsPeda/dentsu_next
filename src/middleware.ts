import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { i18n } from "../i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string {
  try {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    let languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    if (!languages.length) {
      languages = [i18n.defaultLocale];
    }

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
  const userAgent = request.headers.get("user-agent") || "";

  // Skip middleware for excluded paths or Googlebot
  // if (shouldSkipMiddleware(pathname) || isGooglebot(userAgent)) {
  //   return;
  // }

  if (shouldSkipMiddleware(pathname)) {
    return;
  }

  // Check if the path already has a locale
  const hasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If path already has locale, do nothing
  if (hasLocale) {
    return;
  }

  // At this point, we know the path has no locale
  // Handle all paths including root
  const locale = getLocale(request);

  // For root path
  if (pathname === "/") {
    return createRedirect(`/${locale}/`, request.url, locale);
  }

  // For all other paths
  return createRedirect(`/${locale}${pathname}`, request.url, locale);
}

// Helper function to detect Googlebot
function isGooglebot(userAgent: string): boolean {
  return userAgent.toLowerCase().includes("googlebot");
}

// Helper functions for cleaner code
function shouldSkipMiddleware(pathname: string): boolean {
  // Static paths to exclude
  const exactExcludedPaths = [
    "/manifest.json",
    "/robots.txt",
    "/sitemap.xml",
    "/favicon.ico",
    "/favicon-96x96.png", // Add your specific favicon path
    "/favicon.png", // Add common favicon variants
  ];

  // Prefixes to exclude
  const excludedPrefixes = ["/_next/", "/api/", "/images/", "/assets/"];

  // Patterns for icon files - more extensive list
  const iconPatterns = [
    /favicon/i, // All favicon variants
    /apple-touch-icon/i, // Apple touch icons
    /android-chrome/i, // Android chrome icons
    /mstile/i, // Microsoft tile icons
    /\.ico$/i, // All .ico files
    /icon-\d+x\d+/i, // Icon files with dimensions in name
    /\.png$/i, // All PNG files
    /\.svg$/i, // All SVG files
    /site\.webmanifest$/i, // Web manifest files
    /browserconfig\.xml$/i, // Browser config files
    /safari-pinned-tab/i, // Safari pinned tab SVG
  ];

  // Check exact paths
  if (exactExcludedPaths.includes(pathname)) {
    return true;
  }

  // Check prefixes
  if (excludedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return true;
  }

  // Check icon patterns
  if (iconPatterns.some((pattern) => pattern.test(pathname))) {
    return true;
  }

  return false;
}

function createRedirect(
  destination: string,
  requestUrl: string,
  locale: string
) {
  const response = NextResponse.redirect(new URL(destination, requestUrl), {
    status: 308, // Permanent redirect
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });

  // Set locale cookie to remember preference
  response.cookies.set("NEXT_LOCALE", locale, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}

export const config = {
  // Matcher to exclude paths like `/_next/` and `/api/` which shouldn't be handled by this middleware
  matcher: ["/((?!_next|api).*)"],
};
