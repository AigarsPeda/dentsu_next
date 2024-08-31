"use client";
import ServiceDisclosure from "@/app/[lang]/components/Disclosure";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const logoUrl = getStrapiMedia(data.logo.data.attributes.url) ?? "";
  const imgUrl = getStrapiMedia(data.media.data[0]?.attributes.url) ?? "";
  const mobLogoUrl = data.mobLogo.data
    ? getStrapiMedia(data.mobLogo.data.attributes.url)
    : undefined;

  const togglePanel = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="grid grid-cols-1 mx-auto bg-white md:grid-cols-2">
      <DivWithImage
        imgUrl={imgUrl}
        logoUrl={logoUrl}
        isAnimateOn={data.animate}
        isMenuOpen={openIndex !== null}
        isDarkOverlay={data.isDarkOverlay}
        pictureOnRight={data.pictureOnRight}
      >
        <div className="block pt-10 pb-3 md:hidden">
          <DisplayLogo logoUrl={mobLogoUrl ?? logoUrl} />
        </div>
        <ServiceDisclosure
          openIndex={openIndex}
          data={data.services}
          togglePanel={togglePanel}
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
  isMenuOpen,
  isAnimateOn,
  isDarkOverlay,
  pictureOnRight,
}: {
  imgUrl: string;
  logoUrl: string;
  isMenuOpen: boolean;
  isAnimateOn: boolean;
  isDarkOverlay: boolean;
  pictureOnRight: boolean;
  children?: React.ReactNode;
}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.3, // Trigger animation when 10% of the component is visible
    triggerOnce: true, // Only trigger once
  });

  useEffect(() => {
    // const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    // if (isMobile) {
    //   controls.set("visible");
    //   return;
    // }

    if (inView && isAnimateOn) {
      controls.start("visible");
    } else if (!inView && isAnimateOn) {
      controls.start("hidden");
    }
  }, [inView, isAnimateOn, controls]);

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
        className="relative items-center justify-center hidden overflow-hidden bg-center md:bg-cover md:flex"
        style={{
          ...(pictureOnRight && {
            ...createBackgroundImage(imgUrl),
          }),
        }}
      >
        <div className="container relative flex items-center justify-center w-full h-full">
          <motion.div
            ref={ref}
            initial="visible"
            animate={controls}
            variants={VARIANTS}
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
        className="transition-all duration-300 md:flex"
        style={{
          backgroundAttachment: "cover",
          backgroundSize: isMenuOpen ? "110% 110%" : "100% 100%",
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
