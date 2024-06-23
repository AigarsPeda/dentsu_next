"use client";
import { MapComponent } from "@/app/[lang]/components/Map";
import MySelect from "@/app/[lang]/components/Select";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { MapProvider } from "@/app/[lang]/utils/map-provider";
import { sendEmail } from "@/app/[lang]/utils/send-email";
import { usePathname } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
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
    leadFormEmail: string;
    privacyCookiesPolicy: string;
    agreementToReceiveInfo: string;
    companyToContact: { id: number; companyTitle: string }[];
    formFields: { id: number; fieldType: FieldTypeType; fieldName: string }[];
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

export default function Contacts({ data }: ContactsProps) {
  const path = usePathname();
  const urlLocale = path.split("/")[1] || "en";
  const { register, handleSubmit, formState } = useForm<IFormInput>();
  // const onSubmit: SubmitHandler<IFormInput> = (data) => sendEmail(data);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    sendEmail(data);
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

  const { formFields } = data;

  return (
    <div className="container flex flex-col-reverse grid-cols-1 gap-10 px-10 mx-auto md:grid md:grid-cols-2">
      <div>
        <div>
          <p className="pb-10 text-sm text-left">{data.title}</p>

          <MapProvider>
            <MapComponent
              address={data.address}
              wazeIcon={getStrapiMedia(data.wazeIcon.data.attributes.url) ?? ""}
              googleIcon={
                getStrapiMedia(data.googleIcon.data.attributes.url) ?? ""
              }
            />
          </MapProvider>
        </div>

        <div className="pb-10 mt-4">
          <p className="text-sm text-left">{data.address}</p>
          <p className="text-sm text-left">{data.phoneNumber}</p>
          <p className="text-sm text-left">{data.email}</p>
          <p className="text-sm text-left">{data.workingTime}</p>
        </div>
      </div>
      <div>
        <form
          className="flex flex-col p-4 space-y-6 border border-gray-950"
          onSubmit={handleSubmit(onSubmit)}
        >
          {formFields.map((field) => {
            if (field.fieldType === "select") {
              return (
                <label
                  key={field.id}
                  htmlFor={field.fieldName}
                  className="flex flex-col text-sm"
                >
                  {field.fieldName} *
                  <MySelect
                    options={data.companyToContact.map((company) => ({
                      label: company.companyTitle,
                      value: company.id,
                    }))}
                    {...register("companyToContact", {
                      required: "This field is required",
                    })}
                  />
                  <div className="h-2">
                    {formState.errors[field.fieldName] && (
                      <span className="text-xs text-red-500 ">
                        {formState.errors[field.fieldName].message}
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
                  {field.fieldName} *
                  <textarea
                    className="h-40 bg-gray-200"
                    {...register(field.fieldName, {
                      required: "This field is required",
                    })}
                  />
                  <div className="h-2">
                    {formState.errors[field.fieldName] && (
                      <span className="text-xs text-red-500">
                        {formState.errors[field.fieldName].message}
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
                {field.fieldName} *
                <input
                  className="h-10 bg-gray-200 py-1.5 px-3 outline-gray-950"
                  {...register(field.fieldName, {
                    required: "This field is required",
                  })}
                />
                <div className="h-2">
                  {formState.errors[field.fieldName] && (
                    <span className="text-xs text-red-500">
                      {formState.errors[field.fieldName].message}
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
                className="mr-2"
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
                className="mr-2"
              />
              <span>{data.agreementToReceiveInfo}</span>
            </div>
          </div>
          <div className="md:mt-4">
            <button
              className="inline-flex items-center justify-center w-auto gap-3 px-5 py-2 text-sm bg-gray-950 text-gray-50"
              type="submit"
            >
              {data.buttonTitle} <IoIosArrowForward />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
