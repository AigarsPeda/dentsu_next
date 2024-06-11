interface LargeInfoSectionProps {
  data: {
    info: string;
  };
}

export default function LargeInfoSection({ data }: LargeInfoSectionProps) {
  return (
    <div className="bg-[#e5e5e9]">
      <div className="container mx-auto lg:pb-20 py-9 lg:pt-20">
        <div className="max-w-4xl md:text-2xl">
          <p className="pb-5 text-4xl md:text-5xl lg:pb-8">{data.info}</p>
        </div>
      </div>
    </div>
  );
}
