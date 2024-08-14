"use client";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { Document } from "react-pdf";

interface PostImageProps {
  data: {
    file: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      };
    };
  };
}

export default function PDFDisplay({ data }: PostImageProps) {
  const pdfUrl = getStrapiMedia(data.file.data.attributes.url) ?? "";

  console.log("pdfUrl ???", pdfUrl);

  return (
    <div className="container py-3 mx-auto h-96">
      <object data={pdfUrl} type="application/pdf" width="100%" height="100%">
        <p>
          Your browser does not support PDFs. Please download the PDF to view
          it:
          <a className="ml-2 text-blue-500 underline" href={pdfUrl}>
            Download PDF
          </a>
        </p>
      </object>
    </div>
  );
}
