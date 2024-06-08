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
      <div className="container px-10 py-20 pb-20 mx-auto lg:px-60 ">
        <h2 className="pb-16 text-5xl font-normal text-center">{data.title}</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {data.feature.map((item: FeaturesType) => {
            const imgSrc = getStrapiMedia(item.media.data.attributes.url);
            return (
              <div key={item.id} className="flex items-center justify-center">
                {imgSrc && (
                  <Image
                    width={600}
                    height={600}
                    src={imgSrc}
                    alt="our client logo"
                    className="object-contain max-w-[170px] h-16"
                    style={{
                      width: "100%",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
