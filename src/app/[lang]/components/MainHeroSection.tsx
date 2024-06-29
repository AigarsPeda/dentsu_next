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

type PictureDataType = {
  data: PictureType[];
};

interface MainHeroSectionProps {
  data: {
    title: string;
    picture: PictureDataType;
  };
}

export default function MainHeroSection({ data }: MainHeroSectionProps) {
  const imgUrl = getStrapiMedia(data.picture.data[0]?.attributes.url);

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
