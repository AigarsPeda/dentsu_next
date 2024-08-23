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
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
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
const SLIDE_COUNT = 8;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function ClientSections({ data }: ClientSectionsProps) {
  const [parent] = useAutoAnimate();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [currentIndex, setCurrentIndex] = useState(0);

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
      data.feature.filter(
        (item) =>
          item.participatingCompany === allInvolvedCompanies[currentIndex]
      ),
    [currentIndex]
  );

  // after FAST_DURATION changes, setCurrentIndex
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("interval");
  //     // setMustFinish(true);
  //     setCurrentIndex((prev) => {
  //       if (prev === allInvolvedCompanies.length - 1) {
  //         return 0;
  //       } else {
  //         return prev + 1;
  //       }
  //     });
  //   }, duration * 1000);
  //   return () => clearInterval(interval);
  // }, [duration]);

  // bg-[#e5e5e9]
  return (
    // <div className="bg-white">
    //   <div className="container px-5 mx-auto">
    //     <h2 className="pb-10 text-xl font-normal text-center lg:text-4xl">
    //       {data.title}
    //     </h2>

    //     <div ref={parent} className="flex w-full overflow-x-auto min-h-[180px]">
    //       {logosArray.map((item, index) => {
    //         const imgSrc = getStrapiMedia(item.media.data.attributes.url);
    //         return (
    //           <AnimatePresence presenceAffectsLayout key={item.id}>
    //             <motion.div
    //               ref={ref}
    //               style={{ x: xTranslation }}
    //               className="flex items-center justify-center flex-shrink-0 w-1/6 h-auto pl-10"
    //             >
    //               <Link
    //                 href={item.url ?? "/"}
    //                 target={item.newTab ? "_self" : "_blank"}
    //               >
    //                 {imgSrc && (
    //                   <img
    //                     src={imgSrc}
    //                     alt="our client logo"
    //                     className="object-contain w-full h-full"
    //                   />
    //                 )}
    //               </Link>
    //             </motion.div>
    //           </AnimatePresence>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </div>
    <div className="container mx-auto ">
      <EmblaCarousel slides={logosArray} options={OPTIONS} />
    </div>
  );
}
