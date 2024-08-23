"use client";
import { motion, AnimatePresence } from "framer-motion";
import type { EmblaOptionsType } from "embla-carousel";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import EmblaCarousel from "./EmblaCarousel/EmblaCarousel";

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

interface ClientSectionsProps {
  data: { title: string; feature: FeaturesType[] };
}

const OPTIONS: EmblaOptionsType = { loop: true };
const ORDER_OF_LIST = ["carat", "iprospect", "dentsux", "dentsucreative"];

export default function ClientSections({ data }: ClientSectionsProps) {
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [currentCompany, setCurrentCompany] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const filteredData = data.feature.filter((item) => {
    return item.participatingCompany
      ?.toLowerCase()
      .includes(search?.toLowerCase() || "");
  });

  const uniqueCompanies = data.feature.reduce((acc, item) => {
    if (item.participatingCompany) {
      acc.add(item.participatingCompany.toLowerCase());
    }
    return acc;
  }, new Set<string>());

  const allInvolvedCompanies = Array.from(uniqueCompanies).sort((a, b) => {
    return ORDER_OF_LIST.indexOf(a) - ORDER_OF_LIST.indexOf(b);
  });

  useEffect(() => {
    const searchCompany = search?.toLowerCase();

    if (!searchCompany) {
      const url = allInvolvedCompanies[0].toLowerCase();

      router.push(`${path}?search=${url}`, {
        scroll: false,
      });

      return;
    }

    setCurrentCompany(searchCompany);
  }, [search]);

  const handleSwitch = () => {
    setIsVisible(false); // Trigger fade out

    setTimeout(() => {
      const currentIndex = allInvolvedCompanies.indexOf(currentCompany);
      const nextCompany =
        allInvolvedCompanies[currentIndex + 1] || allInvolvedCompanies[0];
      const url = nextCompany.toLowerCase();

      router.push(`${path}?search=${url}`, {
        scroll: false,
      });
    }, 500); // Delay routing until fade out is complete (match the duration)
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  useEffect(() => {
    setIsVisible(true); // Trigger fade in after URL change
  }, [currentCompany]);

  return (
    <div className="container relative mx-auto" ref={containerRef}>
      <div className="absolute top-0 z-10 w-20 h-full left-8 bg-gradient-to-r from-white to-transparent"></div>
      <div
        style={{
          position: "relative",
          height: containerRef.current?.offsetHeight,
        }}
      >
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key={currentCompany}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeVariants}
              transition={{ duration: 0.5 }}
              style={{ width: "100%" }}
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
