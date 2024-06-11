interface PageTitleProps {
  data: {
    title: string;
  };
}

export default function PageTitle({ data }: PageTitleProps) {
  return (
    <div className="container pt-6 pb-6 mx-auto md:pt-12">
      <p className="text-3xl text-center md:text-5xl">{data.title}</p>
    </div>
  );
}
