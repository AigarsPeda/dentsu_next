"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import classNames from "classnames";
import { motion, useAnimation } from "framer-motion";
import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface ServiceDisclosureProps {
  isAnimateOn?: boolean;
  openIndex: number | null;
  handleToggle: (index: number) => void;
  fontColor: "light" | "dark" | undefined;
  data: {
    id: number;
    title: string;
    description: string;
  }[];
}

const ServiceDisclosure: FC<ServiceDisclosureProps> = ({
  data,
  openIndex,
  fontColor,
  isAnimateOn,
  handleToggle,
}) => {
  const controlsArray = data.map(() => useAnimation());
  const refsArray = data.map(() =>
    useInView({ threshold: 0.5, triggerOnce: true })
  );

  useEffect(() => {
    if (!isAnimateOn) {
      controlsArray.forEach((control) => control.set("visible"));
      return;
    }

    refsArray.forEach(({ inView }, index) => {
      if (inView && isAnimateOn) {
        controlsArray[index].start("visible");
      } else {
        controlsArray[index].start("hidden");
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
      transition: { duration: 0.5, ease: "easeOut" },
    },
  });
  // md:h-[55rem] min-h-[30rem

  return (
    <div
      className={classNames(
        "flex flex-col justify-center md:min-h-[55rem] min-h-[30rem] md:pl-10 px-10 py-5 pb-14 w-full",
        {
          "text-gray-50": fontColor === "light",
          "text-black": fontColor === "dark" || !fontColor,
        }
      )}
    >
      <Accordion
        type="single"
        collapsible // Ensure only one item can be open
        // value={openIndex !== null ? `item-${openIndex}` : undefined} // Control the open state
      >
        {data.map((service, index) => (
          <motion.div
            key={service.id}
            initial="hidden"
            ref={refsArray[index].ref}
            animate={controlsArray[index]}
            variants={itemVariants(index)}
          >
            <AccordionItem
              value={`item-${index}`}
              className={classNames("md:p-4 px-2 py-3 group", {
                "border-gray-50": fontColor === "light",
                "border-black": fontColor === "dark" || !fontColor,
              })}
            >
              <AccordionTrigger
                className="bg-transparent"
                onClick={() => handleToggle(index)}
              >
                <h3 className="flex gap-4 text-base font-bold truncate md:items-center md:text-xl">
                  {truncateText(service.title, 29)}
                </h3>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-3">
                  <p className="text-sm font-medium md:text-base">
                    {service.description}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  );
};

export default ServiceDisclosure;
