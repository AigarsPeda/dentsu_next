import type { EmblaOptionsType } from "embla-carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import React, { useCallback, useEffect, useRef } from "react";
import type { FeaturesType } from "src/app/[lang]/components/ClientSections";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "src/app/[lang]/components/EmblaCarousel/EmblaCarouselArrowButtons";
import { getStrapiMedia } from "src/app/[lang]/utils/api-helpers";

type PropType = {
  slides: FeaturesType[];
  options?: EmblaOptionsType;
  handArraySwitch: () => void;
};

const EmblaCarousel: React.FC<PropType> = ({
  slides,
  options,
  handArraySwitch,
}) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: false }),
  ]);

  const timerId = useRef<NodeJS.Timeout | null>(null);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

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

  const toggleAutoplay = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    const playOrStop = autoScroll.isPlaying()
      ? autoScroll.stop
      : autoScroll.play;
    playOrStop();
  }, [emblaApi]);

  useEffect(() => {
    const arrayLength = slides.length;
    const timeToSwitch = arrayLength * 1000 * 2; // 2 seconds per slide

    timerId.current = setTimeout(() => {
      handArraySwitch();
    }, timeToSwitch);

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
        timerId.current = null;
      }
    };
  }, [handArraySwitch, slides]);

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;

    if (!autoScroll) return;

    autoScroll.play();

    emblaApi
      .on("pointerDown", () => {
        if (timerId.current) {
          clearTimeout(timerId.current);
          timerId.current = null;
        }
      })
      .on("pointerUp", () => {
        console.log("pointerUp");
        timerId.current = setTimeout(() => {
          if (!autoScroll.isPlaying()) {
            autoScroll.play();
          }
        }, 3000); // 3 seconds delay
      });

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
        timerId.current = null;
        emblaApi?.destroy();
      }
    };
  }, [emblaApi, handArraySwitch, slides]);

  return (
    <div ref={divRef} className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item) => {
            const imgSrc = getStrapiMedia(item.media.data.attributes.url);
            return (
              <div className="embla__slide" key={item.id}>
                <div className="embla__slide__number">
                  <Link
                    href={item.url ?? "/"}
                    target={item.newTab ? "_self" : "_blank"}
                  >
                    {imgSrc && (
                      <img
                        src={imgSrc}
                        alt="our client logo"
                        className="object-contain w-full h-full p-6 max-h-40"
                      />
                    )}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton
            onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={() => onButtonAutoplayClick(onNextButtonClick)}
            disabled={nextBtnDisabled}
          />
        </div>

        <button className="embla__play" onClick={toggleAutoplay} type="button">
          {/* {isPlaying ? "Stop" : "Start"} */}
        </button>
      </div>
    </div>
  );
};

export default EmblaCarousel;
