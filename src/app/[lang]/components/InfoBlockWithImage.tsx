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
    <div className="flex flex-col w-full md:flex-row md:pb-14">
      {imgUrl && !data.pictureOnRight && (
        <div className={classNames("md:w-[60%]")}>
          <img
            src={imgUrl}
            alt={"Image"}
            className={classNames(
              "object-cover w-full h-full top-0 left-0 bg-gray-300 max-h-[30rem]"
            )}
          />
        </div>
      )}
      <div className="relative md:w-[40%]">
        <div
          className={classNames(
            !data.pictureOnRight ? "-left-28" : "-right-28 justify-end",
            "md:absolute p-10 mx-auto text-white bg-black container -bottom-10 md:w-[150%] flex"
          )}
        >
          <div className="max-w-[37.5rem]">
            <h3>{data.description}</h3>
          </div>
        </div>
      </div>
      {imgUrl && data.pictureOnRight && (
        <div className="md:w-[60%]">
          <img
            src={imgUrl}
            alt={"Image"}
            className={classNames(
              "object-cover w-full h-full top-0 left-0 bg-gray-300 max-h-[30rem]"
            )}
          />
        </div>
      )}
    </div>
  );
}
