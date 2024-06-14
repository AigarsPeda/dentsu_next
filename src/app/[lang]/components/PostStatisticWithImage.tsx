import { getStrapiMedia } from "../utils/api-helpers";
import classNames from "../utils/classNames";
import TitleInCircleWithLine from "./TitleInCircleWithLine";

interface MediaType {
  id: number;
  attributes: {
    url: string;
    width: number;
    height: number;
    caption: null | string;
    alternativeText: null | string;
  };
}

interface Statistic {
  id: number;
  statistic: string;
  description: string;
}

interface PostStatisticWithImageProps {
  data: {
    id: number;
    feature: {
      id: number;
      title: string;
      description: string;
      statisticOnRight: boolean;
      media: {
        data: MediaType[];
      };
    };
    statistic: Statistic[];
  };
}

export default function PostStatisticWithImage({
  data,
}: PostStatisticWithImageProps) {
  const imgUrl = getStrapiMedia(data.feature.media.data[0]?.attributes.url);

  console.log("data.feature.statisticOnRight", data.feature.statisticOnRight);

  return (
    <section
      className={classNames(
        data.feature.statisticOnRight ? "flex-row-reverse" : "flex-row",
        "md:flex w-full h-full md:pt-12 pb-5 bg-center bg-cover"
      )}
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <TitleInCircleWithLine
        isBackgroundOff
        title={data.feature.title}
        description={data.feature.description}
        pictureOnRight={data.feature.statisticOnRight}
      />

      <div className="w-full pt-3">
        <div
          className={classNames(
            data.feature.statisticOnRight
              ? "md:justify-end md:pr-14"
              : "md:pl-14 md:justify-start",
            "md:pt-14 md:pb-14 flex justify-center"
          )}
        >
          <div>
            {data.statistic.map((statistic, index) => {
              return (
                <div key={index} className="pb-4 text-white">
                  <p className="text-6xl font-bold">{statistic.statistic}</p>
                  <p className="text-base font-medium">
                    {statistic.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
