import LangRedirect from "@/app/[lang]/components/LangRedirect";
import { getPageBySlug } from "@/app/[lang]/utils/get-page-by-slug";
import { sectionRenderer } from "@/app/[lang]/utils/section-renderer";

export default async function RootRoute({
  params,
}: {
  params: { lang: string };
}) {
  try {
    const page = await getPageBySlug("home", params.lang ?? "lv");

    if (page.error && page.error.status == 401)
      throw new Error(
        "Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/"
      );

    // if (page.data?.length == 0 && params.lang !== "en") return <LangRedirect />;

    if (page.data?.length === 0) return null;

    const contentSections = page.data[0]?.attributes?.contentSections;

    return contentSections.map((section: any, index: number) =>
      sectionRenderer(section, index)
    );
  } catch (error: any) {
    window.alert("Missing or invalid credentials");
  }
}
