"use client";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import { createElement } from "react";

interface RichTextPostProps {
  data: {
    post: BlocksContent;
  };
}

const RichTextPost: React.FC<RichTextPostProps> = ({ data }) => {
  console.log(data);
  return (
    <div className="container mx-auto py-14">
      <BlocksRenderer
        content={data.post}
        blocks={{
          paragraph: ({ children }) => <p className="text-base">{children}</p>,
          heading: ({ children, level }) => {
            const headingLevels = {
              1: "text-4xl",
              2: "text-3xl",
              3: "text-2xl",
              4: "text-xl",
              5: "text-lg",
              6: "text-base",
            };
            const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
            const headingClass = headingLevels[level] || "text-4xl";
            return createElement(
              HeadingTag,
              { className: headingClass },
              children
            );
          },
          link: ({ children, url }) => (
            <a
              className="text-[#5b19c4] font-bold underline underline-offset-4 "
              href={url}
              target="_blank"
            >
              {children}
            </a>
          ),
          list: ({ children, format }) => {
            return format === "unordered" ? (
              <ul className="pl-6 list-disc">{children}</ul>
            ) : (
              <ol className="pl-6 list-decimal">{children}</ol>
            );
          },
          "list-item": (elem) => {
            const { level, children } = elem as {
              level: string;
              children: React.ReactNode;
            };
            const indentation = {
              1: "pl-0",
              2: "pl-4",
              3: "pl-8",
              4: "pl-12",
              5: "pl-16",
              6: "pl-20",
            };
            const indentClass =
              indentation[Number(level) as keyof typeof indentation] || "pl-0";
            return <li className={indentClass}>{children}</li>;
          },
          quote: ({ children }) => (
            <blockquote className="pl-4 border-l-4 border-gray-300">
              {children}
            </blockquote>
          ),
        }}
        modifiers={{
          bold: ({ children }) => <strong>{children}</strong>,
          italic: ({ children }) => <span className="italic">{children}</span>,
          underline: ({ children }) => (
            <span className="underline">{children}</span>
          ),
        }}
      />
    </div>
  );
};

export default RichTextPost;
