"use client";
import ServiceDisclosure from "@/app/[lang]/components/Disclosure";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

interface ServicesProps {
  data: {
    id: number;
    animate: boolean;
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
  const logoUrl = getStrapiMedia(data.logo.data.attributes.url) ?? "";
  const imgUrl = getStrapiMedia(data.media.data[0]?.attributes.url) ?? "";
  const mobLogoUrl = data.mobLogo.data
    ? getStrapiMedia(data.mobLogo.data.attributes.url)
    : undefined;

  return (
    <div className="grid grid-cols-1 mx-auto bg-white md:grid-cols-2">
      <DivWithImage
        imgUrl={imgUrl}
        logoUrl={logoUrl}
        isAnimateOn={data.animate}
        isDarkOverlay={data.isDarkOverlay}
        pictureOnRight={data.pictureOnRight}
      >
        <div className="block pt-10 pb-3 md:hidden">
          <DisplayLogo logoUrl={mobLogoUrl ?? logoUrl} />
        </div>
        <ServiceDisclosure
          data={data.services}
          isAnimateOn={data.animate}
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
  isAnimateOn,
  isDarkOverlay,
  pictureOnRight,
}: {
  imgUrl: string;
  logoUrl: string;
  isAnimateOn: boolean;
  isDarkOverlay: boolean;
  pictureOnRight: boolean;
  children?: React.ReactNode;
}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger animation when 10% of the component is visible
    triggerOnce: true, // Only trigger once
  });

  useEffect(() => {
    if (inView && isAnimateOn) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const createBackgroundImage = (url: string) => {
    const baseStyle = {
      backgroundPosition: "center",
      backgroundImage: isDarkOverlay
        ? `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${url})`
        : `url(${url})`,
    };

    return baseStyle;
  };

  return (
    <>
      <div
        className="relative items-center justify-center hidden bg-center md:bg-cover md:flex"
        style={{
          ...(pictureOnRight && {
            ...createBackgroundImage(imgUrl),
          }),
        }}
      >
        <div className="container relative flex items-center justify-center w-full h-full">
          <motion.div
            ref={ref}
            animate={controls}
            variants={VARIANTS}
            initial={isAnimateOn ? "hidden" : "visible"}
            className="flex items-center justify-center"
          >
            <img
              src={logoUrl}
              alt="our client logo"
              className="object-contain h-12 max-h-6 lg:h-16"
            />
          </motion.div>
        </div>
      </div>
      <div
        className=" md:flex"
        style={{
          ...(!pictureOnRight && {
            ...createBackgroundImage(imgUrl),
          }),
          // backgroundAttachment: isMobile ? "fixed" : "cover",
          backgroundAttachment: "cover",
          // WebkitBackgroundSize: "2650px 1440px;",
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
