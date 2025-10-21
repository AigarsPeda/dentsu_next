"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  GrayAccordionTrigger,
} from "@/components/ui/accordion";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import classNames from "classnames";
import { MouseEvent, createElement } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface VacanciesProps {
  data: {
    id: number;
    vacancies: {
      id: number;
      vacancyName: string;
      buttonTitle: string;
      contactEmail?: string;
      vacancyDescription: BlocksContent;
      link?: string;
      external: boolean;
    }[];
  };
}

export default function Vacancies({ data }: VacanciesProps) {
  const handleClick = (
    e: MouseEvent,
    vacancy: {
      contactEmail?: string;
      link?: string;
      external: boolean;
      vacancyName: string;
    }
  ) => {
    e.preventDefault();

    if (vacancy.link) {
      let url = vacancy.link;

      const looksLikeExternalUrl = url.includes(".") && !url.startsWith("/");

      if (
        looksLikeExternalUrl &&
        !url.startsWith("http://") &&
        !url.startsWith("https://")
      ) {
        url = `https://${url}`;
      }

      if (vacancy.external) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = url;
      }
    } else if (vacancy.contactEmail) {
      const subject = `Application for ${vacancy.vacancyName}`;
      const mailtoURL = `mailto:${
        vacancy.contactEmail
      }?subject=${encodeURIComponent(subject)}`;
      window.location.href = mailtoURL;
    }
  };

  return (
    <div className={classNames("container py-14 mx-auto")}>
      <div className="space-y-4 md:space-y-6">
        <Accordion type="multiple">
          {data.vacancies.map((vacancy, i) => {
            return (
              <AccordionItem
                key={`vacancy-${i}-${vacancy.id}`}
                value={`item-${i}-${vacancy.id}`}
                className={classNames("group mb-4")}
              >
                <GrayAccordionTrigger className="flex items-center px-2 py-3 bg-gray-200 md:p-4">
                  <h3 className="flex w-full gap-4 text-xl font-bold truncate md:text-3xl">
                    {vacancy.vacancyName}
                  </h3>
                </GrayAccordionTrigger>
                <AccordionContent>
                  <div className="p-5">
                    <BlocksRenderer
                      content={vacancy.vacancyDescription}
                      blocks={{
                        paragraph: ({ children }) => (
                          <p className="text-base">{children}</p>
                        ),
                        heading: ({ children, level }) => {
                          const headingLevels = {
                            1: "text-4xl",
                            2: "text-3xl",
                            3: "text-2xl",
                            4: "text-xl",
                            5: "text-lg",
                            6: "text-base",
                          };
                          const HeadingTag =
                            `h${level}` as keyof JSX.IntrinsicElements;
                          const headingClass =
                            headingLevels[level] || "text-4xl";
                          return createElement(
                            HeadingTag,
                            { className: headingClass },
                            children
                          );
                        },
                        link: ({ children, url }) => (
                          <a
                            className="text-blue-500 underline"
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
                            indentation[
                              Number(level) as keyof typeof indentation
                            ] || "pl-0";
                          return <li className={indentClass}>{children}</li>;
                        },
                      }}
                      modifiers={{
                        bold: ({ children }) => <strong>{children}</strong>,
                        italic: ({ children }) => (
                          <span className="italic">{children}</span>
                        ),
                        underline: ({ children }) => (
                          <span className="underline">{children}</span>
                        ),
                      }}
                    />
                    <div>
                      <button
                        onClick={(e) => {
                          handleClick(e, vacancy);
                        }}
                        className="flex items-center gap-4 px-4 py-2 mt-4 text-sm text-white transition-all bg-black hover:bg-dentsu-hover"
                      >
                        {vacancy?.buttonTitle || ""}{" "}
                        <IoIosArrowDown className="w-4 h-4 transform -rotate-90" />
                      </button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
