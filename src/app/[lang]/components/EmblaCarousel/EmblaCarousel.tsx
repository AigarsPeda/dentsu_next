import type { EmblaOptionsType } from "embla-carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { type FC, useCallback, useEffect, useRef, useState } from "react";
import type { FeaturesType } from "src/app/[lang]/components/ClientSections";
import { getStrapiMedia } from "src/app/[lang]/utils/api-helpers";

// https://www.embla-carousel.com/api/events/
// https://www.embla-carousel.com/examples/predefined/

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

  // const {
  //   prevBtnDisabled,
  //   nextBtnDisabled,
  //   onPrevButtonClick,
  //   onNextButtonClick,
  // } = usePrevNextButtons(emblaApi);

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

  // const toggleAutoplay = useCallback(() => {
  //   const autoScroll = emblaApi?.plugins()?.autoScroll;
  //   if (!autoScroll) return;

  //   const playOrStop = autoScroll.isPlaying()
  //     ? autoScroll.stop
  //     : autoScroll.play;
  //   playOrStop();
  // }, [emblaApi]);

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;

    if (userIsInteracting || !autoScroll) {
      timerId.current = null;
      return;
    }

    autoScroll.play();
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
        }, 3000); // 3 seconds delay
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
          {slides.map((item) => {
            const imgSrc = getStrapiMedia(item.media.data.attributes.url);

            return (
              <div key={item.id} className="embla__slide">
                <div className="embla__slide__number">
                  <Link
                    href={item.url ?? "/"}
                    target={item.newTab ? "_self" : "_blank"}
                  >
                    {imgSrc && (
                      <>
                        <img
                          src={imgSrc}
                          alt="our client logo"
                          className="object-contain h-32 p-8 md:h-32"
                        />
                      </>
                    )}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* <div className="embla__controls">
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
          {isPlaying ? "Stop" : "Start"}
        </button>
      </div> */}
    </div>
  );
};

export default EmblaCarousel;
