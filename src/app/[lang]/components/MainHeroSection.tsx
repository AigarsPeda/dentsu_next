"use client";
import ArrowIcon from "@/app/[lang]/components/icons/ArrowIcon";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import isVideoUrl from "@/app/[lang]/utils/isVideoUrl";
import { use, useEffect, useRef, useState, type FC } from "react";
import { animateScroll as scroll } from "react-scroll";
import captureVideoFrame from "../utils/captureVideoFrame";

// const DynamicImage = dynamic(() => import("next/image"), { ssr: false });

type PictureType = {
  id: string;
  attributes: {
    url: string;
    width: number;
    height: number;
    caption: string | null;
    alternativeText: string | null;
  };
};

interface MainHeroSectionProps {
  data: {
    title: string;
    url: string | null;
    picture: {
      data: PictureType[];
    };
    poster: {
      data: PictureType;
    };
    video: {
      data: PictureType;
    };
  };
}

export default function MainHeroSection({ data }: MainHeroSectionProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const videoUrl = getStrapiMedia(data.video.data?.attributes.url);
  const posterUrl = getStrapiMedia(data.poster.data.attributes?.url);
  const imgUrl = getStrapiMedia(data.picture.data?.[0]?.attributes.url);
  const [origThumbFromVideo, setOrigThumbFromVideo] = useState<string | null>(
    null
  );

  const getVideoType = (url: string | null): string => {
    if (!url) return "";

    if (url.includes(".mp4")) {
      return "video/mp4";
    }

    if (url.includes(".mpeg")) {
      return "video/mpeg";
    }

    if (url.includes(".quicktime")) {
      return "video/quicktime";
    }

    if (url.includes(".wmv")) {
      return "video/wmv";
    }

    if (url.includes(".avi")) {
      return "video/avi";
    }

    if (url.includes(".flv")) {
      return "video/flv";
    }

    // mov
    if (url.includes(".mov")) {
      return "";
    }

    return /\.(mp4)$/.test(url) ? "video/mp4" : "";
  };

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
    captureVideoFrame(videoUrl, 0).then((thumb) => {
      setOrigThumbFromVideo(thumb);
    });
  }, [videoUrl]);

  if (isVideoUrl(videoUrl) && videoUrl) {
    return (
      <div
        ref={divRef}
        className="relative flex items-center justify-center md:h-[92vh] h-[80vh]"
      >
        <video
          loop
          muted
          autoPlay
          playsInline
          id="background-video"
          poster={posterUrl ?? origThumbFromVideo ?? ""}
          className="absolute inset-0 z-0 hidden object-cover w-full h-full md:block"
        >
          <source src={videoUrl} type={getVideoType(videoUrl)} />
        </video>
        <img
          alt="poster"
          src={imgUrl ?? posterUrl ?? ""}
          className="block object-cover w-full h-full md:hidden"
        />
        <MainHeadLine title={data.title} />
        <button
          type="button"
          onClick={scrollToNextSection}
          className="absolute transform bottom-14 z-[35] animate-bounce"
        >
          <ArrowIcon className="w-12 h-12 fill-gray-50" />
        </button>
      </div>
    );
  }

  return (
    <section
      ref={divRef}
      className="relative flex items-center justify-center w-full aspect-[1/1.5] md:aspect-[16/9] bg-cover bg-center"
      style={{ backgroundImage: `url(${imgUrl ?? posterUrl ?? ""})` }}
    >
      <MainHeadLine title={data.title} />
      <button
        type="button"
        onClick={scrollToNextSection}
        className="absolute transform bottom-14 animate-bounce"
      >
        <ArrowIcon className="w-12 h-12 fill-gray-50" />
      </button>
    </section>
  );
}

interface MainHeadLineProps {
  title: string;
}

const MainHeadLine: FC<MainHeadLineProps> = ({ title }) => {
  // brake text in 3 lines get array of strings and break it in 3 lines
  const brakeText = (text: string): string[] => {
    const words = text.split(" ");
    const lines = [];

    const wordsPerLine = Math.ceil(words.length / 3);

    for (let i = 0; i < words.length; i += wordsPerLine) {
      lines.push(words.slice(i, i + wordsPerLine).join(" "));
    }

    return lines;
  };

  return (
    <div className="w-full flex md:max-w-[67rem] absolute z-10 transform py-6 md:pl-10 lg:pl-0 left-2 h-full flex-col justify-center">
      <h1 className="text-white lg:text-[8vw] leading-[60px] md:text-6xl md:leading-tight font-bold">
        {/* <span className="hidden md:block">{title}</span> */}
        <span className="md:hidden">
          {brakeText(title).map((line, index) => (
            <span key={index} className="block">
              {line} <br />
            </span>
          ))}
        </span>
      </h1>
    </div>
  );
};
