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
    <div className="container px-10 py-20 pb-20 mx-auto lg:px-60">
      <h2 className="pb-16 font-normal text-8xl">{data.title}</h2>
      <div className="max-w-4xl text-xl">
        <p className="pb-8">{data.description}</p>
        {data.description_2 && <p className="pb-8">{data.description_2}</p>}
        {data.description_3 && <p>{data.description_3}</p>}
      </div>
    </div>
  );
}
