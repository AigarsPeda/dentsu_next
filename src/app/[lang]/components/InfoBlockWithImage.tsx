import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import Image from "next/image";

type PictureType = {
  id: string;
  attributes: {
    url: string;
    width: number;
    height: number;
    caption: string | null;
    alternativeText: string | null;
  };
};

type PictureDataType = {
  data: PictureType[];
};

interface InfoBlockWithImageProps {
  data: {
    description: string;
    picture: PictureDataType;
  };
}

export default function InfoBlockWithImage({ data }: InfoBlockWithImageProps) {
  const imgUrl = getStrapiMedia(data.picture.data[0]?.attributes.url);

  return (
    <div className="relative overflow-hidden h-[1150px] w-screen">
      <div className="w-full absolute h-[1000px] right-[40%] pb-10">
        {imgUrl && (
          <Image
            src={imgUrl}
            width={2000}
            height={2000}
            className="w-full h-full"
            alt={"none provided"}
            style={{
              width: "100%",
            }}
          />
        )}
      </div>
      <div className="absolute bottom-0 right-0 p-24 bg-gray-950 w-[1080px] h-[480px]">
        <p className="max-w-xl text-5xl font-normal leading-tight text-white">
          {data.description}
        </p>
      </div>
    </div>
  );
}
