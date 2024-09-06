"use client";
import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import classNames from "classnames";
import * as React from "react";
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex w-full items-center gap-3 hover:border-black focus:border-black focus:outline-none [&[data-state=open]>svg]:rotate-45",
        className
      )}
      {...props}
    >
      <IoMdAdd
        className={classNames(
          // openIndex === index && "rotate-45",
          "w-7 h-7 transform transition-transform"
        )}
      />
      {children}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const GrayAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex w-full justify-between gap-3 hover:border-black focus:border-black focus:outline-none [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <IoIosArrowDown className="transition-transform transform w-7 h-7 group-data-[state=open]:hidden" />
        <IoCloseSharp className="transition-transform transform w-7 h-7 group-data-[state=closed]:hidden" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
GrayAccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  GrayAccordionTrigger,
};
