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
        <div className="grid w-full grid-cols-1 overflow-hidden md:grid-cols-2">
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
          <div className="pt-12 pb-5 bg-black min-h-[50vw]">
            <TitleInCircleWithLine
              pictureOnRight
              title={data.feature.title}
              description={data.feature.description}
            />
          </div>
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 md:grid-cols-2">
          <div className="pt-16 pb-5 bg-black min-h-[50vw]">
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
