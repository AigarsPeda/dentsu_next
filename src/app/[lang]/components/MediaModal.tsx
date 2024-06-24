"use client";
import MyModal from "@/app/[lang]/components/MyModal";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { Carousel } from "flowbite-react";
import { useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";
import ReactPlayer from "react-player";

export const isImageUrl = (url: string): boolean => {
  return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/.test(url);
};

interface MediaModalProps {
  handleModalClose: () => void;
  firstImageSelected: number | null;
  data: {
    id: number;
    imageCarousel: {
      id: number;
      url: null | string;
      media: {
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
    }[];
  };
}

export default function MediaModal({
  data,
  handleModalClose,
  firstImageSelected,
}: MediaModalProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside<HTMLDivElement>(dropdownRef, () => {
    handleModalClose();
  });

  const getEmbedUrl = (videoUrl: string): string => {
    const youtubeRegex =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|watch\?v%3D)([\w-]{11}).*/;
    const youtubeMatch = videoUrl.match(youtubeRegex);

    if (youtubeMatch && youtubeMatch[2].length === 11) {
      return `https://www.youtube.com/embed/${youtubeMatch[2]}`;
    }

    // Add support for other video platforms here

    // return null;
    return videoUrl;
  };

  return (
    <MyModal isOpen={firstImageSelected !== null} closeModal={handleModalClose}>
      <div
        ref={dropdownRef}
        className="p-10 w-full max-w-6xl md:h-[54rem] h-[24rem] flex items-start justify-center relative"
      >
        <button
          className="absolute text-white top-2 right-2"
          onClick={handleModalClose}
        >
          <IoCloseSharp className="w-7 h-7" />
        </button>
        <Carousel slide={false}>
          {data.imageCarousel.map((item, index) => {
            const isAvailableVideo = item.url && !isImageUrl(item.url);
            return (
              <div
                key={index}
                className="relative w-full h-full overflow-hidden text-center rounded-sm"
              >
                {isAvailableVideo && item.url ? (
                  <ReactPlayer
                    pip={true}
                    light={true}
                    url={getEmbedUrl(item.url)}
                    width={"100%"}
                    height={"100%"}
                  />
                ) : (
                  <img
                    alt={`Carousel image ${index + 1}`}
                    className="absolute object-cover w-full h-full"
                    src={
                      getStrapiMedia(item.media.data?.[0]?.attributes?.url) ??
                      ""
                    }
                  />
                )}
              </div>
            );
          })}
        </Carousel>
      </div>
    </MyModal>
  );
}
