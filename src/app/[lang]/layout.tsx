import CookieBanner from "@/app/[lang]/components/CookieBanner";
import Footer from "@/app/[lang]/components/Footer";
import NavbarContent from "@/app/[lang]/components/Navbar";
import "@/app/[lang]/globals.css";
import { getStrapiMedia, getStrapiURL } from "@/app/[lang]/utils/api-helpers";
import { FALLBACK_SEO } from "@/app/[lang]/utils/constants";
import { fetchAPI } from "@/app/[lang]/utils/fetch-api";
import GoogleAnalytics from "@/script/GoogleAnalytics";
import GoogleTagManager from "@/script/GoogleTagManager";
import GoogleTagManagerNoScript from "@/script/GoogleTagManagerNoScript";
import { i18n } from "i18n-config";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { CookieConsentProvider } from "../../contexts/CookieConsentContext";
import { LogoStructuredData } from "@/script/LogoStructuredData";

async function getGlobal(lang: string): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "favicon_large",
      "favicon_96x96",
      "favicon_svg",
      "navbar.locales",
      "notificationBanner.link",
      "navbar.links",
      "navbar.locales",
      "navbar.locales.img",
      "navbar.navbarLogo.logoImg",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
      "footer.categories",
      "footer.localesFlags",
      "CookieBanner",
      "CookieBanner.cookieChoices",
    ],
    locale: lang,
  };
  return await fetchAPI(path, urlParamsObject, options);
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const meta = await getGlobal(params.lang);

  if (!meta.data) return FALLBACK_SEO;

  // const { metadata, favicon, favicon_large, favicon_96x96, favicon_svg } =
  //   meta.data.attributes;
  // const { url } = favicon.data.attributes;
  // const { url: urlLarge } = favicon_large?.data?.attributes;
  // const { url: url96x96 } = favicon_96x96?.data?.attributes;
  // const { url: urlFavicon_svg } = favicon_svg?.data?.attributes;

  const { metadata, GoogleSiteVerification } = meta.data.attributes;

  // <link rel="icon" href="/favicon/favicon.ico" sizes="any">

  const m: Metadata = {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    verification: {
      google: GoogleSiteVerification,
    },
    // 48x48px, 96x96px, 144x144px
    icons: {
      icon: [
        { url: "/favicon-32x32.png", type: "image/png", sizes: "48x48" },
        { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
        { url: "/favicon-192x192.png", type: "image/png", sizes: "144x144" },
        { url: "/favicon.ico", rel: "icon", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml", rel: "icon" },
        {
          url: "/apple-touch-icon.png",
          rel: "mask-icon",
          color: "#5bbad5",
        },
      ],
      apple: [
        {
          url: "/apple-touch-icon.png",
          // type: "image/png",
          sizes: "180x180",
        },
      ],
      other: [
        {
          rel: "manifest",
          url: "/site.webmanifest",
        },
      ],
    },

    alternates: {
      canonical: `https://dentsu.lv/${params.lang}`,
      languages: {
        en: `https://dentsu.lv/en`,
        lv: `https://dentsu.lv/lv`,
      },
    },

    // Add OpenGraph data with locale
    // openGraph: {
    //   title: metadata.metaTitle,
    //   description: metadata.metaDescription,
    //   url: `https://dentsu.lv/${params.lang}`,
    //   siteName: metadata.siteName || "dentsu.lv",
    //   images: [
    //     {
    //       // url: metadata.ogImage,
    //       url:
    //         getStrapiMedia(
    //           meta.data.attributes.navbar.navbarLogo.logoImg.data.attributes.url
    //         ) || "",
    //       width: 1200,
    //       height: 630,
    //       alt: metadata.metaTitle,
    //     },
    //   ],
    //   locale: params.lang === "en" ? "en_US" : "lv_LV",
    //   type: "website",
    // },
  };

  return m;
}

export type StrapiLocaleType = {
  id: number;
  name: string;
  code: string;
  img: {
    data: {
      id: number;
      attributes: {
        url: string;
      };
    };
  };
};

const halcom = localFont({
  src: [
    {
      path: "../../../public/fonts/Halcom-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Halcom-Bold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
});

const getAvailableLocales = () => {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  return fetchAPI("/i18n/locales", options) as Promise<StrapiLocaleType[]>;
};

export default async function RootLayout({
  children,
  params,
}: {
  readonly children: React.ReactNode;
  readonly params: { lang: string };
}) {
  const global = await getGlobal(params.lang);

  // const availableLocales = await getAvailableLocales();

  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) return null;

  const {
    navbar,
    footer,
    CookieBanner: cookieBannerData,
    GoogleTagManagerID,
  } = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data?.attributes.url
  );

  const localesWithUrls = navbar.locales.map((locale: StrapiLocaleType) => {
    const localeUrl = locale.img.data?.attributes.url;
    return {
      ...locale,
      img: {
        ...locale.img,
        data: {
          ...locale.img.data,
          attributes: {
            ...locale.img.data.attributes,
            url: localeUrl ? getStrapiMedia(localeUrl) : null,
          },
        },
      },
    };
  });

  return (
    <CookieConsentProvider>
      <html className={`${halcom.className}`} lang={params.lang ?? "eng"}>
        <head>
          <LogoStructuredData
            logoUrl={navbarLogoUrl ?? ""}
            organizationName="Dentsu"
            siteUrl="https://dentsu.lv"
          />
          <GoogleTagManager gtmId={GoogleTagManagerID} />
          <GoogleAnalytics
            googleAnalyticsMeasurementId={
              global?.data?.attributes?.GoogleAnalyticsMeasurementId ?? ""
            }
          />
        </head>

        <body className="text-white">
          <GoogleTagManagerNoScript gtmId={GoogleTagManagerID} />
          <NavbarContent
            links={navbar.links}
            logoUrl={navbarLogoUrl}
            availableLocales={localesWithUrls}
            logoText={navbar.navbarLogo.logoText}
          />

          <main className="relative min-h-[94vh] overflow-hidden text-black">
            {children}
          </main>
          <CookieBanner cookieBannerData={cookieBannerData} />
          <Footer footer={footer} />
        </body>
      </html>
    </CookieConsentProvider>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
