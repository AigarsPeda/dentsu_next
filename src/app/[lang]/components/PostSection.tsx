import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image";
import ArrowIcon from "./icons/ArrowIcon";

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
  media: {
    data: MediaType[];
  };
}

interface PostSectionProps {
  data: {
    feature: FeaturesType[];
  };
}

export default function PostSection({ data }: PostSectionProps) {
  return (
    <div className="container mx-auto mb-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-12 place-content-center">
        {data.feature.map((item) => {
          const imgUrl = getStrapiMedia(item.media.data[0].attributes.url);
          return (
            <div key={item.id}>
              {imgUrl && (
                <img
                  src={imgUrl}
                  alt="our client logo"
                  className="object-cover h-[300px] lg:h-[400px] lg:max-h-[500px] max-h-[250px]"
                />
              )}
              <div className="flex items-end p-6 bg-gray-950 text-gray-50">
                <div className="w-full">
                  <div className="mb-5 overflow-hidden md:h-20 custom-clamp-2">
                    <h6 title={item.title}>{item.title}</h6>
                  </div>
                  <div className="h-24 overflow-hidden custom-clamp-4">
                    <p
                      title={item.description}
                      className="text-base font-normal text-gray-300"
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
                    <ArrowIcon className="w-9 h-9" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
