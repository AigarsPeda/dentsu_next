"use client";
import { MapComponent } from "@/app/[lang]/components/Map";
import MySelect from "@/app/[lang]/components/Select";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { MapProvider } from "@/app/[lang]/utils/map-provider";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

type FieldTypeType = "text" | "email" | "textArea" | "select";

interface ContactsProps {
  data: {
    id: number;
    title: string;
    email: string;
    address: string;
    buttonTitle: string;
    workingTime: string;
    phoneNumber: string;
    contactEmail: string;
    leadFormEmail: string;
    navigationAddress: string;
    privacyCookiesPolicy: string;
    agreementToReceiveInfo: string;
    companyToContact: { id: number; companyTitle: string }[];
    formFields: {
      id: number;
      fieldName: string;
      isRequired: boolean;
      fieldType: FieldTypeType;
    }[];
    googleIcon: {
      data: {
        id: number;
        attributes: {
          url: string;
          width: number;
          height: number;
          caption: null | string;
          alternativeText: null | string;
        };
      };
    };
    wazeIcon: {
      data: {
        id: number;
        attributes: {
          url: string;
          width: number;
          height: number;
          caption: null | string;
          alternativeText: null | string;
        };
      };
    };
  };
}

export interface IFormInput {
  [key: string]: string;
}

type FormSubmitSateType = "idle" | "loading" | "success" | "error";

type EmailResponseTypes = {
  message: string;
  success: "true" | "false";
};

