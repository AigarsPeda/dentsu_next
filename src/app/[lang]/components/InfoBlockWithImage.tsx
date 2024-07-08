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
    <div
      className={classNames(
        data.pictureOnRight ? "justify-end" : "justify-start",
        "relative flex flex-col w-full md:flex-row md:pb-14"
      )}
    >
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

      <div className={classNames("md:absolute bottom-0 w-full")}>
        <div
          className={classNames(
            !data.pictureOnRight ? "justify-end" : "",
            "container flex mx-auto bg-black md:bg-transparent"
          )}
        >
          <div
            className={classNames(
              data.pictureOnRight ? "md:pl-0" : "",
              "relative max-w-3xl text-white bg-black md:p-5 py-6"
            )}
          >
            <h3>{data.description}</h3>
            <div
              className={classNames(
                !data.pictureOnRight ? "left-full" : "right-full",
                "absolute bottom-0 w-full h-full bg-black hidden md:block"
              )}
            ></div>
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
