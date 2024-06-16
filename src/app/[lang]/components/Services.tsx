"use client";

import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import classNames from "@/app/[lang]/utils/classNames";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

interface ServicesProps {
  data: {
    id: number;
    pictureOnRight: string;
    media: {
      data: {
        id: number;
        attributes: {
          url: string;
          width: number;
          height: number;
          caption: string | null;
          alternativeText: string | null;
        };
      }[];
    };
    services: {
      id: number;
      title: string;
      description: string;
    }[];
  };
}

export default function Services({ data }: ServicesProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const imgUrl = getStrapiMedia(data.media.data[0].attributes.url) ?? "";

  const togglePanel = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const height = 300 + data.services.length * 120;
  const topPadding = height / 2 - 212;

  return (
    <div
      style={{ height: `${height}px` }}
      className="grid grid-cols-1 mx-auto md:grid-cols-2 "
    >
      <div
        className="bg-center bg-cover"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${imgUrl})`,
        }}
      ></div>
      <div
        style={{ paddingTop: `${topPadding}px` }}
        className="flex flex-col pr-24"
      >
        {data.services.map((service, index) => {
          return (
            <Disclosure
              as="div"
              className="p-6"
              key={service.id}
              defaultOpen={false}
            >
              {({ open }) => (
                <span key={service.id + index}>
                  <DisclosureButton
                    onClick={() => togglePanel(index)}
                    className="flex items-center justify-between w-full border-b group border-gray-950 hover:border-gray-950 focus:border-gray-950 focus:outline-none"
                  >
                    <h3 className="flex items-center gap-4 text-lg font-bold text-gray-950 ">
                      <IoMdAdd
                        className={classNames(
                          openIndex === index && "rotate-45",
                          "w-5 h-5 transform transition-transform"
                        )}
                      />{" "}
                      {service.title}
                    </h3>
                  </DisclosureButton>
                  <Transition
                    show={openIndex === index}
                    enter="transition-all duration-300"
                    enterFrom="transform opacity-0 max-h-0"
                    enterTo="transform opacity-100 md:max-h-[11rem]"
                    leave="transition-all duration-300"
                    leaveFrom="transform opacity-100 md:max-h-[11rem]"
                    leaveTo="transform opacity-0 max-h-0"
                  >
                    <DisclosurePanel className="text-sm">
                      <div className="p-6">
                        <p className="text-base font-normal text-gray-950">
                          {service.description}
                        </p>
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
