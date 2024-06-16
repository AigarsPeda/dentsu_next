"use client";
import ServiceDisclosure from "@/app/[lang]/components/Disclosure";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import Image from "next/image";
import { use, useEffect, useState } from "react";

interface ServicesProps {
  data: {
    id: number;
    pictureOnRight: boolean;
    media: {
      data: {
        id: number;
        attributes: {
          url: string;
          width: number;
          height: number;
          caption: string | null;
          alternativeText: string | null;
        };
      }[];
    };
    services: {
      id: number;
      title: string;
      description: string;
    }[];
    logo: {
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
    };
    mobLogo: {
      data: {
        id: number;
        attributes: {
          url: string;
          width: number;
          height: number;
          caption: string | null;
          alternativeText: string | null;
        };
      } | null;
    };
    fontColor: { id: number; fontColor: "light" | "dark" } | null;
  };
}

export default function Services({ data }: ServicesProps) {
  console.log("data", data);
  const [isMobile, setIsMobile] = useState(false);
  const logoUrl = getStrapiMedia(data.logo.data.attributes.url) ?? "";
  const imgUrl = getStrapiMedia(data.media.data[0].attributes.url) ?? "";
  const mobLogoUrl = data.mobLogo.data
    ? getStrapiMedia(data.mobLogo.data.attributes.url)
    : undefined;

  const height = 300 + data.services.length * 130;
  const mobHeight = 300 + data.services.length * 60;

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="grid grid-cols-1 mx-auto md:grid-cols-2"
      style={{ height: `${isMobile ? mobHeight : height}px` }}
    >
      <DivWithImage
        imgUrl={imgUrl}
        logoUrl={logoUrl}
        pictureOnRight={data.pictureOnRight}
      >
        <div className="block pt-10 pb-3 md:hidden">
          <DisplayLogo logoUrl={mobLogoUrl ?? logoUrl} />
        </div>
        <ServiceDisclosure
          data={data.services}
          fontColor={data.fontColor?.fontColor}
        />
      </DivWithImage>
    </div>
  );
}

export const DivWithImage = ({
  imgUrl,
  logoUrl,
  children,
  pictureOnRight,
}: {
  imgUrl: string;
  logoUrl: string;
  pictureOnRight: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <>
      <div
        className="relative items-center justify-center hidden bg-center bg-cover md:flex"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          ...(pictureOnRight && { backgroundImage: `url(${imgUrl})` }),
        }}
      >
        <div className="container relative flex items-center justify-center w-full h-full">
          <div className="flex items-center justify-center">
            <Image
              width={600}
              height={600}
              src={logoUrl}
              alt="our client logo"
              className="object-contain max-w-[170px] lg:h-16 h-12"
            />
          </div>
        </div>
      </div>
      <div
        style={{
          ...(!pictureOnRight && { backgroundImage: `url(${imgUrl})` }),
        }}
      >
        {children}
      </div>
    </>
  );
};

const DisplayLogo = ({ logoUrl }: { logoUrl: string }) => {
  return (
    <div className="flex items-center justify-center">
      <Image
        width={600}
        height={600}
        src={logoUrl}
        alt="our client logo"
        className="object-contain max-w-[130px] h-10"
      />
    </div>
  );
};
