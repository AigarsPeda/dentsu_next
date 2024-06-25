import MyModal from "@/app/[lang]/components/MyModal";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { Transition } from "@headlessui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

export const isImageUrl = (url: string): boolean => {
  return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/.test(url);
};

interface MediaModalProps {
  handlePrev: () => void;
  handleNext: () => void;
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
  handlePrev,
  handleNext,
  handleModalClose,
  firstImageSelected,
}: MediaModalProps) {
  const [isWindowObject, setIsWindowObject] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState("right");
  useOnClickOutside<HTMLDivElement>(dropdownRef, () => {
    handleModalClose();
  });

  const getTransitionClasses = useCallback(() => {
    if (direction === "right") {
      return {
        enterTo: "transform translate-x-0",
        leaveFrom: "transform translate-x-0",
        leaveTo: "transform -translate-x-full",
        enterFrom: "transform translate-x-full",
        leave: "transition-transform duration-500",
        enter: "transition-transform duration-500",
      };
    } else {
      return {
        enterTo: "transform translate-x-0",
        leaveFrom: "transform translate-x-0",
        leaveTo: "transform translate-x-full",
        enterFrom: "transform -translate-x-full",
        leave: "transition-transform duration-500",
        enter: "transition-transform duration-500",
      };
    }
  }, [direction]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsWindowObject(true);
    }
  }, []);

  if (!isWindowObject) {
    return null;
  }

  const transitionClasses = getTransitionClasses();

  const getEmbedUrl = (videoUrl: string): string => {
    const youtubeRegex =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|watch\?v%3D)([\w-]{11}).*/;
    const youtubeMatch = videoUrl.match(youtubeRegex);

    if (youtubeMatch && youtubeMatch[2].length === 11) {
      return `https://www.youtube.com/embed/${youtubeMatch[2]}`;
    }

    const vimeoRegex = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
    const vimeoMatch = videoUrl.match(vimeoRegex);

    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    return videoUrl;
  };

  return (
    <MyModal isOpen={firstImageSelected !== null} closeModal={handleModalClose}>
      <div
        ref={dropdownRef}
        className="md:p-10 p-1 w-full max-w-6xl md:h-[54rem] h-[26rem] flex items-start justify-center relative"
      >
        <button
          className="absolute z-20 text-white top-4 right-4"
          onClick={handleModalClose}
        >
          <IoCloseSharp className="w-7 h-7" />
        </button>

        <div className="relative w-full h-full overflow-hidden text-center rounded-sm">
          {data.imageCarousel.map((item, index) => {
            const isAvailableVideo = item.url && !isImageUrl(item.url);

            return (
              <Transition
                key={index}
                enter={transitionClasses.enter}
                leave={transitionClasses.leave}
                show={firstImageSelected === index}
                enterTo={transitionClasses.enterTo}
                leaveTo={transitionClasses.leaveTo}
                enterFrom={transitionClasses.enterFrom}
                leaveFrom={transitionClasses.leaveFrom}
              >
                {isAvailableVideo && item.url ? (
                  <iframe
                    src={getEmbedUrl(item.url)}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    width={640}
                    height={360}
                    className="absolute w-full h-full"
                  ></iframe>
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
              </Transition>
            );
          })}
          <div className="absolute z-50 flex items-center justify-between w-full h-full">
            <button
              className="m-4 rounded-full"
              onClick={() => {
                setDirection("left");
                handlePrev();
              }}
            >
              <IoIosArrowBack className="w-10 h-10" />
            </button>
            <button
              className="m-4 rounded-full"
              onClick={() => {
                setDirection("right");
                handleNext();
              }}
            >
              <IoIosArrowForward className="w-10 h-10" />
            </button>
          </div>
        </div>
      </div>
    </MyModal>
  );
}
