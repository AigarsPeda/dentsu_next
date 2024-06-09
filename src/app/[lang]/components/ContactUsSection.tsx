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
    <div className="container pt-5 pb-2 mx-auto lg:pt-24">
      <h2 className="text-center lg:pb-0 pb-0 text-[2.2rem] lg:text-8xl">
        {data.title}
      </h2>
      <p className="px-10 text-center lg:mt-4 lg:text-2xl">
        {data.description}
      </p>
      <div className="mx-auto grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:gap-10 md:grid-cols-[repeat(auto-fit,minmax(150px,0.34fr))] pt-10">
        {data.feature.map((item) => {
          const imgSrc = getStrapiMedia(item.media.data?.attributes.url);
          return (
            <div
              key={item.id}
              className="flex items-center justify-center pb-10"
            >
              <div className="flex flex-col items-center">
                {imgSrc && (
                  <Image
                    width={600}
                    height={600}
                    src={imgSrc}
                    alt="our client logo"
                    className="object-contain w-full h-full max-w-[200px]"
                    style={{
                      width: "100%",
                    }}
                  />
                )}
                <div className="mt-3 text-center">
                  <h3 className="text-xl lg:text-2xl">{item.name}</h3>
                  <p className="text-sm lg:text-base">{item.email}</p>
                  <p className="text-sm lg:text-base">{item.position}</p>
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
            className="flex items-center justify-center gap-3 py-4 text-xl text-white rounded px-14 bg-gray-950"
          >
            <EnvelopeIcon className="w-6 h-6" />
            {data.buttonTitle}
          </a>
        </div>
      )}
    </div>
  );
}
