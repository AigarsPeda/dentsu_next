import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";

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
  const src = getStrapiMedia(data.media.data[0]?.attributes?.url) ?? "";

  return (
    <div className="container mx-auto md:aspect-[4/1] aspect-[1/1]">
      <img src={src} alt={alt} className="object-cover w-full h-full" />
    </div>
  );
}
