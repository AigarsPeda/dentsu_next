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
      <div className="container mx-auto">
        <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
          <div className="absolute bottom-0 grid items-center justify-center w-full grid-cols-1 mx-auto min-h-56 md:grid-cols-2">
            <div></div>
            <div className="h-full max-w-xl p-12 bg-white">
              <div className="text-left">
                <h3 className="font-normal text-gray-950">{data.title}</h3>
              </div>
              <div className="flex items-center justify-center w-full mt-20">
                <ArrowIcon className="w-8 h-8 fill-gray-950" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
