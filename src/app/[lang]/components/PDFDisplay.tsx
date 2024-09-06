"use client";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { usePathname } from "next/navigation";
import type { FC } from "react";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Image from "next/image";
import { loader } from "./ServicesHeadlineWithImage";
import { IMAGE_DATA_FOR_BLUR } from "./NewsPostSection";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export interface PdfPostImageProps {
  data: {
    file: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      };
    };
    image: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      };
    };
    description: string;
  };
}

const PDFDisplay: FC<PdfPostImageProps> = ({ data }) => {
  const path = usePathname();
  const pdfUrl = getStrapiMedia(data?.file?.data?.attributes?.url) ?? "";

  const urlLocale = path.split("/")[1] || "en";

  return (
    <div className="container mx-auto ">
      <div className="object-cover w-full md:aspect-[3/1] max-h-[28rem] aspect-[1/1]">
        <Image
          priority
          alt="pdf"
          width={600}
          height={337}
          loader={loader}
          placeholder="blur"
          blurDataURL={IMAGE_DATA_FOR_BLUR}
          src={getStrapiMedia(data.image.data.attributes.url) ?? ""}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div className="pb-8 pt-14">
        <p>{data.description}</p>
      </div>
      <div className="">
        {urlLocale === "en" ? (
          <a
            download
            href={pdfUrl}
            target="_blank"
            className="text-lg"
            rel="noopener noreferrer"
          >
            Download{" "}
            <span className="text-[#5b19c4] underline-offset-4 underline ml-1 font-bold">
              research
            </span>
          </a>
        ) : (
          <a
            download
            href={pdfUrl}
            target="_blank"
            className="text-lg"
            rel="noopener noreferrer"
          >
            Lejuplādēt{" "}
            <span className="text-[#5b19c4] underline-offset-4 underline ml-1 font-bold">
              pētījumu
            </span>
          </a>
        )}
      </div>
    </div>
  );
};

export default PDFDisplay;
