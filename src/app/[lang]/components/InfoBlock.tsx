import classNames from "@/app/[lang]/utils/classNames";

interface InfoBlockProps {
  data: {
    title: string;
    description: string;
    description_2: string | null;
    description_3: string | null;
  };
}

export default function InfoBlock({ data }: InfoBlockProps) {
  return (
    <div className="container mx-auto lg:pb-20 py-9 lg:pt-20 lg:px-24">
      <h2 className="lg:pb-16 pb-4 text-[2.4rem] font-medium lg:text-7xl">
        {data.title}
      </h2>
      <div className="max-w-4xl text-[0.85em] md:text-2xl">
        <p className="pb-5 lg:pb-8">{data.description}</p>
        {data.description_2 && (
          <p className={classNames(data.description_3 && "pb-5 lg:pb-8")}>
            {data.description_2}
          </p>
        )}
        {data.description_3 && <p>{data.description_3}</p>}
      </div>
    </div>
  );
}
