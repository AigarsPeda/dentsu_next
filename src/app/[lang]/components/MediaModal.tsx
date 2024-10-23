"use client";
import MyModal from "@/app/[lang]/components/MyModal";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import getEmbedUrl from "@/app/[lang]/utils/getEmbedUrl";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { Transition } from "@headlessui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

export const isImageUrl = (url: string): boolean => {
  return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/.test(url?.toLocaleUpperCase());
};

export const isVideoUrl = (url: string): boolean => {
  return /\.(mp4|webm|ogg|mov|flv|avi|wmv|3gp|mkv)$/.test(url?.toLowerCase());
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
      thumbnail: {
        data: {
          id: number;
          attributes: {
            url: string;
            width: number;
            height: number;
            caption: null | string;
            alternativeText: null | string;
          };
        };
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
          {data?.imageCarousel?.map((item, index) => {
            const videoUrl = isVideoUrl(item.media.data?.[0]?.attributes?.url)
              ? getStrapiMedia(item.media.data?.[0]?.attributes?.url)
              : null;

            const embedVideoUrl =
              item.url && !isImageUrl(item.url) ? getEmbedUrl(item.url) : null;

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
                {videoUrl || embedVideoUrl ? (
                  <iframe
                    width={640}
                    height={360}
                    allowFullScreen
                    title="YouTube video player"
                    className="absolute w-full h-full"
                    src={videoUrl ?? embedVideoUrl ?? ""}
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
          <div className="absolute z-50 flex items-center justify-between top-[50%] -left-5">
            <button
              className="m-4 rounded-full"
              onClick={() => {
                setDirection("left");
                handlePrev();
              }}
            >
              <IoIosArrowBack className="w-10 h-10" />
            </button>
          </div>
          <div className="absolute z-50 flex items-center justify-between top-[50%] -right-5">
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
