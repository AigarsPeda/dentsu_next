interface PageTitleProps {
  data: {
    title: string;
  };
}

export default function PageTitle({ data }: PageTitleProps) {
  return (
    <div className="container py-6 mx-auto md:py-10">
      <h5 className="text-center">{data.title}</h5>
    </div>
  );
}
