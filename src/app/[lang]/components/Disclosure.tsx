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

  return (
    <div
      className={classNames(
        "flex flex-col md:justify-center h-full md:pl-10 md:pr-28 px-10 py-5"
      )}
    >
      <div>
        {data.map((service, index) => {
          return (
            <Disclosure
              as="div"
              className={classNames(
                fontColor &&
                  fontColor === "light" &&
                  "text-gray-50 border-gray-50",
                fontColor && fontColor === "dark" && "text-black border-black",
                !fontColor && "text-black border-black",
                "md:p-4 px-2 py-3 border-b group"
              )}
              key={service.id}
              defaultOpen={false}
            >
              {({ open }) => (
                <span key={service.id + index}>
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
                    <h3 className="flex gap-4 text-base font-bold truncate md:items-center md:text-xl">
                      {service.title}
                    </h3>
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
