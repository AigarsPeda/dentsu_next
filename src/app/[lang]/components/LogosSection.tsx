import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import Image from "next/image";

interface FeaturesType {
  id: number;
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
    feature: FeaturesType[];
  };
}

export default function LogosSection({ data }: LogosSectionProps) {
  return (
    <div className="container grid grid-cols-1 gap-6 px-6 mx-auto lg:gap-3 py-9 lg:py-12 lg:grid-cols-4">
      {data.feature.map((item: FeaturesType) => {
        const imgSrc = getStrapiMedia(item.media.data.attributes.url);
        return (
          <div key={item.id} className="flex items-center justify-center">
            {imgSrc ? (
              <Image
                width={600}
                height={600}
                src={imgSrc}
                alt="our client logo"
                className="object-contain h-4 lg:h-7"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              <div className="flex items-center justify-center w-24 h-24 bg-gray-200">
                No Image Available
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
