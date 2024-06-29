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
    <div className="relative overflow-hidden lg:h-[680px]">
      <div
        className={classNames(
          data.pictureOnRight ? "lg:left-[40%]" : "lg:right-[40%]",
          "w-full lg:absolute lg:h-[550px] h-[400px] lg:pb-10"
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
            ? "lg:left-0 lg:pl-[8.4rem] lg:p-14 px-9 py-9"
            : "lg:right-0 lg:p-14 lg:pl-14 px-9 py-9",
          "lg:absolute bottom-20 bg-gray-950 lg:w-[800px]"
        )}
      >
        <div className="sm:mx-auto sm:container">
          <h3 className="max-w-xl text-white">{data.description}</h3>
        </div>
      </div>
    </div>
  );
}
