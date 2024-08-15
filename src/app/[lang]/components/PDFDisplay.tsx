"use client";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { FC, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

//

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

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

const PDFDisplay: FC<PostImageProps> = ({ data }) => {
  const [scale, setScale] = useState(1.0);
  const [error, setError] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const pdfUrl = getStrapiMedia(data?.file?.data?.attributes?.url) ?? "";

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const scaleFactor = containerWidth / 800; // Assuming the PDF's original width is around 800px
        setScale(scaleFactor);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const onDocumentLoadError = () => {
    setError(true);
    setIsLoading(false);
  };

  return (
    <div ref={containerRef} className="container py-3 mx-auto pdf-container">
      {isLoading && (
        <div className="flex items-center justify-center h-96">
          <div className="loader">Loading...</div>
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center h-96">
          <h2>Failed to load PDF. Please try again later.</h2>
          <p>
            Your browser does not support PDFs. Please download the PDF to view
            it:
            <a className="ml-2 text-blue-500 underline" href={pdfUrl}>
              Download PDF
            </a>
          </p>
        </div>
      )}
      <Document
        file={pdfUrl}
        renderMode="canvas"
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
      >
        {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
          <Page
            scale={scale}
            className="pb-10"
            pageNumber={page}
            key={`page_${page}_pdf`}
          />
        ))}
      </Document>
    </div>
  );
};

export default PDFDisplay;
