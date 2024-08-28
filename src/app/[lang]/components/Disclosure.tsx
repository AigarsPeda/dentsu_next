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
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const truncateText = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text;
  };

  return (
    <div
      className={classNames(
        "flex flex-col justify-center md:h-[55rem] min-h-[28rem] md:pl-10 md:pr-28 px-10 py-10",
        {
          "text-gray-50": fontColor === "light",
          "text-black": fontColor === "dark" || !fontColor,
        }
      )}
    >
      {data.map((service, index) => (
        <Disclosure
          as="div"
          key={service.id}
          className={classNames("md:p-4 px-2 py-3 border-b group", {
            "border-gray-50": fontColor === "light",
            "border-black": fontColor === "dark" || !fontColor,
          })}
        >
          {({ open }) => (
            <>
              <DisclosureButton
                onClick={() => togglePanel(index)}
                className="flex w-full gap-3 hover:border-black focus:border-black focus:outline-none"
              >
                <IoMdAdd
                  className={classNames(
                    openIndex === index && "rotate-45",
                    "w-7 h-7 transform transition-transform"
                  )}
                />
                <div className="flex-1 overflow-hidden">
                  <h3 className="flex gap-4 text-base font-bold truncate md:items-center md:text-xl">
                    {truncateText(service.title, 29)}
                  </h3>
                </div>
              </DisclosureButton>
              <Transition
                show={openIndex === index}
                enter="transition-all duration-500"
                enterFrom="transform opacity-0 max-h-0"
                enterTo="transform opacity-100 max-h-screen"
                leave="transition-all duration-300"
                leaveFrom="transform opacity-100 max-h-screen overflow-hidden"
                leaveTo="transform opacity-0 max-h-0 overflow-hidden"
              >
                <DisclosurePanel className="text-sm">
                  <div className="pt-3">
                    <p className="text-sm font-medium md:text-base">
                      {service.description}
                    </p>
                  </div>
                </DisclosurePanel>
              </Transition>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
};

export default ServiceDisclosure;
