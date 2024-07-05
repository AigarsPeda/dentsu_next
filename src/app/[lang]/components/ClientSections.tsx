import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import Link from "next/link";

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
  isNewTab: boolean;
  url: string | null;
  media: {
    data: MediaTypes;
  };
}

interface ClientSectionsProps {
  data: { title: string; feature: FeaturesType[] };
}

export default function ClientSections({ data }: ClientSectionsProps) {
  console.log(data);
  return (
    <div className="bg-[#e5e5e9]">
      <div className="container px-5 mx-auto lg:pb-20 py-9 lg:px-12">
        <h2 className="pb-8 text-xl font-normal text-center lg:pb-14 lg:text-4xl">
          {data.title}
        </h2>
        <div className="pb-3 overflow-x-auto md:overflow-auto">
          <ul className="grid grid-cols-6 gap-4 lg:gap-8 min-w-[1080px] md:min-w-full">
            {data.feature.map((item) => {
              console.log(item);
              const imgSrc = getStrapiMedia(item.media.data.attributes.url);
              return (
                <li key={item.id} className="flex items-center justify-center">
                  <Link
                    href={item.url ?? "/"}
                    target={item.newTab ? "_self" : "_blank"}
                  >
                    {imgSrc && (
                      <img
                        src={imgSrc}
                        alt="our client logo"
                        className="object-contain w-full h-full md:max-h-[100px] max-h-[60px]"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
