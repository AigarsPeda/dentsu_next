import TitleInCircleWithLine from "@/app/[lang]/components/TitleInCircleWithLine";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";

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
        <div className="grid w-full grid-cols-1 overflow-hidden md:grid-cols-2 md:h-[55rem] min-h-[30rem]">
          <div className="w-full h-full bg-center bg-cover">
            {imgUrl && (
              <img
                src={imgUrl}
                alt={
                  data.feature.media.data[0].attributes.alternativeText ??
                  "none provided"
                }
                className="object-cover w-full h-full overflow-hidden"
              />
            )}
          </div>
          {/* min-h-[50vw] */}
          <div className="bg-black">
            <TitleInCircleWithLine
              pictureOnRight
              title={data.feature.title}
              description={data.feature.description}
            />
          </div>
        </div>
      ) : (
        // min-h-[50vw]
        <div className="grid w-full grid-cols-1 md:grid-cols-2 md:h-[55rem] min-h-[30rem]">
          <div className="bg-black">
            <TitleInCircleWithLine
              title={data.feature.title}
              description={data.feature.description}
            />
          </div>
          <div className="w-full h-full bg-center bg-cover">
            {imgUrl && (
              <img
                src={imgUrl}
                alt={
                  data.feature.media.data[0].attributes.alternativeText ??
                  "none provided"
                }
                className="object-cover w-full h-full overflow-hidden"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
