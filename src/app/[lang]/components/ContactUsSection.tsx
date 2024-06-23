import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import Image from "next/image";
import Envelope from "../../../../public/Envelope.svg";
import EnvelopeIcon from "./icons/Envelope";

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
    buttonTitle: string | null;
    description: string | null;
    isContactUsButton: boolean;
    contactEmail: string | null;
  };
}

export default function ContactUsSection({ data }: ContactUsSectionProps) {
  return (
    <div className="container pt-5 pb-2 mx-auto lg:pt-16">
      <div className="lg:pb-4">
        <h3 className="text-center">{data.title}</h3>
        <h4 className="px-10 text-center lg:mt-4">{data.description}</h4>
      </div>
      <div className="mx-auto grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:gap-10 md:grid-cols-[repeat(auto-fit,minmax(150px,0.44fr))] pt-10">
        {data.feature.map((item) => {
          const imgSrc = getStrapiMedia(item.media.data?.attributes.url);
          return (
            <div
              key={item.id}
              className="flex items-center justify-center pb-10"
            >
              <div className="flex flex-col items-center">
                {imgSrc && (
                  <img
                    src={imgSrc}
                    alt="our client logo"
                    className="object-contain w-full h-full max-w-[200px]"
                  />
                )}
                <div className="mt-3 text-center">
                  <h3 className="text-base">{item.name}</h3>
                  <p className="text-sm">{item.email}</p>
                  <p className="text-sm">{item.position}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {data.isContactUsButton && (
        <div className="flex justify-center">
          <a
            href={`mailto:${data.contactEmail}`}
            className="flex items-center justify-center gap-3 px-6 py-2 text-base text-white rounded bg-gray-950"
          >
            <EnvelopeIcon className="w-6 h-6" />
            {data.buttonTitle}
          </a>
        </div>
      )}
    </div>
  );
}
