"use client";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { loader } from "./ServicesHeadlineWithImage";
import Link from "next/link";

export const IMAGE_DATA_FOR_BLUR =
  "data:image/bmp;base64,Qk32BAAAAAAAADYAAAAoAAAACAAAAAgAAAABABgAAAAAAMAAAAATCwAAEwsAAAAAAAAAAAAAr5+jpJaUi4JxfHtehIdxioyAenZtUDcixbq4urGrpJ+Nm5uCpaiVra2inpiOeWdR29PO0cvCv72qu7ylx8m5z87EwLqvn4946OPc4t3S1tTB1tfD4uTX6Ofg2tTKva+Z7Obf6eTa5ePT6evb9Pbt9/fz6uXe0si16eDb6uPa7uvd9vfr/v/8/v7/8u/s4NnK4tfV597Y8u7j/f31////////9PPz6OPX39PR5dvW8+7l///4////////9fP16ubb";

const ITEMS_PER_PAGE = 6;

interface NewsPostSectionProps {
  data: {
    newsPost: {
      id: number;
      title: string;
      description: string;
      url: string;
      buttonTitle: string;
      thumbnail: {
        data: {
          id: number;
          attributes: {
            url: string;
            width: number;
            height: number;
            caption: null | string;
            alternativeText: null | string;
          };
        }[];
      };
    }[];
  };
}

export default function NewsPostSection({ data }: NewsPostSectionProps) {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const page = searchParams.get("page");
  const totalPages = Math.ceil(data.newsPost.length / ITEMS_PER_PAGE);
  const currentData = data.newsPost.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const urlLocale = path.split("/")[1] || "en";

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    router.push(`?page=${newPage}`);
  };

  useEffect(() => {
    if (page) {
      setCurrentPage(parseInt(page as string));
    }
  }, [page]);

  return (
    <>
      <section className="container grid grid-cols-1 gap-8 pb-10 mx-auto md:grid-cols-3 md:px-14 mt-14">
        {currentData.map((newsPost) => {
          const thumbnail = newsPost.thumbnail.data?.[0]?.attributes;
          const src = thumbnail ? getStrapiMedia(thumbnail?.url) : null;

          if (!src) return null;

          return (
            <Link
              key={newsPost.id}
              href={`/${urlLocale}/${newsPost.url}`}
              passHref
              className="flex flex-col justify-between mt-4 group"
            >
              <div className="relative overflow-hidden md:aspect-[16/9] aspect-[4/3]">
                <Image
                  fill
                  alt=""
                  src={src}
                  priority
                  loader={loader}
                  placeholder="blur"
                  className="transition-all duration-300 group-hover:scale-105"
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  blurDataURL={IMAGE_DATA_FOR_BLUR}
                />
              </div>
              <div className="h-full max-h-[7.7rem]">
                <h3 className="mt-4 text-lg font-bold">{newsPost.title}</h3>
                <p className="h-full mt-2 overflow-hidden text-sm ">
                  {newsPost.description}
                </p>
              </div>
              <div>
                {/* <a
                  href={`/${urlLocale}/${newsPost.url}`}
                  className="inline-flex items-center justify-center w-auto gap-3 px-4 py-1 text-sm transition-all bg-black hover:bg-dentsu-hover md:mt-2 text-gray-50"
                >
                  {newsPost.buttonTitle}
                  <IoIosArrowForward />
                </a> */}
                <p className="inline-flex items-center justify-center w-auto gap-3 px-4 py-1 text-sm transition-all bg-black hover:bg-dentsu-hover md:mt-2 text-gray-50">
                  {newsPost.buttonTitle}
                  <IoIosArrowForward />
                </p>
              </div>
            </Link>
          );
        })}
      </section>
      {totalPages > 1 && (
        <div className="flex justify-center pt-6 pb-16">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 mx-1 hover:bg-dentsu-hover ${
                index + 1 === currentPage
                  ? "bg-black text-gray-50"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
