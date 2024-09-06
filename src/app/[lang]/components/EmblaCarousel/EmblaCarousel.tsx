// import type { EmblaOptionsType } from "embla-carousel";
// import AutoScroll from "embla-carousel-auto-scroll";
// import useEmblaCarousel from "embla-carousel-react";
// import Link from "next/link";
// import { type FC, useCallback, useEffect, useRef, useState } from "react";
// import type { FeaturesType } from "src/app/[lang]/components/ClientSections";

// // https://www.embla-carousel.com/api/events/
// // https://www.embla-carousel.com/examples/predefined/

// type PropType = {
//   slides: FeaturesType[];
//   options?: EmblaOptionsType;
//   handArraySwitch: () => void;
// };

// const EmblaCarousel: FC<PropType> = ({ slides, options, handArraySwitch }) => {
//   const [emblaRef, emblaApi] = useEmblaCarousel(options, [
//     AutoScroll({ playOnInit: true }),
//   ]);

//   const timerId = useRef<NodeJS.Timeout | null>(null);
//   const [userIsInteracting, setUserIsInteracting] = useState(false);

//   // const {
//   //   prevBtnDisabled,
//   //   nextBtnDisabled,
//   //   onPrevButtonClick,
//   //   onNextButtonClick,
//   // } = usePrevNextButtons(emblaApi);

//   const onButtonAutoplayClick = useCallback(
//     (callback: () => void) => {
//       const autoScroll = emblaApi?.plugins()?.autoScroll;
//       if (!autoScroll) return;

//       const resetOrStop =
//         autoScroll.options.stopOnInteraction === false
//           ? autoScroll.reset
//           : autoScroll.stop;

//       resetOrStop();
//       callback();
//     },
//     [emblaApi]
//   );

//   // const toggleAutoplay = useCallback(() => {
//   //   const autoScroll = emblaApi?.plugins()?.autoScroll;
//   //   if (!autoScroll) return;

//   //   const playOrStop = autoScroll.isPlaying()
//   //     ? autoScroll.stop
//   //     : autoScroll.play;
//   //   playOrStop();
//   // }, [emblaApi]);

//   useEffect(() => {
//     const autoScroll = emblaApi?.plugins()?.autoScroll;

//     if (userIsInteracting || !autoScroll) {
//       timerId.current = null;
//       return;
//     }

//     // make shure loop is enabled

//     emblaApi.reInit({ loop: true });
//     // }

//     autoScroll.play();
//     // const arrayLength = slides.length;
//     // const timeToSwitch = arrayLength * 1000 * 2; // 2 seconds per slide
//     const timeToSwitch = 10 * 1000 * 2.2; // 1.2 seconds per slide

//     timerId.current = setTimeout(() => {
//       handArraySwitch();
//     }, timeToSwitch);

//     return () => {
//       if (timerId.current) {
//         clearTimeout(timerId.current);
//         timerId.current = null;
//       }
//     };
//   }, [emblaApi, handArraySwitch, slides, userIsInteracting]);

//   useEffect(() => {
//     emblaApi?.reInit();
//     const autoScroll = emblaApi?.plugins()?.autoScroll;

//     if (!autoScroll) return;

//     autoScroll.play();

//     emblaApi
//       .on("pointerDown", () => {
//         setUserIsInteracting(true);
//         if (timerId.current) {
//           clearTimeout(timerId.current);
//           timerId.current = null;
//         }
//       })
//       .on("pointerUp", () => {
//         setUserIsInteracting(false);
//         timerId.current = setTimeout(() => {
//           if (!autoScroll.isPlaying()) {
//             autoScroll.play();
//           }
//         }, 3000);
//       });

//     return () => {
//       if (timerId.current) {
//         clearTimeout(timerId.current);
//         timerId.current = null;
//       }
//     };
//   }, [emblaApi, slides]);

