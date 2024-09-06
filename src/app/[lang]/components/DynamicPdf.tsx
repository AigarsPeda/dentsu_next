"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
import { PdfPostImageProps } from "./PDFDisplay";

const PDFDisplay = dynamic(() => import("./PDFDisplay"), { ssr: false });

const DynamicPdf: FC<PdfPostImageProps> = ({ data }) => {
  return <PDFDisplay data={data} />;
};

export default DynamicPdf;
