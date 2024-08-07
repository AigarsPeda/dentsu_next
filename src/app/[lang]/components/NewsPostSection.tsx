"use client";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

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
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const page = searchParams.get("page");
  const totalPages = Math.ceil(data.newsPost.length / ITEMS_PER_PAGE);
  const currentData = data.newsPost.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
      <section className="container grid grid-cols-1 gap-8 pb-10 mx-auto md:grid-cols-3 md:px-16">
        {currentData.map((newsPost) => {
          const thumbnail = newsPost.thumbnail.data?.[0]?.attributes;
          const src = thumbnail ? getStrapiMedia(thumbnail.url) : null;

          if (!src) return null;

          return (
            <div key={newsPost.id} className="flex flex-col mt-4 md:mt-10">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={src}
                  alt={thumbnail.alternativeText || "news post image"}
                  className="object-cover w-full h-full bg-gray-300"
                />
              </div>
              <div>
                <h3 className="mt-4 text-lg font-bold">{newsPost.title}</h3>
                <p className="h-[7.7rem] mt-2 overflow-hidden text-sm custom-clamp-6">
                  {newsPost.description}
                </p>
                <a
                  href={newsPost.url}
                  className="inline-flex items-center justify-center w-auto gap-3 px-4 py-1 text-sm transition-all bg-black hover:bg-dentsu-hover md:mt-2 text-gray-50"
                >
                  {newsPost.buttonTitle}
                  <IoIosArrowForward />
                </a>
              </div>
            </div>
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
