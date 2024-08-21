"use client";
import { useLayoutEffect, useRef, useState } from "react";

interface VacanciesHeadlineProps {
  data: {
    headline: string;
    headline2: string;
    headline3: string;
    mainHeadline: string;
  };
}

export default function VacanciesHeadline({ data }: VacanciesHeadlineProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [height, setHeight] = useState(200);

  const updateHeight = () => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  };

  const isEmail = (text: string) => {
    return text.includes("@");
  };

  const isLinkedIn = (text: string) => text.toLowerCase() === "linkedin";

  const createLinks = (text: string) => {
    const splitText = text.split(/({{.*?}})/);

    return (
      <>
        {splitText.map((part, index) => {
          const match = part.match(/{{(.*?)}}/);
          if (match) {
            const content = match[1];

            if (isEmail(content)) {
              return (
                <a
                  key={index}
                  href={`mailto:${content}`}
                  className="font-bold underline underline-offset-4 text-[#5b19c4]"
                >
                  {content}
                </a>
              );
            } else if (isLinkedIn(content)) {
              return (
                <a
                  key={index}
                  target="_blank"
                  href="https://www.linkedin.com/company/dentsulv/"
                  className="font-bold underline underline-offset-4 text-[#5b19c4]"
                >
                  LinkedIn
                </a>
              );
            } else {
              return part; // If not matched, return the original part
            }
          } else {
            return part; // If no match, return the original part
          }
        })}
      </>
    );
  };

  useLayoutEffect(() => {
    updateHeight();

    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <>
      <div className="container relative grid grid-cols-1 gap-10 py-0 mx-auto md:py-14 md:grid-cols-2">
        <div
          className="absolute w-screen h-full bg-black md:z-[1] z-[-1] md:hidden block"
          style={{
            height: `${height}px`,
          }}
        ></div>
        <div className="relative">
          <div
            className="absolute md:right-0 right-0 w-screen h-full bg-black md:z-[1] z-[-1] md:-top-20 hidden md:block"
            style={{
              height: `${height}px`,
            }}
          ></div>
          <div
            ref={ref}
            className="left-0 w-full p-10 pl-0 bg-black md:absolute -top-20 z-[2]"
          >
            <h1 className="text-xl font-bold text-left text-white md:text-3xl">
              {createLinks(data.mainHeadline)}
            </h1>
          </div>
        </div>
        <div>
          <p className="text-base">{createLinks(data.headline)}</p>
        </div>
        <div>
          <p className="text-base">{createLinks(data.headline2)}</p>
        </div>
        <div>
          <p className="text-base">{createLinks(data.headline3)}</p>
        </div>
      </div>
    </>
  );
}
