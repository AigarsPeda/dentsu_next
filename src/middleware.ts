// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// import { i18n } from "../i18n-config";

// import { match as matchLocale } from "@formatjs/intl-localematcher";
// import Negotiator from "negotiator";

// function getLocale(request: NextRequest): string | undefined {
//   // Negotiator expects plain object so we need to transform headers
//   const negotiatorHeaders: Record<string, string> = {};
//   request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

//   // Use negotiator and intl-localematcher to get best locale
//   let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
//   // @ts-ignore locales are readonly
//   const locales: string[] = i18n.locales;
//   return matchLocale(languages, locales, i18n.defaultLocale);
// }

// export function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
//   // // If you have one
//   if (
//     [
//       "/manifest.json",
//       "/favicon.ico",
//       "/robots.txt",
//       // Your other files in `public`
//     ].includes(pathname)
//   )
//     return;

//   // Check if there is any supported locale in the pathname
//   const pathnameIsMissingLocale = i18n.locales.every(
//     (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
//   );

//   // Redirect if there is no locale
//   if (pathnameIsMissingLocale) {
//     const locale = getLocale(request);

//     // e.g. incoming request is /products
//     // The new URL is now /en-US/products
//     return NextResponse.redirect(
//       new URL(`/${locale}/${pathname}`, request.url)
//     );
//   }
// }

// export const config = {
//   // Matcher ignoring `/_next/` and `/api/`
//   matcher: ["/((?!_next).*)"],
// };

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { i18n } from "../i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locales: string[] = [...i18n.locales]; // Ensure locales is mutable

  const matchedLocale = matchLocale(languages, locales, i18n.defaultLocale);

  // If no locale is matched, default to i18n.defaultLocale
  return matchedLocale || i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Ignore files in the public directory (manifest.json, favicon.ico, robots.txt, etc.)
  if (
    [
      "/manifest.json",
      "/favicon.ico",
      "/robots.txt",
      // Add other static files you need to ignore
    ].includes(pathname)
  ) {
    return NextResponse.next(); // Continue to the next middleware
  }

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there's no locale in the pathname
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // Redirect to the same pathname with the matched or default locale
    const redirectUrl = new URL(`/${locale}${pathname}`, request.url);

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next(); // Continue the request if locale is present
}

export const config = {
  matcher: ["/((?!_next|api|public).*)"], // Ignore `/_next/`, `/api/`, and `/public` paths
};
