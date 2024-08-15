"use client";

import { FC } from "react";
import dynamic from "next/dynamic";

const PDFDisplay = dynamic(() => import("./PDFDisplay"), { ssr: false });

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

const DynamicPdf: FC<PostImageProps> = ({ data }) => {
  return <PDFDisplay data={data} />;
};

export default DynamicPdf;
