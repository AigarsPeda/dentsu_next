interface NewsPostTitleProps {
  data: {
    title: string;
  };
}

export default function NewsPostTitle({ data }: NewsPostTitleProps) {
  return (
    <div className="container mx-auto py-14">
      <h5 className="text-left">{data.title}</h5>
    </div>
  );
}
