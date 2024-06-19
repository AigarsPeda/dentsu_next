"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import classNames from "classnames";
import { createElement, useState } from "react";
import { IoMdAdd } from "react-icons/io";

interface VacanciesProps {
  data: {
    id: number;
    vacancies: {
      id: number;
      vacancyName: string;
      buttonTitle: string;
      vacancyDescription: BlocksContent;
    }[];
  };
}

export default function Vacancies({ data }: VacanciesProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const togglePanel = (index: number) => {
    if (openIndex === null) {
      setOpenIndex(index);
      return;
    }

    if (openIndex === index) {
      setOpenIndex(null);
      return;
    }

    if (openIndex !== index) {
      setOpenIndex(null);
      setTimeout(() => {
        setOpenIndex(index);
      }, 300);
    }
  };

  // const height = data.length * 80;

  return (
    <div
      className={classNames(
        "flex flex-col md:justify-center h-full md:pl-10 md:pr-28 px-10 py-5"
      )}
    >
      <div
        className="min-h-[20rem] px-10 py-5 "
        // style={{
        //   height: `${height}px`,
        // }}
      >
        {data.vacancies.map((vacancy, index) => {
          return (
            <Disclosure
              as="div"
              className={classNames(
                "text-gray-950 border-gray-950",
                "md:p-4 px-2 py-3 border-b group"
              )}
              key={vacancy.id}
              defaultOpen={false}
            >
              {({ open }) => (
                <span key={vacancy.id + index}>
                  <DisclosureButton
                    onClick={() => togglePanel(index)}
                    className="flex w-full gap-3 hover:border-gray-950 focus:border-gray-950 focus:outline-none"
                  >
                    <IoMdAdd
                      className={classNames(
                        openIndex === index && "rotate-45",
                        "w-7 h-7 transform transition-transform"
                      )}
                    />
                    <h3 className="flex gap-4 text-base font-bold truncate md:items-center md:text-xl">
                      {vacancy.vacancyName}
                    </h3>
                  </DisclosureButton>
                  <Transition
                    show={openIndex === index}
                    enter="transition-all duration-500"
                    enterFrom="transform opacity-0 max-h-0"
                    enterTo="transform opacity-100 max-h-screen"
                    leave="transition-all duration-300"
                    leaveFrom="transform opacity-100 max-h-72 overflow-hidden"
                    leaveTo="transform opacity-0 max-h-0 overflow-hidden"
                  >
                    <DisclosurePanel className="text-sm">
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
                          quote: ({ children }) => (
                            <blockquote className="pl-4 border-l-4 border-gray-300">
                              {children}
                            </blockquote>
                          ),
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
                    </DisclosurePanel>
                  </Transition>
                </span>
              )}
            </Disclosure>
          );
        })}
      </div>
    </div>
  );
}
