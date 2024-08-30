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
    animation: boolean;
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
    threshold: 0.1, // Trigger animation when 10% of the component is visible
    triggerOnce: true, // Only trigger once
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      if (divRef.current && window) {
        divRef.current.style.width = `${window.innerWidth}px`;
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
  }, [data.pictureOnRight]);

  useEffect(() => {
    if (inView && data.animation) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section
      // ref={ref}
      // initial="hidden"
      // animate={controls}
      // variants={variants}
      className={classNames(
        data.pictureOnRight ? "justify-end" : "justify-start",
        "relative flex flex-col w-full md:flex-row md:pb-14"
      )}
    >
      {imgUrl && !data.pictureOnRight && (
        <motion.div
          ref={ref}
          animate={controls}
          variants={variants}
          className={classNames("md:w-[60%]")}
          initial={data.animation ? "hidden" : "visible"}
        >
          <img
            src={imgUrl}
            alt={"Image"}
            className={classNames(
              "object-cover w-full h-full top-0 left-0 bg-gray-300 md:aspect-[16/9] aspect-[4/3] max-h-[45rem]"
            )}
          />
        </motion.div>
      )}

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
      {imgUrl && data.pictureOnRight && (
        <motion.div
          ref={ref}
          animate={controls}
          variants={variants}
          className="md:w-[60%]"
          initial={data.animation ? "hidden" : "visible"}
        >
          <img
            src={imgUrl}
            alt={"Image"}
            className={classNames(
              "object-cover w-full h-full top-0 left-0 bg-gray-300 md:aspect-[16/9] aspect-[4/3] max-h-[45rem]"
            )}
          />
        </motion.div>
      )}
    </section>
  );
}

// export default function InfoBlockWithImage({ data }: InfoBlockWithImageProps) {
//   const divRef = useRef<HTMLDivElement>(null);
//   const imgUrl = getStrapiMedia(data.picture.data[0]?.attributes.url);

//   useLayoutEffect(() => {
//     if (divRef.current && window) {
//       divRef.current.style.width = `${window.innerWidth}px`;
//     }
//   }, [data.pictureOnRight]);

//   return (
//     <div
//       className={classNames(
//         data.pictureOnRight ? "justify-end" : "justify-start",
//         "relative flex flex-col w-full md:flex-row md:pb-14"
//       )}
//     >
//       {imgUrl && !data.pictureOnRight && (
//         <div className={classNames("md:w-[60%]")}>
//           <img
//             src={imgUrl}
//             alt={"Image"}
//             className={classNames(
//               "object-cover w-full h-full top-0 left-0 bg-gray-300 aspect-[16/9]"
//             )}
//           />
//         </div>
//       )}

//       <div className={classNames("md:absolute bottom-0 w-full")}>
//         <div
//           className={classNames(
//             !data.pictureOnRight ? "justify-end" : "",
//             "container flex mx-auto bg-black md:bg-transparent"
//           )}
//         >
//           <div
//             className={classNames(
//               data.pictureOnRight ? "md:pl-0" : "",
//               "relative max-w-3xl text-white bg-black py-14 px-0 md:px-14"
//             )}
//           >
//             <h3>{data.description}</h3>
//             <div
//               ref={divRef}
//               className={classNames(
//                 !data.pictureOnRight ? "left-full" : "right-full",
//                 "absolute bottom-0 w-full h-full bg-black hidden md:block"
//               )}
//             ></div>
//           </div>
//         </div>
//       </div>
//       {imgUrl && data.pictureOnRight && (
//         <div className="md:w-[60%]">
//           <img
//             src={imgUrl}
//             alt={"Image"}
//             className={classNames(
//               "object-cover w-full h-full top-0 left-0 bg-gray-300 aspect-[16/9]"
//             )}
//           />
//         </div>
//       )}
//     </div>
//   );
// }
