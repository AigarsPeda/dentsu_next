"use client";
import { Field, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface MySelectProps extends UseFormRegisterReturn {
  options: { label: string; value: number }[];
}

const MySelect = forwardRef<HTMLSelectElement, MySelectProps>(
  ({ options, ...rest }, ref) => {
    return (
      <div className="w-full max-w-md">
        <Field>
          <div className="relative">
            <Select
              {...rest}
              ref={ref}
              className={clsx(
                "block w-full appearance-none border-none bg-gray-200 py-1.5 px-3 text-sm",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                // Make the text of each option black on Windows
                "*:text-black"
              )}
            >
              {options.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </Select>
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </div>
        </Field>
      </div>
    );
  }
);

export default MySelect;
