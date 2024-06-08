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
    <div className="relative overflow-hidden h-[1150px] w-screen">
      <div
        className={classNames(
          data.pictureOnRight ? "left-[40%]" : "right-[40%]",
          "w-full absolute h-[1000px] pb-10"
        )}
      >
        {imgUrl && (
          <Image
            src={imgUrl}
            width={2000}
            height={2000}
            className="object-cover w-full h-full"
            alt={"none provided"}
            style={{
              width: "100%",
            }}
          />
        )}
      </div>
      <div
        className={classNames(
          data.pictureOnRight ? "left-0 pl-52 p-24" : "right-0 p-24",
          "absolute bottom-0 bg-gray-950 w-[1080px]"
        )}
      >
        <p className="max-w-xl text-5xl font-normal text-white">
          {data.description}
        </p>
      </div>
    </div>
  );
}
