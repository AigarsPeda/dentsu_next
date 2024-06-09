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
    description: string | null;
  };
}

export default function MainHeroSection({ data }: MainHeroSectionProps) {
  const imgUrl = getStrapiMedia(data.picture.data[0]?.attributes.url);

  return (
    <section
      className="relative flex items-center justify-center w-full h-[92vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      {/* <div className="absolute inset-0 bg-black opacity-50" /> */}
      <div className="container px-10 py-20 pb-20 mx-auto lg:px-24">
        <h1 className="font-medium text-white text-8xl lg:text-9xl">
          {data.title}
        </h1>
        {data.description && (
          <p className="max-w-2xl mt-4 text-3xl font-normal text-white lg:text-2xl">
            {data.description}
          </p>
        )}
      </div>
      <div className="absolute transform bottom-10 animate-bounce">
        <ArrowIcon />
      </div>
    </section>
  );
}
