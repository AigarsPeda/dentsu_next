"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import ArrowIcon from "src/app/[lang]/components/icons/ArrowIcon";
import { getStrapiMedia } from "src/app/[lang]/utils/api-helpers";
import { IMAGE_DATA_FOR_BLUR } from "./NewsPostSection";

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({
      x: (x / rect.width - 0.5) * 2, // Normalize to range [-1, 1]
      y: (y / rect.height - 0.5) * 2, // Normalize to range [-1, 1]
    });
  };

  useEffect(() => {
    if (!data.isParallax || typeof window === "undefined") {
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${scrollY * 0.7}px)`;
      }

      if (divRef.current) {
        divRef.current.style.backgroundPositionY = `-${scrollY * 0.04}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data.isParallax]);

  return (
    <div
      ref={divRef}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex items-center justify-center md:h-[92vh] h-[80vh]">
        <Image
          fill
          alt={
            data.media.data[0]?.attributes.alternativeText || "Service Image"
          }
          src={imgUrl}
          priority
          loader={loader}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            transform: isHovered
              ? `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`
              : "translate(0, 0)", // Adjust the multiplier for more or less parallax effect
            transition: "transform 0.1s ease-out",
            scale: 1.1,
          }}
          blurDataURL={IMAGE_DATA_FOR_BLUR}
          placeholder="blur"
        />
        <div
          ref={contentRef}
          className="absolute bottom-0 z-10 w-full h-full md:grid-cols-2 md:inset-0 md:grid"
        >
          <div className="flex items-end justify-center w-full h-full col-span-1 col-end-3 start-1">
            <div className="bg-white max-w-[35rem] pb-14">
              <h3 className="p-10 font-normal text-black md:p-14">
                {data.title}
              </h3>
              <button
                type="button"
                onClick={scrollToNextSection}
                className="flex items-center justify-center w-full md:flex md:mt-14 animate-bounce"
                aria-label="Scroll to next section"
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
