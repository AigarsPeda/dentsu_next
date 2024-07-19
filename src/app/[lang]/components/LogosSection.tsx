"use client";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface FeaturesType {
  id: number;
  url: string | null;
  redirectToOurWork: boolean;
  media: {
    data: {
      id: string;
      attributes: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
}

interface LogosSectionProps {
  data: {
    showInMobile: boolean;
    company: FeaturesType[];
  };
}

export default function LogosSection({ data }: LogosSectionProps) {
  const path = usePathname();
  const params = useSearchParams();
  const search = params.get("search");
  const urlLocale = path.split("/")[1] || "en";

  const isUrlMatchToSearch = (url: string | null) => {
    if (!search) {
      return false;
    }

    return url === search;
  };

  const isOurLink = (url: string | null) => {
    if (!url) {
      return false;
    }

    // if url includes "http" or "https" return false
    if (url.includes("http") || url.includes("https")) {
      return false;
    }

    return true;
  };

  const getUrl = (url: string | null, redirectToOurWork: boolean) => {
    if (isOurLink(url) && redirectToOurWork) {
      if (isUrlMatchToSearch(url)) {
        return `/${urlLocale}/ourwork`;
      }

      return `/${urlLocale}/ourwork?search=${url}`;
    }

    if (isOurLink(url) && !redirectToOurWork) {
      if (isUrlMatchToSearch(url)) {
        return `${path}`;
      }

      return `${path}?search=${url}`;
    }

    return url || "";
  };

  return (
    <div
      className={classNames(
        !data.showInMobile ? "hidden md:grid" : "md:grid",
        "grid-cols-1 lg:grid-cols-4 gap-6 py-10 lg:py-14 space-y-7 md:space-y-0 container mx-auto"
      )}
    >
      {data.company?.map((item: FeaturesType) => {
        const imgSrc = getStrapiMedia(item.media.data.attributes.url);
        const isLink = item.url ? true : false;

        if (!isLink) {
          return (
            <div
              key={item.id}
              className={classNames(
                "flex items-center justify-center md:block",
                isUrlMatchToSearch(item.url) ? "opacity-50" : ""
              )}
            >
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt="our client logo"
                  className={classNames(
                    "object-contain max-h-6 transition-all"
                  )}
                />
              ) : (
                <div className="flex items-center justify-center w-24 h-24 bg-gray-200">
                  No Image Available
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.id}
            scroll={false}
            href={getUrl(item.url, item.redirectToOurWork)}
            target={isOurLink(item.url) ? "_self" : "_blank"}
            className={classNames("flex items-center justify-center md:block")}
          >
            {imgSrc ? (
              <img
                src={imgSrc}
                alt="our client logo"
                className={classNames(
                  isUrlMatchToSearch(item.url) ? "opacity-50" : "",
                  "object-contain max-h-6 hover:opacity-50 transition-all"
                )}
              />
            ) : (
              <div className="flex items-center justify-center w-24 h-24 bg-gray-200">
                No Image Available
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
