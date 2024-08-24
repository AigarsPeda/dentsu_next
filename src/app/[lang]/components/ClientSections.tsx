"use client";
import { motion, AnimatePresence, Variants } from "framer-motion";
import type { EmblaOptionsType } from "embla-carousel";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
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

const FADE_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

interface ClientSectionsProps {
  data: { title: string; feature: FeaturesType[] };
}

const OPTIONS: EmblaOptionsType = { loop: true, align: "start" };
const ORDER_OF_LIST = ["carat", "iprospect", "dentsux", "dentsucreative"];

export default function ClientSections({ data }: ClientSectionsProps) {
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [currentCompany, setCurrentCompany] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const filteredData = useMemo(() => {
    setIsVisible(false); // Trigger fade out

    return data.feature.filter((item) => {
      return item.participatingCompany
        ?.toLowerCase()
        .includes(search?.toLowerCase() || "");
    });
  }, [search]);

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
    // setIsVisible(false); // Trigger fade out

    // setTimeout(() => {
    //   const index = sortedCompanies.indexOf(currentCompany);
    //   const nextCompany = sortedCompanies[index + 1] || sortedCompanies[0];
    //   const url = nextCompany.toLowerCase();

    //   router.push(`${path}?search=${url}`, {
    //     scroll: false,
    //   });
    // }, 500); // Delay routing until fade out is complete (match the duration)

    const index = sortedCompanies.indexOf(currentCompany);
    const nextCompany = sortedCompanies[index + 1] || sortedCompanies[0];
    const url = nextCompany.toLowerCase();

    router.push(`${path}?search=${url}`, {
      scroll: false,
    });
  };

  useEffect(() => {
    const searchCompany = search?.toLowerCase();

    if (!searchCompany) {
      const url = sortedCompanies[0].toLowerCase();

      router.push(`${path}?search=${url}`, {
        scroll: false,
      });

      return;
    }

    setCurrentCompany(searchCompany);
  }, [search]);

  useEffect(() => {
    setIsVisible(true); // Trigger fade in after URL change
  }, [currentCompany]);

  return (
    <div className="container relative mx-auto" ref={containerRef}>
      <div className="absolute top-0 z-10 w-20 h-full left-8 bg-gradient-to-r from-white to-transparent"></div>
      <div
        style={{
          minHeight: "10rem",
          position: "relative",
          height: containerRef.current?.offsetHeight,
        }}
      >
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
                handArraySwitch={handleSwitch}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute top-0 z-10 w-20 h-full bg-gradient-to-l from-white to-transparent right-8"></div>
    </div>
  );
}
