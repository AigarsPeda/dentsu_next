"use client";

import MediaModal, { isImageUrl } from "@/app/[lang]/components/MediaModal";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { useMemo, useState } from "react";
import { PiPlayCircleThin } from "react-icons/pi";

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

export default function MediaCarousel({ data }: CarouselProps) {
  const [firstImageSelected, setFirstImageSelected] = useState<number | null>(
    null
  );

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

  // const widArray = [
  //   "https://www.youtube.com/embed/qVBuJfVUxxQ?si=bV8yOtCAZnNvQvVQ",
  //   "https://www.youtube.com/embed/GRqNudYADvA?si=vMCJiVCTGvxDV3r-",
  //   "https://www.youtube.com/embed/MMhJuotvR80?si=tSOjhtXJp9z3MVYB",
  // ];

  // const createLinks = useMemo(() => {
  //   return data.imageCarousel?.map((image, index) => {
  //     const isAvailableVideo = image.url && !isImageUrl(image.url);

  //     if (isAvailableVideo) return image.url;

  //     const src =
  //       getStrapiMedia(image.media.data?.[0]?.attributes?.url) ??
  //       image.url ??
  //       "";

  //     // const src =
  //     //   getStrapiMedia(image.media.data?.[0]?.attributes?.url) ??
  //     //   image.url ??
  //     //   "";

  //     if (src === "") return null;

  //     return src;
  //   });
  // }, [data.imageCarousel]);

  // console.log("createLinks", createLinks);

  const { videoLinks, imageLinks } = useMemo(() => {
    const videoLinks: string[] = [];
    const imageLinks: string[] = [];

    data.imageCarousel?.forEach((image, index) => {
      const isAvailableVideo = image.url && !isImageUrl(image.url);

      if (isAvailableVideo && image.url) {
        videoLinks.push(image.url);
      } else {
        const src =
          getStrapiMedia(image.media.data?.[0]?.attributes?.url) ??
          image.url ??
          "";

        if (src === "") return null;

        imageLinks.push(src);
      }
    });

    return { videoLinks, imageLinks };
  }, [data.imageCarousel]);

  console.log("videoLinks", videoLinks);
  console.log("imageLinks", imageLinks);

  return (
    <div className="bg-gray-950">
      <div className="container grid grid-cols-1 gap-10 py-10 mx-auto overflow-hidden md:grid-cols-3">
        {data.imageCarousel?.slice(0, 3).map((image, index) => {
          const src =
            getStrapiMedia(image.media.data?.[0]?.attributes?.url) ??
            image.url ??
            "";

          const isAvailableVideo = image.url && !isImageUrl(image.url);

          if (src === "") return null;

          return (
            <div
              key={index}
              role="button"
              className="relative z-20 flex flex-col w-full h-full max-h-72"
              onClick={() => {
                setFirstImageSelected(index);
              }}
            >
              <img
                src={src}
                className="w-auto h-full"
                alt={`Carousel image ${index + 1}`}
              />
              {isAvailableVideo && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950 bg-opacity-20">
                  <PiPlayCircleThin className="text-white w-28 h-28" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {videoLinks.map((wid, index) => {
        return (
          <div
            key={index}
            role="button"
            className="relative z-20 flex flex-col w-full h-full max-h-72"
            onClick={() => {
              setFirstImageSelected(index);
            }}
          >
            <iframe
              src={wid}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              width={640}
              height={360}
              className="w-full h-full"
            ></iframe>
          </div>
        );
      })}

      <iframe
        src="https://www.youtube.com/embed/22tVWwmTie8?si=t4SLeM967SRpzkJc"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        width={640}
        height={360}
        className="w-full h-full"
      ></iframe>

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
