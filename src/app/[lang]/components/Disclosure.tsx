"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import classNames from "classnames";
import { motion, useAnimation } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useInView } from "react-intersection-observer";

interface ServiceDisclosureProps {
  data: {
    id: number;
    title: string;
    description: string;
  }[];
  isAnimateOn?: boolean;
  openIndex: number | null;
  togglePanel: (index: number) => void;
  fontColor: "light" | "dark" | undefined;
}

const ServiceDisclosure: FC<ServiceDisclosureProps> = ({
  data,
  openIndex,
  fontColor,
  togglePanel,
  isAnimateOn,
}) => {
  const controlsArray = data.map(() => useAnimation());
  const refsArray = data.map(() =>
    useInView({ threshold: 0.05, triggerOnce: true })
  );

  // Trigger animations for each item individually
  useEffect(() => {
    refsArray.forEach(({ inView }, index) => {
      if (inView && isAnimateOn) {
        controlsArray[index].start("visible");
      }
    });
  }, [refsArray.map((ref) => ref.inView), controlsArray, isAnimateOn]);

  const truncateText = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text;
  };

  const itemVariants = (index: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: index * 0.2 }, // Add delay based on index
    },
  });

  return (
    <div
      className={classNames(
        "flex flex-col justify-center md:h-[55rem] min-h-[30rem] md:pl-10 px-10 py-5 w-full",
        {
          "text-gray-50": fontColor === "light",
          "text-black": fontColor === "dark" || !fontColor,
        }
      )}
    >
      {data.map((service, index) => (
        <motion.div
          key={service.id}
          ref={refsArray[index].ref}
          animate={controlsArray[index]}
          initial={isAnimateOn ? "hidden" : "visible"}
          variants={itemVariants(index)} // Pass index to calculate delay
          className={classNames("md:p-4 px-2 py-3 border-b group", {
            "border-gray-50": fontColor === "light",
            "border-black": fontColor === "dark" || !fontColor,
          })}
        >
          <Disclosure>
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
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceDisclosure;
