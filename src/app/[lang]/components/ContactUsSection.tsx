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
    <div className="container pt-24 pb-2 mx-auto">
      <h2 className="text-6xl text-center">{data.title}</h2>
      <p className="mt-4 text-2xl text-center">{data.description}</p>
      <div className="grid grid-cols-2 gap-8 py-12 mx-auto md:grid-cols-4">
        {data.feature.map((item) => {
          const imgSrc = getStrapiMedia(item.media.data?.attributes.url);
          return (
            <div key={item.id} className="flex items-center justify-center">
              <div>
                {imgSrc ? (
                  <Image
                    width={600}
                    height={600}
                    src={imgSrc}
                    alt="our client logo"
                    className="object-contain max-h-[430px] min-h-[330px]"
                    style={{
                      width: "100%",
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center w-24 h-24 bg-gray-200">
                    No Image Available
                  </div>
                )}
                <div className="mt-3 text-center">
                  <h3 className="text-2xl">{item.name}</h3>
                  <p>{item.email}</p>
                  <p>{item.position}</p>
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
