// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// import { i18n } from "../i18n-config"; // Import your i18n config file

// import { match as matchLocale } from "@formatjs/intl-localematcher";
// import Negotiator from "negotiator";

// function getLocale(request: NextRequest): string {
//   // Add error handling for negotiator
//   try {
//     const negotiatorHeaders: Record<string, string> = {};
//     request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

//     let languages = new Negotiator({ headers: negotiatorHeaders }).languages();

//     // Ensure languages is not empty and contains valid values
//     if (!languages.length) {
//       languages = [i18n.defaultLocale];
//     }

//     // Filter out any invalid language tags
//     languages = languages.filter((lang) => {
//       try {
//         return Boolean(new Intl.Locale(lang));
//       } catch {
//         return false;
//       }
//     });

//     const locales: string[] = [...i18n.locales];
//     return matchLocale(languages, locales, i18n.defaultLocale);
//   } catch (error) {
//     console.error("Locale matching error:", error);
//     return i18n.defaultLocale;
//   }
// }

// export function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   // Skip middleware for excluded paths
//   if (shouldSkipMiddleware(pathname)) {
//     return;
//   }

//   // Check if the path already has a locale
//   const hasLocale = i18n.locales.some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   );

//   // If path already has locale, do nothing
//   if (hasLocale) {
//     return;
//   }

//   // At this point, we know the path has no locale
//   // Handle all paths including root
//   const locale = getLocale(request);

//   // For root path
//   if (pathname === "/") {
//     return createRedirect(`/${locale}/`, request.url, locale);
//   }

//   // For all other paths
//   return createRedirect(`/${locale}${pathname}`, request.url, locale);
// }

// // Helper functions for cleaner code
// function shouldSkipMiddleware(pathname: string): boolean {
//   const excludedPaths = [
//     "/manifest.json",
//     "/favicon.ico",
//     "/robots.txt",
//     "/sitemap.xml",
//   ];

//   const excludedPrefixes = ["/_next/", "/api/", "/images/", "/assets/"];

//   return (
//     excludedPaths.includes(pathname) ||
//     excludedPrefixes.some((prefix) => pathname.startsWith(prefix))
//   );
// }

// function createRedirect(
//   destination: string,
//   requestUrl: string,
//   locale: string
// ) {
//   const response = NextResponse.redirect(new URL(destination, requestUrl), {
//     status: 308, // Permanent redirect
//     headers: {
//       "Cache-Control": "public, max-age=3600, s-maxage=86400",
//     },
//   });

//   // Set locale cookie to remember preference
//   response.cookies.set("NEXT_LOCALE", locale, {
//     maxAge: 60 * 60 * 24 * 30, // 30 days
//     path: "/",
//     sameSite: "strict",
//     secure: process.env.NODE_ENV === "production",
//   });

//   return response;
// }

// export const config = {
//   // Matcher to exclude paths like `/_next/` and `/api/` which shouldn't be handled by this middleware
//   matcher: ["/((?!_next|api).*)"],
// };

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { i18n } from "../i18n-config"; // Import your i18n config file
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string {
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

  // Skip middleware for excluded paths
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

// Helper functions for cleaner code
function shouldSkipMiddleware(pathname: string): boolean {
  // Static paths to exclude
  const exactExcludedPaths = ["/manifest.json", "/robots.txt", "/sitemap.xml"];

  // Prefixes to exclude
  const excludedPrefixes = ["/_next/", "/api/", "/images/", "/assets/"];

  // Patterns for icon files
  const iconPatterns = [
    /favicon/i, // All favicon variants
    /apple-touch-icon/i, // Apple touch icons
    /android-chrome/i, // Android chrome icons
    /mstile/i, // Microsoft tile icons
    /\.ico$/i, // All .ico files
    /icon-\d+x\d+/i, // Icon files with dimensions in name
    /\.png$/i, // Consider excluding all PNG files if most are assets
    /site\.webmanifest$/i, // Web manifest files
    /browserconfig\.xml$/i, // Browser config files
    /safari-pinned-tab/i,
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
