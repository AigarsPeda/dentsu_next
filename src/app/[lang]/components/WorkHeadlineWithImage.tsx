import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";

interface ImageType {
  id: 61;
  attributes: {
    url: string;
    width: number;
    height: number;
    caption: string | null;
    alternativeText: string | null;
  };
}

interface WorkHeadlineWithImageProps {
  data: {
    id: number;
    headline: string;
    description: string;
    picture: { data: ImageType[] };
  };
}

export default function WorkHeadlineWithImage({
  data,
}: WorkHeadlineWithImageProps) {
  const imgUrl = getStrapiMedia(data.picture.data[0]?.attributes.url);

  return (
    <section
      className="relative flex items-center justify-center w-full h-[80vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      <div className="container absolute bottom-12 md:bottom-40 md:right-0 right-5 bg-black md:w-[50%] w-[90%] p-10">
        <div>
          <h3 className="max-w-sm pb-6 font-medium text-white">
            {data.headline}
          </h3>
          <p className="max-w-md overflow-hidden text-xl font-bold text-white max-h-44 custom-clamp-5">
            {data.description}
          </p>
        </div>
      </div>
    </section>
  );
}
