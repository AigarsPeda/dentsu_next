"use client";
import MyModal from "@/app/[lang]/components/MyModal";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { Carousel } from "flowbite-react";
import { useCallback, useRef, useState } from "react";
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside<HTMLDivElement>(dropdownRef, () => {
    handleModalClose();
  });

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
        <Carousel>
          {data.imageCarousel.map((item, index) => {
            const isAvailableVideo = item.url && !isImageUrl(item.url);
            console.log("item", item);
            return (
              <div
                key={index}
                className="relative w-full h-full overflow-hidden text-center rounded-sm"
              >
                {isAvailableVideo && item.url ? (
                  <embed
                    src={`${item.url}rel=0&enablejsapi=1`}
                    title="YouTube video player"
                    // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    // referrerPolicy="strict-origin-when-cross-origin"
                    // allowFullScreen
                    className="w-full h-full"
                    // loading="eager"
                  ></embed>
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
