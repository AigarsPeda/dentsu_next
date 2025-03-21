import type { EmblaOptionsType } from "embla-carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { type FC, useCallback, useEffect, useRef, useState } from "react";
import type { FeaturesType } from "src/app/[lang]/components/ClientSections";

// Preload all images and resolve when all are loaded
export const preloadAllImages = (slides: FeaturesType[]) => {
  return new Promise<void>((resolve) => {
    let loadedCount = 0;
    slides.forEach((item) => {
      const img = new Image();
      img.src = item.media.data.attributes.url;
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === slides.length) {
          resolve();
        }
      };
      img.onerror = () => {
        loadedCount += 1; // Still count if there's an error loading an image
        if (loadedCount === slides.length) {
          resolve();
        }
      };
    });
  });
};

type PropType = {
  slides: FeaturesType[];
  options?: EmblaOptionsType;
  handArraySwitch: () => void;
  handelIsLoading: () => void;
};

const EmblaCarousel: FC<PropType> = ({
  slides,
  options,
  handArraySwitch,
  handelIsLoading,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: true }),
  ]);
  // const [isLoading, setIsLoading] = useState(true);
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const [userIsInteracting, setUserIsInteracting] = useState(false);

  // Preload all images before showing the carousel
  useEffect(() => {
    preloadAllImages(slides).then(() => {
      // setIsLoading(false);
      handelIsLoading();
    });
  }, [slides]);

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

  // if (isLoading) {
  //   // Display loading state until all images are preloaded
  //   return <div className="bg-transparent sr-only">Loading...</div>;
  // }

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item, i) => (
            <div key={`${item.id}${i}`} className="embla__slide">
              <div className="embla__slide__number">
                <Link
                  prefetch={true}
                  href={item.url ?? "/"}
                  target={item.newTab ? "_self" : "_blank"}
                  className="object-cover w-full h-full"
                >
                  {item.media.data?.attributes?.url && (
                    <img
                      src={item.media.data?.attributes?.url}
                      alt="our client logo"
                      className="object-contain w-full h-full"
                    />
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
