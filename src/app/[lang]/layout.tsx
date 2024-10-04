import CookieBanner from "@/app/[lang]/components/CookieBanner";
import Footer from "@/app/[lang]/components/Footer";
import NavbarContent from "@/app/[lang]/components/Navbar";
import "@/app/[lang]/globals.css";
import { getStrapiMedia, getStrapiURL } from "@/app/[lang]/utils/api-helpers";
import { FALLBACK_SEO } from "@/app/[lang]/utils/constants";
import { fetchAPI } from "@/app/[lang]/utils/fetch-api";
import GoogleAnalytics from "@/script/GoogleAnalytics";
import { i18n } from "i18n-config";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { CookieConsentProvider } from "../../contexts/CookieConsentContext";

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

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  const m = {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: new URL(
        `${getStrapiURL(process.env.NEXT_PUBLIC_STRAPI_PATH)}${url}`
      ),
    },
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

  const { navbar, footer } = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data?.attributes.url
  );

  // const footerLogoUrl = getStrapiMedia(
  //   footer.footerLogo?.logoImg?.data?.attributes.url
  // );

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
        <GoogleAnalytics
          googleAnalyticsMeasurementId={
            global?.data?.attributes?.GoogleAnalyticsMeasurementId ?? ""
          }
        />
        <body className="text-white">
          <NavbarContent
            links={navbar.links}
            logoUrl={navbarLogoUrl}
            availableLocales={localesWithUrls}
            logoText={navbar.navbarLogo.logoText}
          />

          <main className="relative min-h-[94vh] overflow-hidden text-black">
            {children}
          </main>
          <CookieBanner />
          <Footer footer={footer} />
        </body>
      </html>
    </CookieConsentProvider>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
