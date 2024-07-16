import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";

interface FullWidthImageProps {
  data: {
    id: number;
    image: {
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

export default function FullWidthImage({ data }: FullWidthImageProps) {
  const imgUrl = getStrapiMedia(data.image.data?.[0]?.attributes?.url);

  return (
    <div className="mx-auto h-96">
      {imgUrl && (
        <img
          src={imgUrl ?? ""}
          alt="our client logo"
          className="object-cover w-full h-full"
        />
      )}
    </div>
  );
}
