import TitleInCircleWithLine from "src/app/[lang]/components/TitleInCircleWithLine";
import { getStrapiMedia } from "src/app/[lang]/utils/api-helpers";
import classNames from "src/app/[lang]/utils/classNames";

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
    overlay: number | null;
    statistic: Statistic[];
    feature: {
      id: number;
      title: string;
      description: string;
      statisticOnRight: boolean;
      media: {
        data: MediaType[];
      };
    };
  };
}

export default function PostStatisticWithImage({
  data,
}: PostStatisticWithImageProps) {
  const imgUrl = getStrapiMedia(data.feature.media.data[0]?.attributes.url);

  return (
    <section
      className={classNames(
        data.feature.statisticOnRight ? "flex-row-reverse" : "flex-row",
        "md:flex w-full h-full py-10 bg-center bg-cover md:max-h-[40rem]"
      )}
      style={{
        background: `linear-gradient(
          rgba(0, 0, 0, ${data.overlay ? data.overlay / 100 : 0.01}),
          rgba(0, 0, 0, ${data.overlay ? data.overlay / 100 : 0.01})
        ), url(${imgUrl}) no-repeat center center`,
        backgroundSize: "cover",
      }}
    >
      <TitleInCircleWithLine
        isBackgroundOff
        title={data.feature.title}
        description={data.feature.description}
        pictureOnRight={data.feature.statisticOnRight}
      />

      <div className="w-full">
        <div
          className={classNames(
            data.feature.statisticOnRight
              ? "md:justify-end md:pr-14 md:pl-44 p-10"
              : "md:pl-14 md:justify-start",
            "md:pt-14 md:pb-14 flex justify-center"
          )}
        >
          <div className="flex flex-col justify-center space-y-6">
            {data.statistic.map((statistic, index) => {
              return (
                <div key={index} className="text-white ">
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
