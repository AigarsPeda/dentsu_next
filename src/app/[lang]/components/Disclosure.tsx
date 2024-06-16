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
      className={classNames("flex flex-col justify-center h-full pl-10 pr-28")}
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
                "p-6 border-b group",
                !fontColor && "text-gray-950 border-gray-950"
              )}
              key={service.id}
              defaultOpen={false}
            >
              {({ open }) => (
                <span key={service.id + index}>
                  <DisclosureButton
                    onClick={() => togglePanel(index)}
                    className="flex items-center justify-between w-full hover:border-gray-950 focus:border-gray-950 focus:outline-none"
                  >
                    <h3 className="flex items-center gap-4 text-xl font-bold">
                      <IoMdAdd
                        className={classNames(
                          openIndex === index && "rotate-45",
                          "w-7 h-7 transform transition-transform"
                        )}
                      />{" "}
                      {service.title}
                    </h3>
                  </DisclosureButton>
                  <Transition
                    show={openIndex === index}
                    enter="transition-all duration-300"
                    enterFrom="transform opacity-0 max-h-0"
                    enterTo="transform opacity-100 md:max-h-[12rem]"
                    leave="transition-all duration-300"
                    leaveFrom="transform opacity-100 md:max-h-[12rem]"
                    leaveTo="transform opacity-0 max-h-0"
                  >
                    <DisclosurePanel className="text-sm">
                      <div className="p-6 pt-3">
                        <p className="text-base font-medium">
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
