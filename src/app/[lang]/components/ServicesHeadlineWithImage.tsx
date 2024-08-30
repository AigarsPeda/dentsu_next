"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { animateScroll as scroll } from "react-scroll";
import ArrowIcon from "src/app/[lang]/components/icons/ArrowIcon";
import { getStrapiMedia } from "src/app/[lang]/utils/api-helpers";

export const loader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

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

  const scrollToNextSection = () => {
    const element = divRef.current;
    const elementHeight = element?.clientHeight ?? 0;

    scroll.scrollMore(elementHeight, {
      duration: 500,
      smooth: true,
      offset: -100,
    });
  };

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
    <div ref={divRef} className="relative overflow-hidden">
      <div className="relative flex items-center justify-center md:h-[92vh] h-[80vh]">
        <Image
          fill
          alt=""
          src={imgUrl}
          priority
          loader={loader}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          blurDataURL="data:image/bmp;base64,Qk32BAAAAAAAADYAAAAoAAAACAAAAAgAAAABABgAAAAAAMAAAAATCwAAEwsAAAAAAAAAAAAAr5+jpJaUi4JxfHtehIdxioyAenZtUDcixbq4urGrpJ+Nm5uCpaiVra2inpiOeWdR29PO0cvCv72qu7ylx8m5z87EwLqvn4946OPc4t3S1tTB1tfD4uTX6Ofg2tTKva+Z7Obf6eTa5ePT6evb9Pbt9/fz6uXe0si16eDb6uPa7uvd9vfr/v/8/v7/8u/s4NnK4tfV597Y8u7j/f31////////9PPz6OPX39PR5dvW8+7l///4////////9fP16ubb"
          placeholder="blur"
        />
        <div
          ref={contentRef}
          className="absolute bottom-0 z-10 w-full h-full grid-cols-2 md:inset-0 md:grid"
        >
          <div className="flex items-end w-full h-full col-span-1 col-end-3 start-1">
            <div className="bg-white max-w-[35rem] pb-14">
              <h3 className="p-10 font-normal text-black md:p-14">
                {data.title}
              </h3>
              <button
                type="button"
                onClick={scrollToNextSection}
                className="items-center justify-center hidden w-full md:flex md:mt-14 animate-bounce"
              >
                <ArrowIcon className="w-12 h-12 fill-black " />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
