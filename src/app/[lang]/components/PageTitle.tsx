interface PageTitleProps {
  data: {
    title: string;
  };
}

export default function PageTitle({ data }: PageTitleProps) {
  return (
    <div className="container pt-6 pb-4 mx-auto md:pt-12">
      <h5 className="text-center">{data.title}</h5>
    </div>
  );
}
