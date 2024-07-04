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
  const imgUrl = getStrapiMedia(data.media.data[0]?.attributes.url) ?? "";

  return (
    <div className="relative w-full h-full">
      <img
        src={imgUrl}
        alt="our client logo"
        className="object-cover w-full h-[62vh]"
      />
      <div className="inset-0 w-full h-full grid-cols-2 md:grid md:absolute">
        <div className="flex items-end w-full h-full col-span-1 col-end-3 start-1">
          <div className="bg-white max-w-[35rem]">
            <h3 className="p-10 font-normal text-gray-950 md:p-12">
              {data.title}
            </h3>
            <div className="items-center justify-center hidden w-full md:flex md:mt-14">
              <ArrowIcon className="w-8 h-8 fill-gray-950 " />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="md:absolute mx-auto bottom-0 right-0 md:max-w-[50%] md:pr-24">
        <div className="p-10 bg-white md:p-12">
          <h3 className="font-normal text-gray-950">{data.title}</h3>
          <div className="items-center justify-center hidden w-full md:flex md:mt-20 ">
            <ArrowIcon className="w-8 h-8 fill-gray-950 " />
          </div>
        </div>
      </div> */}
    </div>
  );
}
