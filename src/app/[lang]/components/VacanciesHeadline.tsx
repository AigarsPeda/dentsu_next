interface VacanciesHeadlineProps {
  data: {
    headline: string;
    headline2: string;
    headline3: string;
    mainHeadline: string;
  };
}

export default function VacanciesHeadline({ data }: VacanciesHeadlineProps) {
  return (
    <div className="relative">
      <div className="md:absolute py-10 bg-black text-gray-50 max-w-[50rem] lg:w-[52rem] right-[54%] transform bottom-[45%]">
        <div className="container flex px-10 md:justify-end">
          <div className="max-w-[23.5rem]">
            <h1 className="text-2xl font-bold text-left md:text-3xl">
              {data.mainHeadline}
            </h1>
          </div>
        </div>
      </div>
      <div className="container grid grid-cols-1 gap-10 py-10 mx-auto md:grid-cols-2">
        <div className="md:col-start-2">
          <p className="text-base">{data.headline}</p>
        </div>
        <div>
          <p className="text-base">{data.headline2}</p>
        </div>
        <div>
          <p className="text-base">{data.headline3}</p>
        </div>
      </div>
    </div>
  );
}
