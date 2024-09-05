"use client";
import { RenderSocialIcon } from "@/app/[lang]/components/Footer";
import { useEffect, useState } from "react";
import { FacebookShareButton, LinkedinShareButton } from "react-share";

interface SocialShareProps {
  data: {
    id: number;
    title: string;
    facebook: boolean;
    linkedin: boolean;
  };
}

export default function SocialShare({ data }: SocialShareProps) {
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    setLocation(window.location.href);
  }, []);

  return (
    <div className="container flex items-center mx-auto space-x-6 text-gray-700 py-14">
      <p className="text-base">{data.title}</p>

      <div className="flex items-center space-x-3 text-gray-500">
        {data.facebook && (
          <FacebookShareButton url={location}>
            {RenderSocialIcon({ social: "facebook" })}
          </FacebookShareButton>
        )}

        {data.linkedin && (
          <LinkedinShareButton url={location}>
            {RenderSocialIcon({ social: "linkedin" })}
          </LinkedinShareButton>
        )}
      </div>
    </div>
  );
}
