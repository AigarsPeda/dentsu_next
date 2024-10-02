"use client";
import ArrowIcon from "@/app/[lang]/components/icons/ArrowIcon";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { IMAGE_DATA_FOR_BLUR } from "./NewsPostSection";
import { loader } from "./ServicesHeadlineWithImage";

interface MediaType {
  id: string;
  attributes: {
    url: string;
    width: number;
    height: number;
    caption: string | null;
    alternativeText: string | null;
  };
}

interface FeaturesType {
  id: number;
  title: string;
  postUrl: string;
  isNewTab: boolean;
  description: string;
  company: string | null;
  media: {
    data: MediaType[];
  };
}

interface PostSectionProps {
  data: {
    post: FeaturesType[];
  };
}

export default function PostSection({ data }: PostSectionProps) {
  const path = usePathname();
  const params = useSearchParams();
  const [parent] = useAutoAnimate();

  const search = params.get("search");

  const filteredData = useMemo(() => {
    return data.post.filter((item) => {
      return item.company?.toLowerCase().includes(search?.toLowerCase() || "");
    });
  }, [data.post, search]);

  const urlLocale = path.split("/")[1] || "en";

  return (
    <div className="container mx-auto mb-10">
      <ul
        ref={parent}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10 place-content-center"
      >
        {filteredData.map((item) => {
          const imgUrl = getStrapiMedia(item.media.data[0].attributes.url);
          return (
            <li
              key={item.id}
              className="overflow-hidden transition-colors bg-black group hover:bg-dentsu-hover"
            >
              <a
                href={`/${urlLocale}/${item.postUrl}`}
                target={item.isNewTab ? "_blank" : "_self"}
              >
                <div className="md:aspect-[16/9] aspect-[4/3] relative overflow-hidden">
                  <Image
                    priority
                    width={600}
                    height={337}
                    alt="post image"
                    placeholder="blur"
                    src={imgUrl || ""}
                    className="transition-all duration-300 group-hover:scale-105"
                    blurDataURL={IMAGE_DATA_FOR_BLUR}
                    loader={loader}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <div className="flex items-end justify-between p-6 transition-colors text-gray-50">
                  <div>
                    <div className="overflow-hidden h-14 custom-clamp-2">
                      <h6 title={item.title}>{item.title}</h6>
                    </div>
                    <div className="h-24 overflow-hidden custom-clamp-5">
                      <p
                        title={item.description}
                        className="text-sm font-normal text-white"
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="p-0.5 md:ml-9 ml-4">
                    <div className="flex items-center justify-center text-center text-white transform -rotate-90 rounded-md">
                      <ArrowIcon className="fill-white w-9 h-9" />
                    </div>
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
