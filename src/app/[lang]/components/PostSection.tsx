import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image";

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
    <div className="container px-8 mx-auto mb-10 lg:px-0">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-12 place-content-center">
        {data.feature.map((item) => {
          const imgUrl = getStrapiMedia(item.media.data[0].attributes.url);
          return (
            <div key={item.id}>
              {imgUrl && (
                <Image
                  width={600}
                  height={600}
                  src={imgUrl}
                  alt={"none provided"}
                  className="object-cover h-[300px] md:h-[500px]"
                  style={{
                    width: "100%",
                  }}
                />
              )}
              <div className="p-6 bg-gray-950 text-gray-50">
                <div className="mb-5 overflow-hidden custom-clamp-2">
                  <h2 title={item.title} className="text-2xl">
                    {item.title}
                  </h2>
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
