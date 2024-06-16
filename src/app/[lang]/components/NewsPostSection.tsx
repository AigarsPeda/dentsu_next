"use client";
import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
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
      <section className="container grid grid-cols-1 gap-4 py-10 mx-auto md:grid-cols-3 md:px-32">
        {currentData.map((newsPost) => {
          const thumbnail = newsPost.thumbnail.data?.[0]?.attributes;
          const src = thumbnail ? getStrapiMedia(thumbnail.url) : null;

          if (!src) return null;

          return (
            <div key={newsPost.id} className="flex flex-col mt-10">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={src}
                  width={600}
                  height={600}
                  alt={thumbnail.alternativeText || "news post image"}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="mt-4 text-lg font-bold">{newsPost.title}</h3>
                <p className="h-40 mt-2 mb-4 overflow-hidden text-sm custom-clamp-8">
                  {newsPost.description}
                </p>
                <a
                  href={newsPost.url}
                  className="inline-flex items-center justify-center w-auto gap-3 px-4 py-1 mt-4 text-sm bg-gray-950 text-gray-50"
                >
                  {newsPost.buttonTitle}
                  <IoIosArrowForward />
                </a>
              </div>
            </div>
          );
        })}
      </section>
      <div className="flex justify-center pt-6 pb-16">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 ${
              index + 1 === currentPage
                ? "bg-gray-950 text-gray-50"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}
