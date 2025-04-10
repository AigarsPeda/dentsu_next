"use client";
import DoubleArrows from "@/app/[lang]/components/icons/DoubleArrows";
import { useSearchParams } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface FeaturesType {
  id: number;
  name: string;
  company: string;
  feedback: string;
  position: string;
  participatingCompany: string | null;
}

interface CustomerFeedbackProps {
  data: { feature: FeaturesType[] };
}

export default function CustomerFeedback({ data }: CustomerFeedbackProps) {
  const params = useSearchParams();
  const search = params?.get("search");

  const filteredData = search
    ? data.feature.filter((item) => {
        // return if match or if not participatingCompany
        return (
          item.participatingCompany
            ?.toLowerCase()
            .includes(search?.toLowerCase() || "") || !item.participatingCompany
        );
      })
    : data.feature;

  if (filteredData.length === 0) {
    return null;
  }

  if (filteredData.length < 3) {
    return (
      <div className="container mx-auto mb-10 mt-14 md:mb-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-10">
          {filteredData.map((item) => {
            return (
              <div key={item.id} className="p-6 bg-black text-gray-50">
                <DoubleArrows className="w-12 h-12 mb-4" />
                <div className="w-full">
                  <div className="mb-8 overflow-hidden md:h-80 md:custom-clamp-10">
                    <p title={item.feedback} className="text-base">
                      {item.feedback}
                    </p>
                  </div>
                  <div className="text-right">
                    <p title={item.name} className="text-base font-bold">
                      {item.name}
                    </p>
                    <p title={item.position} className="text-sm">
                      {item.position}
                    </p>
                    <p title={item.company} className="text-sm">
                      {item.company}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mb-10 mt-14 md:mb-20">
      {/* @ts-ignore */}
      <Slider
        dots={false}
        slidesToShow={3}
        slidesToScroll={1}
        nextArrow={<SampleNextArrow />}
        prevArrow={<SamplePrevArrow />}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,

            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]}
      >
        {filteredData.map((item) => {
          return (
            <div key={item.id} className="pl-2 pr-2 ">
              <div className="p-6 bg-black text-gray-50">
                <DoubleArrows className="w-12 h-12 mb-4" />
                <div className="w-full h-[30rem]">
                  <div className="h-full mb-8 overflow-hidden max-h-[24rem] custom-clamp-16">
                    <p title={item.feedback} className="text-base ">
                      {item.feedback}
                    </p>
                  </div>
                  <div className="text-right">
                    <p title={item.name} className="text-base font-bold">
                      {item.name}
                    </p>
                    <p title={item.position} className="text-sm">
                      {item.position}
                    </p>
                    <p title={item.company} className="text-sm">
                      {item.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

function SampleNextArrow(props: any) {
  const { className, onClick } = props as {
    className: string;
    onClick: () => void;
  };
  return (
    <div className={className} style={{ display: "block" }} onClick={onClick}>
      <IoIosArrowForward className="w-8 h-8 text-black" />
    </div>
  );
}

function SamplePrevArrow(props: unknown) {
  const { className, onClick } = props as {
    className: string;
    onClick: () => void;
  };
  return (
    <div className={className} style={{ display: "block" }} onClick={onClick}>
      <IoIosArrowBack className="w-8 h-8 text-black" />
    </div>
  );
}
