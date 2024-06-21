import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";

interface MediaTypes {
  id: number;
  attributes: {
    url: string;
    width: number;
    height: number;
    caption: string | null;
    alternativeText: string | null;
  };
}

interface FeaturesType {
  id: number;
  newTab: boolean;
  media: {
    data: MediaTypes;
  };
  url: string | null;
}

interface ClientSectionsProps {
  data: { title: string; feature: FeaturesType[] };
}

export default function ClientSections({ data }: ClientSectionsProps) {
  return (
    <div className="bg-[#e5e5e9]">
      <div className="container px-5 mx-auto lg:pb-20 py-9 lg:px-12">
        <h2 className="pb-8 text-xl font-normal text-center lg:pb-14 lg:text-4xl">
          {data.title}
        </h2>
        <div className="pb-3 overflow-x-auto md:overflow-auto">
          <div className="grid grid-cols-6 gap-4 lg:gap-8 min-w-[1080px] md:min-w-full">
            {data.feature.map((item) => {
              const imgSrc = getStrapiMedia(item.media.data.attributes.url);
              return (
                <div key={item.id} className="flex items-center justify-center">
                  {imgSrc && (
                    <img
                      src={imgSrc}
                      alt="our client logo"
                      className="object-contain w-full h-full md:max-h-[100px] max-h-[60px]"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
