interface PostTitleProps {
  data: {
    title: string;
  };
}

export default function PostTitle({ data }: PostTitleProps) {
  return (
    <div className="bg-gray-300 post-title">
      <div className="container mx-auto py-14">
        <h5>{data.title}</h5>
      </div>
    </div>
  );
}
