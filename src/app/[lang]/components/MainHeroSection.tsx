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
      <div className="container pb-20">
        <h1 className="p-0 font-medium text-center text-white">{data.title}</h1>
        {data.description && (
          <p className="max-w-2xl mx-auto text-center pl-2.5 mt-4 text-3xl font-normal text-white lg:text-2xl">
            {data.description}
          </p>
        )}
      </div>
      <div className="absolute transform bottom-10 animate-bounce">
        <ArrowIcon className="w-14 h-14" />
      </div>
    </section>
  );
}
