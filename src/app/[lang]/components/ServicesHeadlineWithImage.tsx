"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
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
          className="absolute bottom-0 w-full h-full grid-cols-2 md:inset-0 md:grid"
        >
          <div className="flex items-end w-full h-full col-span-1 col-end-3 start-1">
            <div className="bg-white max-w-[35rem] pb-5">
              <h3 className="p-10 font-normal text-black md:p-14">
                {data.title}
              </h3>
              <div className="items-center justify-center hidden w-full md:flex md:mt-14">
                <ArrowIcon className="w-8 h-8 fill-black " />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        ref={divRef}
        className={classNames(
          data.isParallax ? "md:bg-fixed" : "",
          "object-cover w-full  bg-gray-300 bg-cover bg-center md:aspect-[16/6] aspect-[1/1.2]"
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
      </div> */}
    </div>
  );
}
