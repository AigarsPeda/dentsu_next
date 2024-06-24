"use client";
import MyModal from "@/app/[lang]/components/MyModal";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { Carousel } from "flowbite-react";
import { Suspense, use, useEffect, useRef, useState } from "react";
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
  const [isWindow, setIsWindow] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside<HTMLDivElement>(dropdownRef, () => {
    handleModalClose();
  });

  useEffect(() => {
    // setIsWindow(true);
    if (typeof window !== "undefined") {
      setIsWindow(true);
    }
  }, []);

  if (!isWindow) return null;

  // if (window === undefined) return null;

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
            console.log("item", item);
            return (
              <div
                key={index}
                className="relative w-full h-full overflow-hidden text-center rounded-sm"
              >
                {isAvailableVideo && item.url ? (
                  // <ReactPlayer
                  //   url={`${item.url}&enablejsapi=1&origin=http://localhost:3000`}
                  //   width={"100%"}
                  //   height={"100%"}
                  // />
                  <Suspense
                    fallback={
                      <div className="w-full h-full text-white bg-slate-950">
                        Loading...
                      </div>
                    }
                  >
                    <ReactPlayer
                      url={`${item.url}&enablejsapi=1&origin=http://localhost:3000`}
                      width={"100%"}
                      height={"100%"}
                    />
                  </Suspense>
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
