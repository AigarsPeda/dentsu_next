"use client";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface FeaturesType {
  id: number;
  url: string | null;
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

  const getUrl = (url: string | null) => {
    if (isOurLink(url)) {
      if (isUrlMatchToSearch(url)) {
        return `/${urlLocale}/ourwork`;
      }

      return `/${urlLocale}/ourwork?search=${url}`;
    }

    return url || "";
  };

  return (
    <div
      className={classNames(
        !data.showInMobile ? "hidden md:flex" : "md:flex",
        "container flex-wrap items-center justify-between block mx-auto space-y-6 md:space-y-0 py-9 lg:py-12"
      )}
    >
      {data.company?.map((item: FeaturesType) => {
        const imgSrc = getStrapiMedia(item.media.data.attributes.url);
        return (
          <Link
            key={item.id}
            href={getUrl(item.url)}
            target={isOurLink(item.url) ? "_self" : "_blank"}
            className={classNames("flex items-center justify-center")}
          >
            {imgSrc ? (
              <img
                src={imgSrc}
                alt="our client logo"
                className={classNames(
                  isUrlMatchToSearch(item.url) ? "opacity-50" : "",
                  "object-contain w-full h-full lg:max-h-6 max-h-4"
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
