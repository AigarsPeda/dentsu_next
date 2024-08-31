"use client";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import classNames from "classnames";
import { useEffect, useLayoutEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

type PictureType = {
  id: string;
  attributes: {
    url: string;
    width: number;
    height: number;
    caption: string | null;
    alternativeText: string | null;
  };
};

type PictureDataType = {
  data: PictureType[];
};

interface InfoBlockWithImageProps {
  data: {
    animate: boolean;
    description: string;
    pictureOnRight: boolean;
    picture: PictureDataType;
  };
}

export default function InfoBlockWithImage({ data }: InfoBlockWithImageProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const imgUrl = getStrapiMedia(data.picture.data[0]?.attributes.url);
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Determine if the screen is mobile

  useLayoutEffect(() => {
    const handleResize = () => {
      if (divRef.current && window) {
        divRef.current.style.width = `${window.innerWidth}px`;
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [data.pictureOnRight]);

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    if (isMobile) {
      controls.set("visible");
      return;
    }

    if (inView && data.animate) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView, data.animate]);

  return (
    <section
      ref={ref}
      className={classNames(
        data.pictureOnRight ? "justify-end" : "justify-start",
        "relative flex flex-col w-full md:flex-row md:pb-14"
      )}
    >
      <motion.div
        initial={"hidden"} // Set initial state based on screen size
        animate={controls}
        variants={variants}
        className={classNames("md:w-[60%]")}
      >
        {imgUrl && !data.pictureOnRight && (
          <img
            src={imgUrl}
            alt={"Image"}
            className={classNames(
              "object-cover w-full h-full top-0 left-0 bg-gray-300 md:aspect-[16/9] aspect-[4/3] max-h-[45rem]"
            )}
          />
        )}
      </motion.div>
      <div
        className={classNames(
          "md:absolute bottom-0 w-full bg-black md:bg-transparent"
        )}
      >
        <div
          className={classNames(
            !data.pictureOnRight ? "justify-end" : "",
            "container flex mx-auto  md:bg-transparent"
          )}
        >
          <div
            className={classNames(
              data.pictureOnRight ? "md:pl-0" : "",
              "relative max-w-3xl text-white bg-black py-14 px-0 md:px-14"
            )}
          >
            <h3>{data.description}</h3>
            <div
              ref={divRef}
              className={classNames(
                !data.pictureOnRight ? "left-full" : "right-full",
                "absolute bottom-0 w-full h-full bg-black hidden md:block"
              )}
            ></div>
          </div>
        </div>
      </div>
      <motion.div
        initial={"hidden"} // Set initial state based on screen size
        animate={controls}
        variants={variants}
        className="md:w-[60%]"
      >
        {imgUrl && data.pictureOnRight && (
          <img
            src={imgUrl}
            alt={"Image"}
            className={classNames(
              "object-cover w-full h-full top-0 left-0 bg-gray-300 md:aspect-[16/9] aspect-[4/3] max-h-[45rem]"
            )}
          />
        )}
      </motion.div>
    </section>
  );
}
