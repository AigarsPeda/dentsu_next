import Image from "next/image";

export const DivWithImage = ({
  imgUrl,
  logoUrl,
}: {
  imgUrl: string;
  logoUrl: string;
}) => {
  return (
    <div
      className="relative flex items-center justify-center bg-center bg-cover"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <div className="container relative flex items-center justify-center w-full h-full">
        <div className="flex items-center justify-center">
          <Image
            width={600}
            height={600}
            src={logoUrl}
            alt="our client logo"
            className="object-contain max-w-[170px] lg:h-16 h-12"
          />
        </div>
      </div>
    </div>
  );
};
