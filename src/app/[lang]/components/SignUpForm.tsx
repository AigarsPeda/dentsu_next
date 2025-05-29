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

  const headerImage =
    data.Header.Image.data.length > 0
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
    <div className="max-w-lg mx-auto my-8 p-8 bg-white rounded-lg shadow">
      {imageUrl && (
        <img
          src={imageUrl}
          width={headerImage?.width}
          height={headerImage?.height}
          alt={headerImage?.alternativeText || ""}
          className="w-full mb-6 rounded"
        />
      )}
      <h2 className="text-2xl font-bold text-center mb-8">
        {data.Header.Title}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {data.Field.map((field) => (
          <div key={field.id}>
            <label className="block text-sm mb-1">
              {field.Label}
              {field.Required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {field.Type === "textArea" ? (
              <textarea
                className="w-full px-4 py-2 border rounded bg-gray-100"
                {...register(field.Label, {
                  required: field.Required ? "This field is required" : false,
                })}
              />
            ) : (
              <input
                type={field.Type === "email" ? "email" : "text"}
                className="w-full px-4 py-2 border rounded bg-gray-100"
                {...register(field.Label, {
                  required: field.Required ? "This field is required" : false,
                })}
              />
            )}
            {formState.errors[field.Label] && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors[field.Label]?.message}
              </p>
            )}
          </div>
        ))}
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
      </form>
    </div>
  );
}
