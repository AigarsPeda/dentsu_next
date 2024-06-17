"use client";
import { MapComponent } from "@/app/[lang]/components/Map";
import MySelect from "@/app/[lang]/components/Select";
import { MapProvider } from "@/app/[lang]/utils/map-provider";
import { sendEmail } from "@/app/[lang]/utils/send-email";
import { SubmitHandler, useForm } from "react-hook-form";

interface ContactsProps {
  data: {
    id: number;
    title: string;
    email: string;
    address: string;
    workingTime: string;
    phoneNumber: string;
    leadFormEmail: string;
    companyToContact: { id: number; companyTitle: string }[];
  };
}

export interface IFormInput {
  email: string;
  message: string;
  lastName: string;
  firstName: string;
  companyName: string;
  companyToContact: string;
}

export default function Contacts({ data }: ContactsProps) {
  console.log("Contacts", data);

  const { register, handleSubmit, setValue } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => sendEmail(data);

  return (
    <div className="container grid grid-cols-1 gap-10 py-10 mx-auto md:grid-cols-2">
      <div>
        <div>
          <p className="pb-10 text-sm text-left">{data.title}</p>

          <MapProvider>
            <MapComponent address={data.address} />
          </MapProvider>
        </div>
        <div className="mt-4">
          <p className="text-sm text-left">{data.address}</p>
          <p className="text-sm text-left">{data.phoneNumber}</p>
          <p className="text-sm text-left">{data.email}</p>
          <p className="text-sm text-left">{data.workingTime}</p>
        </div>
      </div>
      <div>
        <form
          className="flex flex-col space-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="firstName" className="flex flex-col text-sm">
            Vardas *
            <input
              className="h-10 bg-gray-200 py-1.5 px-3"
              {...register("firstName")}
            />
          </label>
          <label htmlFor="lastName" className="flex flex-col text-sm">
            Uzvārds *
            <input
              className="h-10 bg-gray-200 py-1.5 px-3"
              {...register("lastName")}
            />
          </label>
          <label htmlFor="companyName" className="flex flex-col text-sm">
            Uzņēmuma nosaukums *
            <input
              className="h-10 bg-gray-200 py-1.5 px-3"
              {...register("companyName")}
            />
          </label>

          <label htmlFor="email" className="flex flex-col text-sm">
            Epasts *
            <input
              className="h-10 bg-gray-200 py-1.5 px-3"
              {...register("email")}
            />
          </label>

          <label htmlFor="companyToContact" className="flex flex-col text-sm">
            Izvēlies zīmolu, ar kuru vēlies sazināties *
            {/* <input
              className="h-10 bg-gray-200 py-1.5 px-3"
              {...register("companyToContact")}
            /> */}
            <MySelect
              options={data.companyToContact.map((company) => ({
                label: company.companyTitle,
                value: company.id,
              }))}
              {...register("companyToContact")}
            />
          </label>

          <label htmlFor="message" className="flex flex-col text-sm">
            Jūsu ziņa *
            <textarea className="h-40 bg-gray-200" {...register("message")} />
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
