"use client";
import classNames from "classnames";
import { getStrapiMedia } from "../utils/api-helpers";
import ArrowIcon from "./icons/ArrowIcon";
import { use, useEffect, useRef } from "react";

interface ServicesHeadlineWithImageProps {
  data: {
    id: number;
    title: string;
    isParallax: boolean;
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
  };
}

export default function ServicesHeadlineWithImage({
  data,
}: ServicesHeadlineWithImageProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imgUrl = getStrapiMedia(data.media.data[0]?.attributes.url) ?? "";

  useEffect(() => {
    if (!data.isParallax || typeof window === "undefined") {
      return;
    }

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;

      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      }

      if (divRef.current) {
        divRef.current.style.backgroundPositionY = `-${scrollY * 0.02}px`;
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, [data.isParallax]);

  return (
    <div className="relative -z-10">
      <div
        ref={divRef}
        className={classNames(
          data.isParallax ? "md:bg-fixed" : "",
          "object-cover w-full  bg-gray-300 bg-cover bg-center md:aspect-[16/6] aspect-[1/1.3]"
        )}
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      >
        <div
          ref={contentRef}
          className="inset-0 w-full h-full grid-cols-2 md:grid md:absolute"
        >
          <div className="flex items-end w-full h-full col-span-1 col-end-3 start-1">
            <div className="bg-white max-w-[35rem]">
              <h3 className="p-10 font-normal text-black md:p-12">
                {data.title}
              </h3>
              <div className="items-center justify-center hidden w-full md:flex md:mt-14">
                <ArrowIcon className="w-8 h-8 fill-black " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
