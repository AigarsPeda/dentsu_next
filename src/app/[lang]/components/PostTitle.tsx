interface PostTitleProps {
  data: {
    title: string;
  };
}

export default function PostTitle({ data }: PostTitleProps) {
  return (
    <div className="bg-gray-300 post-title">
      <div className="container py-6 mx-auto md:py-12">
        <h5>{data.title}</h5>
      </div>
    </div>
  );
}
