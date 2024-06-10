interface PageTitleProps {
  data: {
    title: string;
  };
}

export default function PageTitle({ data }: PageTitleProps) {
  return (
    <div className="container pt-12 mx-auto">
      <p className="text-5xl text-center">{data.title}</p>
    </div>
  );
}
