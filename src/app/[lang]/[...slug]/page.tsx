// import { sectionRenderer } from "@/app/[lang]/utils/section-renderer";
// import { Metadata } from "next";
// import { getPageBySlug } from "@/app/[lang]/utils/get-page-by-slug";
// import { FALLBACK_SEO } from "@/app/[lang]/utils/constants";

// type Props = {
//   params: {
//     lang: string;
//     slug: string;
//   };
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const page = await getPageBySlug(params.slug, params.lang);

//   if (!page?.data?.[0]?.attributes?.seo) return FALLBACK_SEO;
//   const metadata = page.data[0]?.attributes?.seo;

//   // Get base URL from environment or use a default
//   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dentsu.lv";

//   // Construct canonical URL
//   const canonicalPath = params.slug ? `/${params.slug}` : "";
//   const langPrefix = `/${params.lang}`;
//   const canonicalUrl = `${baseUrl}${langPrefix}${canonicalPath}`;

//   return {
//     title: metadata.metaTitle,
//     description: metadata.metaDescription,
//     alternates: {
//       canonical: canonicalUrl,
//     },
//   };
// }

// export default async function PageRoute({ params }: Props) {
//   console.log("Params:", params);
//   const page = await getPageBySlug(params.slug, params.lang);

//   console.log("Page data ???:", page);

//   // Redirect to home page if page is not found
//   if (page.data.length === 0) {
//     // Redirect to home page if page is not found
//     const home = await getPageBySlug("home", "lv");
//     const contentSectionsHome = home.data[0]?.attributes?.contentSections;

//     if (!contentSectionsHome || !Array.isArray(contentSectionsHome))
//       return null;

//     return contentSectionsHome.map((section: any, index: number) =>
//       sectionRenderer(section, index)
//     );
//   }

//   const contentSections = page.data[0]?.attributes?.contentSections;

//   // Add safety check for contentSections
//   if (!contentSections || !Array.isArray(contentSections)) return null;

//   return contentSections.map((section: any, index: number) =>
//     sectionRenderer(section, index)
//   );
// }
import { sectionRenderer } from "@/app/[lang]/utils/section-renderer";
import { Metadata } from "next";
import { getPageBySlug } from "@/app/[lang]/utils/get-page-by-slug";
import { FALLBACK_SEO } from "@/app/[lang]/utils/constants";

type Props = {
  params: {
    lang: string;
    slug: string | string[]; // Accept array for catch-all routes
  };
};

const DEFAULT_LANG = "lv";
const FALLBACK_LANG = "en";

function getSlug(slug: string | string[]): string {
  return Array.isArray(slug) ? slug.join("/") : slug;
}

// Generate metadata for the page based on the slug and language. If the page is not found in the requested language, it falls back to another language.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = getSlug(params.slug);
  let page = await getPageBySlug(slug, params.lang);

  if (!page?.data?.length) {
    const fallbackLang =
      params.lang === DEFAULT_LANG ? FALLBACK_LANG : DEFAULT_LANG;
    page = await getPageBySlug(slug, fallbackLang);
  }

  if (!page?.data?.[0]?.attributes?.seo) return FALLBACK_SEO;
  const metadata = page.data[0]?.attributes?.seo;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dentsu.lv";
  const canonicalPath = slug ? `/${slug}` : "";
  const langPrefix = `/${params.lang}`;
  const canonicalUrl = `${baseUrl}${langPrefix}${canonicalPath}`;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// Getting page data if not exists in requested language, fallback to another language
export default async function PageRoute({ params }: Props) {
  const slug = getSlug(params.slug);

  // Try requested language first
  let page = await getPageBySlug(slug, params.lang);

  // If not found, try fallback language
  if (!page?.data?.length) {
    const fallbackLang =
      params.lang === DEFAULT_LANG ? FALLBACK_LANG : DEFAULT_LANG;
    page = await getPageBySlug(slug, fallbackLang);
  }

  // If still not found, show home page in default language
  if (!page?.data?.length) {
    const home = await getPageBySlug("home", DEFAULT_LANG);
    const contentSectionsHome = home.data[0]?.attributes?.contentSections;
    if (!contentSectionsHome || !Array.isArray(contentSectionsHome))
      return null;
    return contentSectionsHome.map((section: any, index: number) =>
      sectionRenderer(section, index)
    );
  }

  const contentSections = page.data[0]?.attributes?.contentSections;
  if (!contentSections || !Array.isArray(contentSections)) return null;

  return contentSections.map((section: any, index: number) =>
    sectionRenderer(section, index)
  );
}
