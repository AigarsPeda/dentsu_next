import classNames from "@/app/[lang]/utils/classNames";

interface InfoBlockProps {
  data: {
    title: string;
    description: string;
    description_2: string | null;
    description_3: string | null;
  };
}

// md:py-20 py-14

export default function InfoBlock({ data }: InfoBlockProps) {
  return (
    <div className="container py-20 mx-auto">
      {data.title && data.title.length > 0 && (
        <h2
          className={classNames(
            data.description || data.description_2 || data.description_3
              ? "pb-6"
              : "pb-10",
            "font-bold"
          )}
        >
          {data.title}
        </h2>
      )}
      <div className="max-w-4xl text-xl md:text-2xl">
        {data.description && (
          <p className={classNames(data.description_2 && "pb-5 lg:pb-6")}>
            {data.description}
          </p>
        )}
        {data.description_2 && (
          <p className={classNames(data.description_3 && "pb-5 lg:pb-6")}>
            {data.description_2}
          </p>
        )}
        {data.description_3 && <p>{data.description_3}</p>}
      </div>
    </div>
  );
}
