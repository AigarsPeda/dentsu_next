import ArrowIcon from "@/app/[lang]/components/icons/ArrowIcon";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";

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
  const imgUrl = getStrapiMedia(data.picture.data[0]?.attributes.url);
  const posterUrl = getStrapiMedia(data.poster.data.attributes.url);

  // is video url if contains mp4 or ather video format
  const isVideoUrl = (url: string | null): boolean => {
    if (!url) return false;

    if (url.includes(".mp4")) {
      return true;
    }

    if (url.includes(".mpeg")) {
      return true;
    }

    if (url.includes(".quicktime")) {
      return true;
    }

    if (url.includes(".wmv")) {
      return true;
    }

    if (url.includes(".avi")) {
      return true;
    }

    if (url.includes(".flv")) {
      return true;
    }

    if (url.includes(".mov")) {
      return true;
    }

    return false;
  };

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

  if (isVideoUrl(imgUrl)) {
    console.log("is video url");
    return (
      <div className="relative flex items-center justify-center">
        <video
          loop
          muted
          autoPlay
          id="background-video"
          poster={posterUrl ?? ""}
          className="relative object-cover w-full md:h-[92vh] h-[80vh]"
        >
          <source
            src={imgUrl ?? ""}
            // type={getVideoType(imgUrl)}
          />
        </video>
        <div className="container absolute transform -translate-x-1/2 md:-translate-y-1/2 md:top-1/2 left-1/2 bottom-[20%]">
          <h1 className="p-0 font-medium text-white md:text-center">
            {data.title}
          </h1>
        </div>
        <div className="absolute hidden transform bottom-10 animate-bounce md:block">
          <ArrowIcon className="w-12 h-12 fill-gray-50" />
        </div>
      </div>
    );
  }

  return (
    <section
      className="relative flex items-center justify-center w-full md:h-[92vh] h-[80vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      {/* <div className="absolute inset-0 bg-black opacity-50" /> */}
      <div className="container absolute transform -translate-x-1/2 md:-translate-y-1/2 md:top-1/2 left-1/2 bottom-[20%]">
        <h1 className="p-0 font-medium text-white md:text-center">
          {data.title}
        </h1>
      </div>
      <div className="absolute hidden transform bottom-10 animate-bounce md:block">
        <ArrowIcon className="w-12 h-12 fill-gray-50" />
      </div>
    </section>
  );
}
