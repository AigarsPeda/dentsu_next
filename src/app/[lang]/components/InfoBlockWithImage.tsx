import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import classNames from "classnames";

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
    <div className="relative overflow-hidden lg:h-[900px] lg:w-screen">
      <div
        className={classNames(
          data.pictureOnRight ? "lg:left-[40%]" : "lg:right-[40%]",
          "w-full lg:absolute lg:h-[700px] h-[400px] lg:pb-10"
        )}
      >
        {imgUrl && (
          <img
            src={imgUrl}
            alt="our client logo"
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <div
        className={classNames(
          data.pictureOnRight
            ? "lg:left-0 lg:pl-[8.5rem] lg:p-24 px-9 py-9"
            : "lg:right-0 lg:p-24 lg:pl-32 px-9 py-9",
          "lg:absolute bottom-20 bg-gray-950 lg:w-[900px]"
        )}
      >
        <h3 className="max-w-xl text-white">{data.description}</h3>
      </div>
    </div>
  );
}
