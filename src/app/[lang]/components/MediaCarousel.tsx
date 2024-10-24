"use client";

import MediaModal, {
  isImageUrl,
  isVideoUrl,
} from "@/app/[lang]/components/MediaModal";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { useMemo, useState, useEffect } from "react";
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
  const [videoThumbnails, setVideoThumbnails] = useState<(string | null)[]>([]); // Store video thumbnails

  const length = useMemo(() => data.imageCarousel.length, [data]);

  useEffect(() => {
    // Only run in the browser
    if (typeof window === "undefined") return;

    const fetchVideoThumbnails = async () => {
      const thumbnails = await Promise.all(
        data.imageCarousel.map(async (item) => {
          const videoUrl = isVideoUrl(item.media.data?.[0]?.attributes?.url)
            ? getStrapiMedia(item.media.data?.[0]?.attributes?.url)
            : null;

          if (videoUrl) {
            try {
              const thumb = await captureVideoFrame(videoUrl, 1); // Capture frame at 1s
              return thumb;
            } catch (err) {
              console.error("Error capturing video frame:", err);
              return null;
            }
          }
          return null;
        })
      );
      setVideoThumbnails(thumbnails);
    };

    fetchVideoThumbnails();
  }, [data]);

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

  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDevice("mobile");
      } else {
        setDevice("desktop");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full bg-black">
      <div className="container w-full mx-auto">
        <div
          className={classNames(
            "py-10 mx-auto overflow-hidden flex items-center justify-center space-x-4"
          )}
        >
          {data?.imageCarousel
            ?.slice(0, device === "desktop" ? 3 : 1)
            .map((item, index) => {
              const videoUrl = isVideoUrl(item.media.data?.[0]?.attributes?.url)
                ? getStrapiMedia(item.media.data?.[0]?.attributes?.url)
                : null;

              const embedVideoUrl =
                item.url && !isImageUrl(item.url)
                  ? getEmbedUrl(item.url)
                  : null;

              const src =
                getStrapiMedia(
                  item.media.data?.[0]?.attributes?.url ?? item.url
                ) ?? "";

              const videoThumbnail = videoThumbnails[index]; // Use the captured video thumbnail

              return (
                <div
                  key={index}
                  role="button"
                  className="relative z-20 flex flex-col w-full h-80 cursor-pointer max-w-72"
                  onClick={() => {
                    setFirstImageSelected(index);
                  }}
                >
                  {videoThumbnail ? (
                    <img
                      src={videoThumbnail}
                      alt={`Video thumbnail ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <img
                      src={item?.thumbnail?.data?.attributes?.url ?? src}
                      alt={`Carousel image ${index + 1}`}
                      className="object-cover w-full h-full"
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
