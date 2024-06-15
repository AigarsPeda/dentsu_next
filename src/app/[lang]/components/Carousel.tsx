import { getStrapiMedia } from "../utils/api-helpers";

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

interface ImageCarouselProps {
  id: number;
  url: null | string;
  media: {
    data: MediaType[];
  };
}

interface CarouselProps {
  data: {
    id: number;
    imageCarousel: ImageCarouselProps[];
  };
}

export default function Carousel({ data }: CarouselProps) {
  return (
    <div className="bg-gray-950">
      <div className="container grid grid-cols-3 gap-10 py-10 overflow-hidden">
        {data.imageCarousel?.slice(0, 3).map((image, index) => {
          const mediaUrl = image.media.data?.[0]?.attributes?.url;
          const src = mediaUrl ? getStrapiMedia(mediaUrl) : image.url || "";

          return (
            <div key={index} className="flex flex-col w-full h-full">
              <img
                src={src}
                className="object-cover w-auto h-full max-h-96"
                alt={`Carousel image ${index + 1}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
