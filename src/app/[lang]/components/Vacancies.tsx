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
import { IoIosArrowDown } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

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

    if (open) {
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

  return (
    <div className={classNames("container md:py-10 py-4 mx-auto")}>
      <div className="min-h-[25rem] md:space-y-6 space-y-4">
        {data.vacancies.map((vacancy, index) => {
          return (
            <Disclosure as="div" key={vacancy.id} defaultOpen={false}>
              {({ open }) => (
                <span key={vacancy.id + index} className="w-fulls">
                  <DisclosureButton
                    onClick={() => togglePanel(index)}
                    className="flex items-center justify-between w-full gap-3 px-4 py-2 bg-gray-200 hover:border-gray-950 focus:border-gray-950 focus:outline-none"
                  >
                    <h3 className="text-xl font-bold truncate md:items-center md:text-3xl">
                      {vacancy.vacancyName}
                    </h3>
                    {open ? (
                      <IoCloseSharp className="w-7 h-7" />
                    ) : (
                      <IoIosArrowDown className="w-7 h-7" />
                    )}
                  </DisclosureButton>
                  <Transition
                    show={open}
                    enter="transition-all duration-500"
                    enterFrom="transform opacity-0 md:max-h-0"
                    enterTo="transform opacity-100 py-2 md:max-h-screen"
                    leave="transition-all duration-300"
                    leaveFrom="transform opacity-100 py-2 md:max-h-screen overflow-hidden"
                    leaveTo="transform opacity-0 md:max-h-0 overflow-hidden"
                  >
                    <DisclosurePanel>
                      <BlocksRenderer
                        key={vacancy.id}
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
                      <div>
                        <button className="flex items-center gap-4 px-4 py-2 mt-4 text-sm bg-gray-950 text-gray-50">
                          {vacancy.buttonTitle}{" "}
                          <IoIosArrowDown className="w-4 h-4 transform -rotate-90" />
                        </button>
                      </div>
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