export default function Contacts({ data }: ContactsProps) {
  const path = usePathname();
  const urlLocale = path.split("/")[1] || "en";
  const { reset, register, handleSubmit, formState } = useForm<IFormInput>();
  const [formSubmitStatus, setFormSubmitStatus] =
    useState<FormSubmitSateType>("idle");

  const onSubmit: SubmitHandler<IFormInput> = (formData) => {
    setFormSubmitStatus("loading");

    // before submitting the form, we need to add change obj key to match from camelCase to regular case
    const formDataToSend = Object.keys(formData).reduce((acc, key) => {
      const newKey = key.replace(/([A-Z])/g, " $1").toLowerCase();
      acc[newKey.trim()] = formData[key];
      return acc;
    }, {} as IFormInput);

    // loop over formDataToSend and replace true/false with Yes/No
    Object.keys(formDataToSend).forEach((key) => {
      const k = key as keyof IFormInput;

      if (
        typeof formDataToSend[k] === "boolean" &&
        formDataToSend[k] === true
      ) {
        formDataToSend[k] = "Yes";
      }

      if (
        typeof formDataToSend[k] === "boolean" &&
        formDataToSend[k] === false
      ) {
        formDataToSend[k] = "No";
      }
    });

    fetch(`https://formsubmit.co/ajax/${data.contactEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      // body: JSON.stringify(formData),
      body: JSON.stringify(formDataToSend),
    })
      .then((response) => response.json())
      .then((res: EmailResponseTypes) => {
        if (res.success === "true") {
          setFormSubmitStatus("success");
          reset();
        } else {
          setFormSubmitStatus("error");
        }
      })
      .catch((error) => console.error(error));
  };

  const createLinks = (text: string) => {
    const splitText = text.split(/{{(.*?)}}/);

    if (splitText.length > 1) {
      return (
        <>
          {splitText[0]}
          <a
            className="underline underline-offset-4"
            href={`/${urlLocale}/privacycookiepolicy`}
          >
            {splitText[1]}
          </a>
          {splitText[2]}
        </>
      );
    }

    return <p>{text}</p>;
  };

  const getButtonTitle = () => {
    if (formSubmitStatus === "error") {
      return (
        <button
          className="inline-flex items-center justify-center w-auto gap-3 px-5 py-2 text-sm bg-red-500 text-gray-50"
          type="submit"
          onClick={() => {
            reset();
            setFormSubmitStatus("idle");
          }}
        >
          Error!
        </button>
      );
    }

    if (formSubmitStatus === "success") {
      return (
        <div className="inline-flex items-center justify-center w-auto gap-3 px-5 py-2 text-sm bg-green-500 text-gray-50">
          <span>Success!</span>
          <FaCheck />
        </div>
      );
    }

    if (formSubmitStatus === "loading") {
      return (
        <button className="flex items-center justify-center w-auto py-3 space-x-2 bg-white px-7 dark:invert">
          <span className="sr-only">Loading...</span>
          <div className="h-2.5 w-2.5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2.5 w-2.5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2.5 h-2.5 bg-black rounded-full animate-bounce"></div>
        </button>
      );
    }

    return (
      <button
        className="inline-flex items-center justify-center w-auto gap-3 px-5 py-2 text-sm bg-black hover:bg-dentsu-hover text-gray-50"
        type="submit"
      >
        {data.buttonTitle} <IoIosArrowForward />
      </button>
    );
  };

  const { formFields } = data;

  useEffect(() => {
    if (formSubmitStatus === "success") {
      setTimeout(() => {
        reset();
        setFormSubmitStatus("idle");
      }, 5000);
    }
  }, [formSubmitStatus]);

  return (
    <div className="container flex flex-col-reverse grid-cols-1 gap-10 mx-auto md:px-16 md:grid md:grid-cols-2 md:py-14">
      <div className="flex flex-col justify-between">
        <div>
          <p className="pb-8 text-sm text-left">{data.title}</p>
          <MapProvider>
            <MapComponent
              address={data.address}
              navigationAddress={data.navigationAddress}
              wazeIcon={getStrapiMedia(data.wazeIcon.data.attributes.url) ?? ""}
              googleIcon={
                getStrapiMedia(data.googleIcon.data.attributes.url) ?? ""
              }
            />
          </MapProvider>
        </div>

        <div className="flex items-end pb-10 mt-4 md:pb-0">
          <div>
            <p className="text-sm text-left">{data.address}</p>
            <p className="text-sm text-left">{data.phoneNumber}</p>
            <p className="text-sm text-left">{data.email}</p>
            <p className="text-sm text-left">{data.workingTime}</p>
          </div>
        </div>
      </div>
      <div>
        <form
          className="flex flex-col h-full p-4 space-y-3 border border-black"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)();
          }}
        >
          {formFields.map((field) => {
            const isRequired = field.isRequired;

            if (field.fieldType === "select") {
              return (
                <label
                  key={field.id}
                  htmlFor={field.fieldName}
                  className="flex flex-col text-sm"
                >
                  {field.fieldName} {isRequired && "*"}
                  <MySelect
                    options={data.companyToContact.map((company) => ({
                      value: company.id,
                      label: company.companyTitle,
                    }))}
                    {...register("companyToContact", {
                      ...(isRequired && { required: "This field is required" }),
                    })}
                  />
                  <div className="h-2">
                    {formState.errors[field.fieldName] && (
                      <span className="text-xs text-red-500">
                        {formState.errors[field.fieldName]?.message}
                      </span>
                    )}
                  </div>
                </label>
              );
            }

            if (field.fieldType === "textArea") {
              return (
                <label
                  key={field.id}
                  htmlFor={field.fieldName}
                  className="flex flex-col text-sm"
                >
                  {field.fieldName} {isRequired && "*"}
                  <textarea
                    className="h-40 bg-gray-200 py-1.5 px-3"
                    {...register(field.fieldName, {
                      ...(isRequired && { required: "This field is required" }),
                    })}
                  />
                  <div className="h-2">
                    {formState.errors[field.fieldName] && (
                      <span className="text-xs text-red-500">
                        {formState.errors[field.fieldName]?.message}
                      </span>
                    )}
                  </div>
                </label>
              );
            }

            return (
              <label
                key={field.id}
                htmlFor={field.fieldName}
                className="flex flex-col text-sm"
              >
                {field.fieldName} {isRequired && "*"}
                <input
                  className="h-10 bg-gray-200 py-1.5 px-3 outline-black"
                  {...register(field.fieldName, {
                    ...(isRequired && { required: "This field is required" }),
                  })}
                />
                <div className="h-2">
                  {formState.errors[field.fieldName] && (
                    <span className="text-xs text-red-500">
                      {formState.errors[field.fieldName]?.message}
                    </span>
                  )}
                </div>
              </label>
            );
          })}

          <div>
            <div className="flex items-center text-sm">
              <input
                type="checkbox"
                {...register("privacyCookiesPolicy", {
                  required: "This field is required",
                })}
                className="mr-2 hover:cursor-pointer"
              />
              <span>{createLinks(data.privacyCookiesPolicy)}</span>
            </div>
            <div className="h-2">
              {formState.errors.privacyCookiesPolicy && (
                <span className="text-xs text-red-500">
                  {formState.errors.privacyCookiesPolicy.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center text-sm">
              <input
                type="checkbox"
                {...register("agreementToReceiveInfo")}
                className="mr-2 hover:cursor-pointer"
              />
              <span>{data.agreementToReceiveInfo}</span>
            </div>
          </div>
          <div className="md:mt-4">{getButtonTitle()}</div>
        </form>
      </div>
    </div>
  );
}
