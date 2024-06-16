import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import Image from "next/image";

interface PostImageProps {
  data: {
    media: {
      data: {
        id: number;
        attributes: {
          url: string;
          alternativeText: string | null;
          caption: string | null;
        };
      }[];
    };
  };
}

export default function PostImage({ data }: PostImageProps) {
  const alt = data.media.data[0].attributes.alternativeText ?? "";
  const src = getStrapiMedia(data.media.data[0].attributes.url) ?? "";

  return (
    <div className="container py-3 mx-auto h-96">
      <Image
        src={src}
        alt={alt}
        width={600}
        height={600}
        className="object-cover w-full h-full"
      />
    </div>
  );
}
