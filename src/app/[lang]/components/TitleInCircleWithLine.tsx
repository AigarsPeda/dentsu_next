import type { FC } from "react";
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
  return (
    <>
      {pictureOnRight ? (
        <section
          className={classNames(
            !isBackgroundOff && "bg-black",
            "flex items-center justify-start w-full h-full bg-center bg-cover"
          )}
        >
          <div className="flex flex-col justify-start ">
            <div className="flex items-center w-full pt-10 pb-10 pr-10 md:pt-0">
              <hr className="w-full h-0.5 my-8 border-0 bg-gray-50"></hr>
              <div className="flex items-center justify-center h-40 border rounded-full w-72 md:w-56 border-gray-50">
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
              <div className="flex items-center justify-center h-40 border rounded-full md:w-56 w-72 border-gray-50">
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
