"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";

interface SignUpFormProps {
  data: {
    id: number;
    Recipient: string;
    Field: Array<{
      id: number;
      Required: boolean;
      Type: string;
      Label: string;
    }>;
    Subject: string;
    ButtonTitle: string;
    Header: {
      id: number;
      Title: string;
      Image: {
        data: Array<{
          id: number;
          attributes: {
            url: string;
            width: number;
            height: number;
            caption: null | string;
            alternativeText: null | string;
          };
        }>;
      };
    };
  };
}

export interface IFormInput {
  [key: string]: string | boolean;
}

type FormSubmitSateType = "idle" | "loading" | "success" | "error";

export function SignUpForm({ data }: SignUpFormProps) {
  const { register, handleSubmit, reset, formState } = useForm<IFormInput>();
  const [formSubmitStatus, setFormSubmitStatus] =
    useState<FormSubmitSateType>("idle");

  const isImageFieldPresent = data.Header?.Image?.data?.length > 0;

  const headerImage = isImageFieldPresent
    ? data.Header.Image.data[0].attributes
    : null;
  const imageUrl = getStrapiMedia(headerImage?.url || "");

  const onSubmit: SubmitHandler<IFormInput> = (formData) => {
    setFormSubmitStatus("loading");

    // Convert camelCase keys to regular case
    const formDataToSend = Object.keys(formData).reduce((acc, key) => {
      const newKey = key.replace(/([A-Z])/g, " $1").toLowerCase();
      acc[newKey.trim()] = formData[key];
      return acc;
    }, {} as IFormInput);

    // Convert booleans to Yes/No
    Object.keys(formDataToSend).forEach((key) => {
      const k = key as keyof IFormInput;
      if (formDataToSend[k] === true) formDataToSend[k] = "Yes";
      if (formDataToSend[k] === false) formDataToSend[k] = "No";
    });

    // Add Subject if present
    if (data.Subject) {
      formDataToSend.Subject = data.Subject;
    }

    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataToSend),
    })
      .then((response) => response.json())
      .then((res: { success: boolean }) => {
        if (res.success) {
          setFormSubmitStatus("success");
          reset();
        } else {
          setFormSubmitStatus("error");
        }
      })
      .catch(() => setFormSubmitStatus("error"));
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-3 border border-black rounded-lg p-6 bg-white"
      >
        {/* Image and Title INSIDE the form */}
        {isImageFieldPresent && (
          <img
            src={imageUrl || ""}
            width={headerImage?.width}
            height={headerImage?.height}
            alt={headerImage?.alternativeText || ""}
            className="w-full mb-6 rounded"
          />
        )}
        {data?.Header?.Title && (
          <h2 className="text-2xl font-bold text-center mb-8">
            {data.Header.Title}
          </h2>
        )}

        {data.Field.map((field) => (
          <label key={field.id} className="flex flex-col text-sm font-medium">
            <span>
              {field.Label}
              {field.Required && <span className="text-red-500 ml-1">*</span>}
            </span>
            {field.Type === "textArea" ? (
              <textarea
                className="h-32 bg-gray-200 py-1.5 px-3 rounded mt-1 focus:outline-black border-0 focus:ring-1 focus:ring-black focus:ring-offset-2"
                {...register(field.Label, {
                  required: field.Required ? "This field is required" : false,
                })}
              />
            ) : (
              <input
                type={field.Type === "email" ? "email" : "text"}
                className="h-10 bg-gray-200 py-1.5 px-3 rounded mt-1 focus:outline-black border-0 focus:ring-1 focus:ring-black focus:ring-offset-2"
                {...register(field.Label, {
                  required: field.Required ? "This field is required" : false,
                })}
              />
            )}
            <div className="h-2">
              {formState.errors[field.Label] && (
                <span className="text-xs text-red-500">
                  {formState.errors[field.Label]?.message}
                </span>
              )}
            </div>
          </label>
        ))}

        <div className="md:mt-4">
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-semibold rounded hover:bg-gray-800 transition"
            disabled={formSubmitStatus === "loading"}
          >
            {formSubmitStatus === "loading"
              ? "Submitting..."
              : formSubmitStatus === "success"
              ? "Success!"
              : formSubmitStatus === "error"
              ? "Error! Try again"
              : data.ButtonTitle || "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
