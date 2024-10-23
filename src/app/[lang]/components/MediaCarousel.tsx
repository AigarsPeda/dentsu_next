"use client";
import MediaModal, {
  isImageUrl,
  isVideoUrl,
} from "@/app/[lang]/components/MediaModal";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { useMemo, useState } from "react";
import { PiPlayCircleThin } from "react-icons/pi";
import captureVideoFrame from "src/app/[lang]/utils/captureVideoFrame";
import classNames from "src/app/[lang]/utils/classNames";
import getEmbedUrl from "src/app/[lang]/utils/getEmbedUrl";

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
  thumbnail: {
    data: MediaType;
  };
}

interface CarouselProps {
  data: {
    id: number;
    imageCarousel: ImageCarouselProps[];
  };
}

export default function MediaCarousel({ data }: CarouselProps) {
  const [firstImageSelected, setFirstImageSelected] = useState<number | null>(
    null
  );

  const length = useMemo(() => data.imageCarousel.length, [data]);

  const prev = () => {
    setFirstImageSelected((curr) => {
      if (curr === null) return null;
      return curr === 0 ? data.imageCarousel.length - 1 : curr - 1;
    });
  };

  const next = () => {
    setFirstImageSelected((curr) => {
      if (curr === null) return null;
      return curr === data.imageCarousel.length - 1 ? 0 : curr + 1;
    });
  };

  if (!data?.imageCarousel) return null;

  return (
    <div className="w-full bg-black">
      <div className="container flex items-center justify-center mx-auto">
        <div
          className={classNames(
            length === 2 && "md:grid-cols-2",
            length >= 3 && "md:grid-cols-3",
            "grid grid-cols-1 gap-10 py-10 mx-auto overflow-hidden"
          )}
        >
          {data?.imageCarousel?.slice(0, 3).map(async (item, index) => {
            const videoUrl = isVideoUrl(item.media.data?.[0]?.attributes?.url)
              ? getStrapiMedia(item.media.data?.[0]?.attributes?.url)
              : null;

            const origThumbFromVideo = await captureVideoFrame(videoUrl, 1);

            const embedVideoUrl =
              item.url && !isImageUrl(item.url) ? getEmbedUrl(item.url) : null;

            const src =
              getStrapiMedia(
                item.media.data?.[0]?.attributes.url ?? item.url
              ) ?? "";

            return (
              <div
                key={index}
                role="button"
                className="relative z-20 flex flex-col w-full h-auto cursor-pointer max-w-72"
                onClick={() => {
                  setFirstImageSelected(index);
                }}
              >
                {src && (
                  <img
                    src={
                      item.thumbnail.data?.attributes?.url ??
                      origThumbFromVideo ??
                      src
                    }
                    alt={`Carousel image ${index + 1}`}
                    className="object-cover w-auto h-full"
                  />
                )}
                {(videoUrl || embedVideoUrl) && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950 bg-opacity-20">
                    <PiPlayCircleThin className="text-white w-28 h-28" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <MediaModal
        data={data}
        handlePrev={prev}
        handleNext={next}
        firstImageSelected={firstImageSelected}
        handleModalClose={() => setFirstImageSelected(null)}
      />
    </div>
  );
}