//   return (
//     <div className="embla">
//       <div className="embla__viewport" ref={emblaRef}>
//         <div className="embla__container">
//           {slides.map((item, i) => {
//             return (
//               <div key={`${item.id}${i}`} className="embla__slide">
//                 <div className="embla__slide__number">
//                   <Link
//                     href={item.url ?? "/"}
//                     target={item.newTab ? "_self" : "_blank"}
//                     className="object-cover w-full h-full"
//                   >
//                     {item.media.data.attributes.url && (
//                       <>
//                         <img
//                           src={item.media.data.attributes.url}
//                           alt="our client logo"
//                           className="object-contain w-full h-full"
//                         />
//                       </>
//                     )}
//                   </Link>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* <div className="embla__controls">
//         <div className="embla__buttons">
//           <PrevButton
//             onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
//             disabled={prevBtnDisabled}
//           />
//           <NextButton
//             onClick={() => onButtonAutoplayClick(onNextButtonClick)}
//             disabled={nextBtnDisabled}
//           />
//         </div>

//         <button className="embla__play" onClick={toggleAutoplay} type="button">
//           {isPlaying ? "Stop" : "Start"}
//         </button>
//       </div> */}
//     </div>
//   );
// };

// export default EmblaCarousel;
import type { EmblaOptionsType } from "embla-carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { type FC, useCallback, useEffect, useRef, useState } from "react";
import type { FeaturesType } from "src/app/[lang]/components/ClientSections";

// Preload the images and store them in a ref
const usePreloadImages = (slides: FeaturesType[]) => {
  const [loadedImages, setLoadedImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const preloadImages = () => {
      const imageMap: Record<string, string> = {};
      slides.forEach((item) => {
        const img = new Image();
        img.src = item.media.data.attributes.url;
        img.onload = () => {
          imageMap[item.id] = img.src; // Store the preloaded image URL once loaded
          setLoadedImages((prev) => ({ ...prev, [item.id]: img.src }));
        };
      });
    };
    preloadImages();
  }, [slides]);

  return loadedImages;
};

type PropType = {
  slides: FeaturesType[];
  options?: EmblaOptionsType;
  handArraySwitch: () => void;
};

const EmblaCarousel: FC<PropType> = ({ slides, options, handArraySwitch }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: true }),
  ]);

  const timerId = useRef<NodeJS.Timeout | null>(null);
  const [userIsInteracting, setUserIsInteracting] = useState(false);

  // Use the preloaded images
  const loadedImages = usePreloadImages(slides);

  const onButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      if (!autoScroll) return;

      const resetOrStop =
        autoScroll.options.stopOnInteraction === false
          ? autoScroll.reset
          : autoScroll.stop;

      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;

    if (userIsInteracting || !autoScroll) {
      timerId.current = null;
      return;
    }

    emblaApi.reInit({ loop: true });
    autoScroll.play();

    const timeToSwitch = 10 * 1000 * 2.2; // 1.2 seconds per slide

    timerId.current = setTimeout(() => {
      handArraySwitch();
    }, timeToSwitch);

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
        timerId.current = null;
      }
    };
  }, [emblaApi, handArraySwitch, slides, userIsInteracting]);

  useEffect(() => {
    emblaApi?.reInit();
    const autoScroll = emblaApi?.plugins()?.autoScroll;

    if (!autoScroll) return;

    autoScroll.play();

    emblaApi
      .on("pointerDown", () => {
        setUserIsInteracting(true);
        if (timerId.current) {
          clearTimeout(timerId.current);
          timerId.current = null;
        }
      })
      .on("pointerUp", () => {
        setUserIsInteracting(false);
        timerId.current = setTimeout(() => {
          if (!autoScroll.isPlaying()) {
            autoScroll.play();
          }
        }, 3000);
      });

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
        timerId.current = null;
      }
    };
  }, [emblaApi, slides]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item, i) => (
            <div key={`${item.id}${i}`} className="embla__slide">
              <div className="embla__slide__number">
                <Link
                  href={item.url ?? "/"}
                  target={item.newTab ? "_self" : "_blank"}
                  className="object-cover w-full h-full"
                >
                  {loadedImages[item.id] ? (
                    <img
                      src={loadedImages[item.id]} // Use the preloaded image URL
                      alt="our client logo"
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <div>Loading...</div> // Placeholder while loading
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
