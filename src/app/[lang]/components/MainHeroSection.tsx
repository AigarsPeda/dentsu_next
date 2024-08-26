import ArrowIcon from "@/app/[lang]/components/icons/ArrowIcon";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import isVideoUrl from "@/app/[lang]/utils/isVideoUrl";
import { FC } from "react";

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
  };
}

export default function MainHeroSection({ data }: MainHeroSectionProps) {
  const imgUrl = getStrapiMedia(data.picture.data?.[0]?.attributes.url);
  const posterUrl = getStrapiMedia(data.poster.data.attributes?.url);

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

  if (isVideoUrl(imgUrl) && imgUrl) {
    return (
      <div className="relative flex items-center justify-center aspect-[1/1.6] md:aspect-[16/9]">
        <video
          loop
          muted
          autoPlay
          playsInline
          id="background-video"
          poster={posterUrl ?? ""}
          className="absolute inset-0 z-0 hidden object-cover w-full h-full md:block"
        >
          <source src={imgUrl} type={getVideoType(imgUrl)} />
        </video>
        <img
          alt="poster"
          src={posterUrl ?? ""}
          className="block object-cover w-full h-full md:hidden"
        />
        <MainHeadLine title={data.title} />
        <div className="absolute hidden transform bottom-10 animate-bounce md:block">
          <ArrowIcon className="w-12 h-12 fill-gray-50" />
        </div>
      </div>
    );
  }

  return (
    <section
      className="relative flex items-center justify-center w-full aspect-[1/1.6] md:aspect-[16/9] bg-cover bg-center"
      style={{ backgroundImage: `url(${imgUrl ?? posterUrl ?? ""})` }}
    >
      <MainHeadLine title={data.title} />
      <div className="absolute hidden transform bottom-10 animate-bounce md:block">
        <ArrowIcon className="w-12 h-12 fill-gray-50" />
      </div>
    </section>
  );
}

interface MainHeadLineProps {
  title: string;
}

const MainHeadLine: FC<MainHeadLineProps> = ({ title }) => {
  return (
    <div className="w-full flex md:max-w-[67rem] absolute z-10 transform py-6 md:pl-10 lg:pl-0 left-2 h-full flex-col justify-center">
      <h1 className="text-white lg:text-[8vw] leading-[60px] md:text-6xl md:leading-tight font-bold">
        {title}
      </h1>
    </div>
  );
};
