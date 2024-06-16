interface NewsPostTitleProps {
  data: {
    title: string;
  };
}

export default function NewsPostTitle({ data }: NewsPostTitleProps) {
  return (
    <div className="container py-10 mx-auto">
      <h1 className="text-5xl font-bold text-left">{data.title}</h1>
    </div>
  );
}
