import { sectionRenderer } from "@/app/[lang]/utils/section-renderer";
import { Metadata } from "next";
import { getPageBySlug } from "@/app/[lang]/utils/get-page-by-slug";
import { FALLBACK_SEO } from "@/app/[lang]/utils/constants";

type Props = {
  params: {
    lang: string;
    slug: string;
  };
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const page = await getPageBySlug(params.slug, params.lang);

//   if (!page?.data?.[0]?.attributes?.seo) return FALLBACK_SEO;
//   const metadata = page.data[0]?.attributes?.seo;

//   // Construct canonical URL
//   const baseUrl = "https://dentsu.lv"; // Your canonical domain
//   const canonicalPath = params.slug ? `/${params.slug}` : "";
//   const langPrefix = params.lang !== "lv" ? `/${params.lang}` : ""; // Assuming 'lv' is default language with no prefix
//   const canonicalUrl = `${baseUrl}${langPrefix}${canonicalPath}`;

//   return {
//     title: metadata.metaTitle,
//     description: metadata.metaDescription,
//     alternates: {
//       canonical: canonicalUrl,
//     },
//   };
// }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPageBySlug(params.slug, params.lang);

  if (!page?.data?.[0]?.attributes?.seo) return FALLBACK_SEO;
  const metadata = page.data[0]?.attributes?.seo;

  // Get base URL from environment or use a default
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dentsu.lv";

  // Construct canonical URL
  const canonicalPath = params.slug ? `/${params.slug}` : "";
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

export default async function PageRoute({ params }: Props) {
  const page = await getPageBySlug(params.slug, params.lang);
  if (page.data.length === 0) return null;
  const contentSections = page.data[0]?.attributes?.contentSections;

  // Add safety check for contentSections
  if (!contentSections || !Array.isArray(contentSections)) return null;

  return contentSections.map((section: any, index: number) =>
    sectionRenderer(section, index)
  );
}
