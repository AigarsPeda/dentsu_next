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
    <div className="container px-10 mx-auto lg:pb-20 py-9 lg:py-20 lg:px-60">
      <h2 className="lg:pb-16 pb-4 text-[2.4rem] font-medium lg:text-8xl">
        {data.title}
      </h2>
      <div className="max-w-4xl text-[0.85em] lg:text-2xl">
        <p className="pb-5 lg:pb-8">{data.description}</p>
        {data.description_2 && (
          <p className="pb-5 lg:pb-8">{data.description_2}</p>
        )}
        {data.description_3 && <p>{data.description_3}</p>}
      </div>
    </div>
  );
}
