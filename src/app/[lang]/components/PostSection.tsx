"use client";
import ArrowIcon from "@/app/[lang]/components/icons/ArrowIcon";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useSearchParams } from "next/navigation";

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
  const params = useSearchParams();
  const [parent] = useAutoAnimate();
  const search = params.get("search");

  const filteredData = data.post.filter((item) => {
    return item.company?.toLowerCase().includes(search?.toLowerCase() || "");
  });

  return (
    <div className="container mx-auto mb-10">
      <ul
        ref={parent}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-12 place-content-center"
      >
        {filteredData.map((item) => {
          const imgUrl = getStrapiMedia(item.media.data[0].attributes.url);
          return (
            <li key={item.id}>
              {imgUrl && (
                <img
                  src={imgUrl}
                  alt="our client logo"
                  className="object-cover w-full lg:h-[400px] lg:max-h-[500px] max-h-[250px] bg-gray-300"
                />
              )}
              <div className="flex items-end p-6 bg-gray-950 text-gray-50">
                <div className="w-full">
                  <div className="mb-3 overflow-hidden h-14 custom-clamp-2">
                    <h6 title={item.title}>{item.title}</h6>
                  </div>
                  <div className="h-24 overflow-hidden custom-clamp-4">
                    <p
                      title={item.description}
                      className="text-sm font-normal text-gray-300"
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="p-0.5 md:ml-9 ml-4">
                  <a
                    href={item.postUrl}
                    target={item.isNewTab ? "_blank" : "_self"}
                    className="flex items-center justify-center text-center text-white transform -rotate-90 rounded-md"
                  >
                    <ArrowIcon className="fill-white w-9 h-9" />
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
