import { getStrapiMedia } from "../utils/api-helpers";

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
  // console.log("ClientSections >>>>>>>>>>", data);
  return (
    <div className="container px-10 py-20 pb-20 mx-auto lg:px-60">
      <h2 className="pb-16 text-4xl font-normal text-center">{data.title}</h2>
      {/* loop over feature 6 cliens if fits */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {data.feature.map((item: FeaturesType) => {
          const imgSrc = getStrapiMedia(item.media.data.attributes.url);
          return (
            <div key={item.id} className="flex items-center justify-center">
              {imgSrc && <img alt={""} src={imgSrc} className="w-20 h-20" />}
            </div>
          );
        })}
        {/* {data.feature.map((item: FeaturesType) => (
          <div key={item.id} className="flex items-center justify-center">
            <img
              src={item.media.attributes.url}
              alt={item.media.attributes.alternativeText || ""}
              className="w-20 h-20"
            />
          </div>
        ))} */}
      </div>
    </div>
  );
}
