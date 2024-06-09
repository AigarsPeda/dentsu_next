import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import Image from "next/image";

interface MediaTypes {
  id: number;
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
  newTab: boolean;
  media: {
    data: MediaTypes;
  };
  url: string | null;
}

interface ClientSectionsProps {
  data: { title: string; feature: FeaturesType[] };
}

export default function ClientSections({ data }: ClientSectionsProps) {
  return (
    <div className="bg-[#e5e5e9]">
      <div className="container px-5 mx-auto lg:pb-20 py-9 lg:px-60">
        <h2 className="pb-8 text-xl font-normal text-center lg:pb-14 lg:text-4xl">
          {data.title}
        </h2>
        <div className="pb-3 overflow-x-auto">
          <div className="grid grid-cols-6 gap-4 lg:gap-8 min-w-[1080px]">
            {data.feature.map((item) => {
              const imgSrc = getStrapiMedia(item.media.data.attributes.url);
              return (
                <div key={item.id} className="flex items-center justify-center">
                  {imgSrc && (
                    <Image
                      width={600}
                      height={600}
                      src={imgSrc}
                      alt="our client logo"
                      className="object-contain max-w-[170px] lg:h-16 h-12"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
