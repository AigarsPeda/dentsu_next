import TitleInCircleWithLine from "@/app/[lang]/components/TitleInCircleWithLine";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import Image from "next/image";

interface MediaType {
  id: number;
  attributes: {
    url: string;
    width: number;
    height: number;
    caption: null | string;
    alternativeText: null | string;
  };
}

interface PostSectionWithImageProps {
  data: {
    id: number;
    feature: {
      title: string;
      description: string;
      pictureOnRight: boolean;
      media: {
        data: MediaType[];
      };
    };
  };
}

export default function PostSectionWithImage({
  data,
}: PostSectionWithImageProps) {
  const imgUrl = getStrapiMedia(data.feature.media.data[0]?.attributes.url);

  return (
    <>
      {data.feature.pictureOnRight ? (
        <div className="grid w-full grid-cols-2 overflow-hidden">
          <div className="w-full h-full bg-center bg-cover">
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
          <div className="pt-12 pb-5 bg-gray-950">
            <TitleInCircleWithLine
              pictureOnRight
              title={data.feature.title}
              description={data.feature.description}
            />
          </div>
        </div>
      ) : (
        <div className="grid w-full grid-cols-2">
          <div className="pt-16 pb-5 bg-gray-950">
            <TitleInCircleWithLine
              title={data.feature.title}
              description={data.feature.description}
            />
          </div>
          <div className="w-full h-full bg-center bg-cover">
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
        </div>
      )}
    </>
  );
}
