import { getStrapiMedia } from "../utils/api-helpers";
import ArrowIcon from "./icons/ArrowIcon";

interface ServicesHeadlineWithImageProps {
  data: {
    id: number;
    title: string;
    media: {
      data: {
        id: number;
        attributes: {
          url: string;
          width: number;
          height: number;
          caption: null | string;
          alternativeText: null | string;
        };
      }[];
    };
  };
}

export default function ServicesHeadlineWithImage({
  data,
}: ServicesHeadlineWithImageProps) {
  const imgUrl = getStrapiMedia(data.media.data[0].attributes.url) ?? "";

  return (
    <div
      className="bg-center bg-cover"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <div className="container mx-auto mb-10">
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
          <div className="absolute bottom-0 flex items-center justify-center max-w-xl px-10 pt-10 pb-5 bg-white right-20">
            <div>
              <div className="text-left">
                <h3 className="font-normal text-gray-950">{data.title}</h3>
              </div>
              {/* animate-bounce */}
              <div className="flex items-center justify-center w-full mt-10">
                <ArrowIcon className="w-8 h-8 fill-gray-950" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
