"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import classNames from "classnames";
import { FC, useState } from "react";
import { IoMdAdd } from "react-icons/io";

interface ServiceDisclosureProps {
  data: {
    id: number;
    title: string;
    description: string;
  }[];
  fontColor: "light" | "dark" | undefined;
}

const ServiceDisclosure: FC<ServiceDisclosureProps> = ({ data, fontColor }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const togglePanel = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const height = data.length * 80;

  return (
    <div
      className={classNames(
        "flex flex-col md:justify-center h-full md:pl-10 md:pr-28 px-10 py-5"
      )}
    >
      <div
        style={{
          height: `${height}px`,
        }}
      >
        {data.map((service, index) => {
          return (
            <Disclosure
              as="div"
              className={classNames(
                fontColor &&
                  fontColor === "light" &&
                  "text-gray-50 border-gray-50",
                fontColor &&
                  fontColor === "dark" &&
                  "text-gray-950 border-gray-950",
                !fontColor && "text-gray-950 border-gray-950",
                "md:p-6 px-2 py-3 border-b group"
              )}
              key={service.id}
              defaultOpen={false}
            >
              {({ open }) => (
                <span key={service.id + index}>
                  <DisclosureButton
                    onClick={() => togglePanel(index)}
                    className="flex justify-between w-full hover:border-gray-950 focus:border-gray-950 focus:outline-none"
                  >
                    <h3 className="flex gap-4 text-base font-bold truncate md:items-center md:text-xl">
                      <IoMdAdd
                        className={classNames(
                          openIndex === index && "rotate-45",
                          "w-7 h-7 transform transition-transform"
                        )}
                      />
                      {service.title}
                    </h3>
                  </DisclosureButton>
                  <Transition
                    show={openIndex === index}
                    enter="transition-all duration-300"
                    enterFrom="transform opacity-0 max-h-0"
                    enterTo="transform opacity-100 max-h-56"
                    leave="transition-all duration-300"
                    leaveFrom="transform opacity-100 max-h-56"
                    leaveTo="transform opacity-0 max-h-0"
                  >
                    <DisclosurePanel className="text-sm">
                      <div className="pt-3 md:pt-6">
                        <p className="text-sm font-medium md:text-base">
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
};

export default ServiceDisclosure;