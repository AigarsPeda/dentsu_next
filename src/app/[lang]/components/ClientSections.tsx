"use client";
import classNames from "classnames";
import type { EmblaOptionsType } from "embla-carousel";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { getStrapiMedia } from "src/app/[lang]/utils/api-helpers";
import EmblaCarousel from "./EmblaCarousel/EmblaCarousel";

// https://www.embla-carousel.com/api/events/
// https://www.embla-carousel.com/examples/predefined/

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

export interface FeaturesType {
  id: number;
  newTab: boolean;
  isNewTab: boolean;
  url: string | null;
  participatingCompany: string | null;
  media: {
    data: MediaTypes;
  };
}

export interface Department {
  id: number;
  url: string;
  media: { data: MediaTypes };
}

const FADE_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

interface ClientSectionsProps {
  data: { title: string; feature: FeaturesType[]; Department: Department[] };
}

const OPTIONS: EmblaOptionsType = { loop: true, align: "start" };
const ORDER_OF_LIST = ["carat", "iprospect", "dentsux", "dentsucreative"];

export default function ClientSections({ data }: ClientSectionsProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentCompany, setCurrentCompany] = useState("");

  const filteredData = useMemo(() => {
    setIsVisible(false); // Trigger fade out
    const filterData = data.feature.filter((item) => {
      return item.participatingCompany
        ?.toLowerCase()
        .includes(currentCompany?.toLowerCase() || "");
    });

    // if filterData is less then 7
    if (filterData.length <= 7) {
      return filterData.concat(filterData);
    }

    return filterData;
  }, [currentCompany]);

  const uniqueCompanies = data.feature.reduce((acc, item) => {
    if (item.participatingCompany) {
      acc.add(item.participatingCompany.toLowerCase());
    }
    return acc;
  }, new Set<string>());

  const sortedCompanies = Array.from(uniqueCompanies).sort((a, b) => {
    return ORDER_OF_LIST.indexOf(a) - ORDER_OF_LIST.indexOf(b);
  });

  const handleSwitch = () => {
    const index = sortedCompanies.indexOf(currentCompany);
    const nextCompany = sortedCompanies[index + 1] || sortedCompanies[0];

    setCurrentCompany(nextCompany.toLowerCase());
  };

  useEffect(() => {
    if (!currentCompany) {
      setCurrentCompany(sortedCompanies[0].toLowerCase());
    }
  }, []);

  // every time currentCompany changes fade in
  useEffect(() => {
    if (currentCompany) {
      setIsVisible(true);
    }
  }, [currentCompany]);

  return (
    <>
      <div
        className={classNames(
          "grid-cols-1 lg:grid-cols-4 gap-6 space-y-7 md:space-y-0 container mx-auto py-14 grid"
        )}
      >
        {data.Department?.map((item) => {
          const imgSrc = getStrapiMedia(item.media.data.attributes.url);
          const isLink = item.url ? true : false;

          return (
            <div
              key={item.id}
              className={classNames(
                "flex items-center justify-center lg:block object-contain max-h-6 hover:opacity-50 transition-all",
                currentCompany !== item.url ? "opacity-35" : ""
              )}
            >
              {imgSrc ? (
                <button
                  onClick={() => {
                    setCurrentCompany(item.url);
                  }}
                >
                  <img
                    src={imgSrc}
                    alt="our client logo"
                    className={classNames(
                      "object-contain max-h-6 transition-all"
                    )}
                  />
                </button>
              ) : (
                <div className="flex items-center justify-center w-24 h-24 bg-gray-200">
                  No Image Available
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="container mx-auto">
        <h2 className="pb-2 text-xl font-normal text-center md:text-3xl">
          {data.title}
        </h2>
        <div className="relative min-h-[5.7rem] md:min-h-[10rem] flex justify-center items-center">
          <div className="absolute top-0 left-0 z-10 w-20 h-full bg-gradient-to-r from-white to-transparent"></div>
          <AnimatePresence mode="wait">
            {isVisible && (
              <motion.div
                exit="hidden"
                initial="hidden"
                animate="visible"
                key={currentCompany}
                variants={FADE_VARIANTS}
                style={{ width: "100%" }}
                transition={{ duration: 0.5 }}
              >
                <EmblaCarousel
                  options={OPTIONS}
                  slides={filteredData}
                  handArraySwitch={() => {
                    setIsVisible(false);
                    handleSwitch();
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute top-0 right-0 z-10 w-20 h-full bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </div>
    </>
  );
}
