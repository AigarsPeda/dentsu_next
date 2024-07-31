"use client";
import { useEffect, useRef, useState, type FC } from "react";
import classNames from "../utils/classNames";

interface TitleInCircleWithLineProps {
  title: string;
  description: string;
  backgroundImg?: string;
  pictureOnRight?: boolean;
  isBackgroundOff?: boolean;
}

const TitleInCircleWithLine: FC<TitleInCircleWithLineProps> = ({
  title,
  description,
  pictureOnRight,
  isBackgroundOff,
}) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const textRef2 = useRef<HTMLHeadingElement>(null);

  const set50PercentHeightOfWidth = () => {
    if (textRef.current) {
      const width = textRef.current.offsetWidth;
      textRef.current.style.height = `${width}px`;
    }

    if (textRef2.current) {
      const width = textRef2.current.offsetWidth;
      console.log("width", width);
      textRef2.current.style.height = `${width}px`;
    }
  };

  // const set50PercentHeightOfWidth2 = () => {
  //   if (textRef2.current) {
  //     const width = textRef2.current.offsetWidth;
  //     textRef2.current.style.height = `${width}px`;
  //   }
  // }

  useEffect(() => {
    set50PercentHeightOfWidth();
    window.addEventListener("resize", set50PercentHeightOfWidth);
    return () =>
      window.removeEventListener("resize", set50PercentHeightOfWidth);
  }, []);

  return (
    <>
      {pictureOnRight ? (
        <section
          className={classNames(
            !isBackgroundOff && "bg-black",
            "flex items-center justify-start w-full h-full bg-center bg-cover"
          )}
        >
          <div className="flex flex-col justify-start">
            <div className="flex items-center w-full pt-10 pb-10 pr-10 md:pt-0">
              <hr className="w-full h-0.5 my-8 border-0 bg-gray-50"></hr>
              <div
                ref={textRef}
                className="flex items-center justify-center p-2 text-center border rounded-full w-72 md:w-56 border-gray-50"
              >
                <h6 className="text-base font-bold text-white">{title}</h6>
              </div>
            </div>
            <p className="p-10 mx-auto text-base font-medium md:max-w-xl md:pt-14 md:pb-14 md:pl-14 text-gray-50">
              {description}
            </p>
          </div>
        </section>
      ) : (
        <section
          className={classNames(
            !isBackgroundOff && "bg-black",
            "flex items-center justify-end w-full h-full bg-center bg-cover"
          )}
        >
          <div className="flex flex-col justify-end">
            <div className="flex items-center w-full pt-10 pb-10 pl-10 md:pt-0">
              <div
                ref={textRef2}
                className="flex items-center justify-center p-2 text-center border rounded-full md:w-56 w-72 border-gray-50"
              >
                <h6 className="text-base font-bold text-white">{title}</h6>
              </div>
              <hr className="w-full h-0.5 my-8 border-0 bg-gray-50"></hr>
            </div>
            <p className="p-10 mx-auto text-base font-medium md:max-w-xl md:pt-14 md:pb-14 md:pr-14 text-gray-50">
              {description}
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default TitleInCircleWithLine;

// const getTextWidth = (text = "", font = "32px halcom") => {
//   const canvas = document.createElement("canvas");
//   const context = canvas.getContext("2d");
//   if (!context) {
//     return 0;
//   }
//   context.font = font;
//   return context.measureText(text).width;
// };

// const splitText = (text: string, maxLength: number) => {
//   const words = text.split(" ");
//   let lines = [];
//   let currentLine = "";

//   words.forEach((word) => {
//     if ((currentLine + word).length > maxLength) {
//       lines.push(currentLine.trim());
//       currentLine = "";
//     }
//     currentLine += `${word} `;
//   });

//   if (currentLine) {
//     lines.push(currentLine.trim());
//   }

//   return lines;
// };

// const DynamicCircleText = ({ text } = { text: "Hello World" }) => {
//   const [size, setSize] = useState(100);
//   const svgRef = useRef(null);

//   useEffect(() => {
//     const font = "32px";

//     console.log("text", text);
//     console.log("text characters", text.length);
//     const lines = splitText(text, 10);
//     const longestLine = lines.reduce(
//       (a, b) => (a.length > b.length ? a : b),
//       ""
//     );
//     const textWidth = getTextWidth(longestLine, font);
//     const minSize = 100; // Minimum size for the circle
//     const newSize = Math.max(minSize, textWidth + 60 + lines.length * 20);
//     setSize(newSize);
//   }, [text]);

//   const radius = size / 2 - 10;
//   const lines = splitText(text, 10);

//   // Calculate the starting y position based on the number of lines
//   const totalTextHeight = lines.length * 32 * 1.2; // 32 is the font size, 1.2 is the line height
//   const startY = (size - totalTextHeight) / 2 + 30 / 2; // Centering the text block

//   return (
//     <svg
//       ref={svgRef}
//       width={size}
//       height={size}
//       viewBox={`0 0 ${size} ${size}`}
//     >
//       <circle
//         cx={size / 2}
//         cy={size / 2}
//         r={radius}
//         stroke="white"
//         strokeWidth="2"
//         fill="none"
//       />
//       <text
//         fill="white"
//         fontSize="32"
//         x="50%"
//         y={startY}
//         textAnchor="middle"
//         dominantBaseline="central"
//       >
//         {lines.map((line, index) => (
//           <tspan key={index} x="50%" dy={index === 0 ? "0em" : "1.2em"}>
//             {line}
//           </tspan>
//         ))}
//       </text>
//     </svg>
//   );
// };
