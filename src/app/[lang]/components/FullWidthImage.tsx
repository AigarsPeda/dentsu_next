import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import Image from "next/image";

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
  const imgUrl = getStrapiMedia(data.image.data[0]?.attributes.url);

  return (
    <div className="mx-auto h-96">
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
  );
}
