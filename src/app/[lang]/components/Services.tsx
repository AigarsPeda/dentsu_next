"use client";
import ServiceDisclosure from "@/app/[lang]/components/Disclosure";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { useEffect, useState } from "react";

interface ServicesProps {
  data: {
    id: number;
    isDarkOverlay: boolean;
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
  const [isMobile, setIsMobile] = useState(false);
  const logoUrl = getStrapiMedia(data.logo.data.attributes.url) ?? "";
  const imgUrl = getStrapiMedia(data.media.data[0]?.attributes.url) ?? "";
  const mobLogoUrl = data.mobLogo.data
    ? getStrapiMedia(data.mobLogo.data.attributes.url)
    : undefined;

  const height = 260 + data.services.length * 60;
  const mobHeight = 300 + data.services.length * 50;

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
      className="grid grid-cols-1 mx-auto bg-white md:grid-cols-2"
      // style={{ height: `${isMobile ? mobHeight : height}px` }}
      // style={{ height: isMobile ? `${height}px` : "auto" }}
    >
      <DivWithImage
        imgUrl={imgUrl}
        logoUrl={logoUrl}
        isDarkOverlay={data.isDarkOverlay}
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
  isDarkOverlay,
  pictureOnRight,
}: {
  imgUrl: string;
  logoUrl: string;
  isDarkOverlay: boolean;
  pictureOnRight: boolean;
  children?: React.ReactNode;
}) => {
  const createBackgroundImage = (url: string) => {
    if (!isDarkOverlay) {
      return {
        backgroundSize: "cover", // Revert to 'cover' to fill the container
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Fixes background to prevent zoom effect
        backgroundImage: `url(${url})`,
      };
    }

    return {
      backgroundSize: "cover", // Revert to 'cover' to fill the container
      backgroundPosition: "center",
      backgroundAttachment: "fixed", // Fixes background to prevent zoom effect
      backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${url})`,
    };
  };
  // const createBackgroundImage = (url: string) => {
  //   if (!isDarkOverlay) {
  //     return {
  //       backgroundSize: "cover", // Use cover instead of cover
  //       backgroundPosition: "center",
  //       backgroundRepeat: "no-repeat", // Prevent repeating when using cover
  //       backgroundImage: `url(${url})`,
  //     };
  //   }

  //   return {
  //     backgroundSize: "cover", // Use cover instead of cover
  //     backgroundPosition: "center",
  //     backgroundRepeat: "no-repeat", // Prevent repeating when using cover
  //     backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${url})`,
  //   };
  // };

  return (
    <>
      <div
        className="relative items-center justify-center hidden bg-center bg-cover md:flex"
        style={{
          ...(pictureOnRight && {
            ...createBackgroundImage(imgUrl),
          }),
        }}
      >
        <div className="container relative flex items-center justify-center w-full h-full">
          <div className="flex items-center justify-center">
            <img
              src={logoUrl}
              alt="our client logo"
              className="object-contain h-12 max-h-6 lg:h-16"
            />
          </div>
        </div>
      </div>
      <div
        style={{
          ...(!pictureOnRight && {
            ...createBackgroundImage(imgUrl),
          }),
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
      <img
        src={logoUrl}
        alt="our client logo"
        className="object-contain max-h-5"
      />
    </div>
  );
};
