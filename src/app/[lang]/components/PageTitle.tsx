interface PageTitleProps {
  data: {
    title: string;
  };
}

export default function PageTitle({ data }: PageTitleProps) {
  return (
    <div className="container pb-0 mx-auto py-14">
      <h5 className="text-center">{data.title}</h5>
    </div>
  );
}
