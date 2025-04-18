"use client";
import EnvelopeIcon from "@/app/[lang]/components/icons/Envelope";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { usePathname } from "next/navigation";

interface MediaType {
  data: {
    id: number;
    attributes: {
      url: string;
      width: number;
      height: number;
      caption: string | null;
      alternativeText: string | null;
    };
  };
}

interface FeaturesType {
  id: number;
  media: MediaType;
  name: string | null;
  email: string | null;
  position: string | null;
}

interface ContactUsSectionProps {
  data: {
    title: string | null;
    feature: FeaturesType[];
    redirectUrl: string | null;
    buttonTitle: string | null;
    description: string | null;
    isContactUsButton: boolean;
    contactEmail: string | null;
  };
}

export default function ContactUsSection({ data }: ContactUsSectionProps) {
  const path = usePathname();
  const urlLocale = path?.split("/")[1] || "en";

  return (
    <div className="container mx-auto py-14">
      <div className="pb-10">
        <a href={`/${urlLocale}${data.redirectUrl}`}>
          <h3 className="text-center">{data.title}</h3>
        </a>
        <h4 className="px-10 mt-3 text-center lg:mt-4">{data.description}</h4>
      </div>
      <div className="mx-auto grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:gap-10 md:grid-cols-[repeat(auto-fit,minmax(150px,0.44fr))]">
        {data.feature.map((item) => {
          const imgSrc = getStrapiMedia(item.media.data?.attributes?.url);
          return (
            <div
              key={item.id}
              className="flex items-center justify-center pb-10"
            >
              <div className="flex flex-col items-center">
                {imgSrc ? (
                  <div className="w-[200px] h-[200px]">
                    <img
                      src={imgSrc}
                      alt="our client logo"
                      className="object-cover w-full h-full overflow-hidden rounded-full"
                    />
                  </div>
                ) : (
                  <div className="object-contain w-full h-full max-w-[200px] rounded-full overflow-hidden" />
                )}
                <div className="h-10 mt-3 text-center">
                  {item.name && <h3 className="text-base">{item.name}</h3>}
                  {item.email && <p className="text-sm">{item.email}</p>}
                  {item.position && <p className="text-sm">{item.position}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {data.isContactUsButton && (
        <div className="flex justify-center">
          <a
            // href={data.redirectUrl ?? `mailto:${data.contactEmail}` ?? ""}
            href={
              data.redirectUrl
                ? `/${urlLocale}${data.redirectUrl}`
                : `mailto:${data.contactEmail}`
            }
            className="flex items-center justify-center gap-3 px-6 py-2 text-base text-white transition-all bg-black hover:bg-dentsu-hover"
          >
            <EnvelopeIcon className="w-6 h-6" />
            {data.buttonTitle}
          </a>
        </div>
      )}
    </div>
  );
}
