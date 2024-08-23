"use client";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  animate,
  AnimationPlaybackControls,
  motion,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useMemo, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import { EmblaOptionsType } from "embla-carousel";
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

export default function ClientSections({ data }: ClientSectionsProps) {
  const [parent] = useAutoAnimate();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [currentIndex, setCurrentIndex] = useState(0);

  const path = usePathname();
  const router = useRouter();

  const filteredData = data.feature.filter((item) => {
    return item.participatingCompany
      ?.toLowerCase()
      .includes(search?.toLowerCase() || "");
  });

  const uniqueCompanies = data.feature.reduce((acc, item) => {
    if (item.participatingCompany) {
      acc.add(item.participatingCompany);
    }
    return acc;
  }, new Set<string>());

  const allInvolvedCompanies = Array.from(uniqueCompanies);

  // [[],[]]
  const logosArray = useMemo(
    () =>
      data.feature
        .filter(
          (item) =>
            item.participatingCompany === allInvolvedCompanies[currentIndex]
        )
        .sort((a, b) => a.id - b.id),
    [currentIndex]
  );

  useEffect(() => {
    const url = allInvolvedCompanies[currentIndex].toLowerCase();

    router.push(`${path}?search=${url}`, {
      scroll: false,
    });
  }, [currentIndex]);

  // bg-[#e5e5e9]
  return (
    <div ref={parent} className="container mx-auto">
      <EmblaCarousel
        handArraySwitch={() => {
          setCurrentIndex((prev) => {
            if (prev === allInvolvedCompanies.length - 1) {
              return 0;
            } else {
              return prev + 1;
            }
          });
        }}
        slides={logosArray}
        options={OPTIONS}
      />
    </div>
  );
}
