import Banner from "@/app/[lang]/components/Banner";
import Footer from "@/app/[lang]/components/Footer";
import Navbar from "@/app/[lang]/components/Navbar";
import "@/app/[lang]/globals.css";
import { FALLBACK_SEO } from "@/app/[lang]/utils/constants";
import { fetchAPI } from "@/app/[lang]/utils/fetch-api";
import type { Metadata } from "next";
import { i18n } from "../../../i18n-config";
import { getStrapiMedia, getStrapiURL } from "./utils/api-helpers";

// import HalcomRegular from "./fonts/Halcom-Regular.otf";

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

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
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

  const { notificationBanner, navbar, footer } = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data?.attributes.url
  );

  const footerLogoUrl = getStrapiMedia(
    footer.footerLogo?.logoImg?.data?.attributes.url
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
    <html lang={params.lang}>
      <body className="text-gray-100">
        <Navbar
          links={navbar.links}
          logoUrl={navbarLogoUrl}
          availableLocales={localesWithUrls}
          logoText={navbar.navbarLogo.logoText}
        />

        <main className="min-h-screen text-gray-800">{children}</main>

        <Banner data={notificationBanner} />
        <Footer footer={footer} />
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
