import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import classNames from "classnames";
import Image from "next/image";

type PictureType = {
  id: string;
  attributes: {
    url: string;
    width: number;
    height: number;
    caption: string | null;
    alternativeText: string | null;
  };
};

type PictureDataType = {
  data: PictureType[];
};

interface InfoBlockWithImageProps {
  data: {
    description: string;
    pictureOnRight: boolean;
    picture: PictureDataType;
  };
}

export default function InfoBlockWithImage({ data }: InfoBlockWithImageProps) {
  const imgUrl = getStrapiMedia(data.picture.data[0]?.attributes.url);

  return (
    <div className="relative overflow-hidden lg:h-[1150px] lg:w-screen">
      <div
        className={classNames(
          data.pictureOnRight ? "lg:left-[40%]" : "lg:ght-[40%]",
          "w-full lg:absolute lg:h-[1000px] h-[400px] lg:pb-10"
        )}
      >
        {imgUrl && (
          <Image
            src={imgUrl}
            width={2000}
            height={2000}
            className="object-cover h-full lg:w-full"
            alt={"none provided"}
            style={{
              width: "100%",
            }}
          />
        )}
      </div>
      <div
        className={classNames(
          data.pictureOnRight
            ? "lg:left-0 lg:pl-52 lg:p-24 px-10 py-9"
            : "lg:right-0 lg:p-24 px-10 py-9",
          "lg:absolute bottom-0 bg-gray-950 lg:w-[1080px]"
        )}
      >
        <p className="max-w-xl text-base font-normal text-white lg:text-5xl">
          {data.description}
        </p>
      </div>
    </div>
  );
}
