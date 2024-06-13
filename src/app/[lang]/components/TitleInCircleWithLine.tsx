import type { FC } from "react";

interface TitleInCircleWithLineProps {
  title: string;
  description: string;
  pictureOnRight?: boolean;
}

const TitleInCircleWithLine: FC<TitleInCircleWithLineProps> = ({
  title,
  description,
  pictureOnRight,
}) => {
  return (
    <>
      {pictureOnRight ? (
        <div className="flex items-center justify-start w-full h-full bg-gray-950">
          <div className="flex flex-col justify-start">
            <div className="flex items-center w-full">
              <hr className="w-full h-0.5 my-8 border-0 bg-gray-50"></hr>
              <div className="flex items-center justify-center w-56 h-40 border rounded-full border-gray-50">
                <h6 className="text-base font-bold text-white">{title}</h6>
              </div>
            </div>
            <p className="max-w-xl pt-10 pb-10 pl-10 text-base font-medium text-gray-50">
              {description}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-end w-full h-full bg-gray-950">
          <div className="flex flex-col justify-end">
            <div className="flex items-center w-full">
              <div className="flex items-center justify-center w-56 h-40 border rounded-full border-gray-50">
                <h6 className="text-base font-bold text-white">{title}</h6>
              </div>
              <hr className="w-full h-0.5 my-8 border-0 bg-gray-50"></hr>
            </div>
            <p className="max-w-xl pt-10 pb-10 pr-10 text-base font-medium text-gray-50">
              {description}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default TitleInCircleWithLine;
