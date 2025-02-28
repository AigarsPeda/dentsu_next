"use client";
import classNames from "@/app/[lang]/utils/classNames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { PiGlobeThin } from "react-icons/pi";
import {
  RiFacebookCircleFill,
  RiInstagramLine,
  RiLinkedinBoxFill,
} from "react-icons/ri";
import GlobeIcon from "./icons/GlobeIcon";
import TikTokIcon from "./icons/TikTokIcon";

interface FooterLink {
  id: number;
  url: string;
  text: string;
  newTab: boolean;
  social?: string;
}

interface Footer {
  id: number;
  title: string;
  copyright: string;
  menuLinks: FooterLink[];
  legalLinks: FooterLink[];
  socialLinks: FooterLink[];
}

export default function Footer({ footer }: { footer: Footer }) {
  return (
    <footer className="py-6 bg-dentsu-primary text-gray-50">
      <div className="container grid grid-cols-1 gap-4 mx-auto lg:grid-cols-3">
        <div className="flex w-full">
          <div className="mx-auto text-center md:w-40 lg:mx-0 lg:text-left">
            {footer.legalLinks.map((link: FooterLink) => {
              return <FooterLink key={link.id} {...link} />;
            })}
          </div>
        </div>
        <div className="w-full">
          <p className="text-base text-center lg:pb-5">{footer.title}</p>
          <div className="flex justify-center pt-4 space-x-2 lg:space-x-5 lg:pb-6 lg:pt-0 lg:col-end-13">
            {footer.socialLinks.map((link: FooterLink) => {
              return (
                <a
                  key={link.id}
                  href={link.url}
                  title={link.text}
                  rel="noopener noreferrer"
                  target={link.newTab ? "_blank" : "_self"}
                  className="flex items-center justify-center rounded-full text-gray-50"
                >
                  <RenderSocialIcon social={link.social} />
                </a>
              );
            })}
          </div>
          <p className="hidden text-sm text-center lg:block">
            {footer.copyright}
          </p>
        </div>
        <div className="flex justify-center w-full lg:justify-end">
          <ul className="flex flex-col items-center md:items-end">
            {footer.menuLinks.map((link: FooterLink) => {
              return <FooterLink key={link.id} {...link} />;
            })}
          </ul>
        </div>
        <p className="block text-sm text-center md:hidden">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}

function FooterLink({ url, text, newTab }: FooterLink) {
  const path = usePathname();
  const urlLocale = path.split("/")[1] || "en";

  return (
    <li className="flex">
      <Link
        prefetch={true}
        href={`/${urlLocale}/${url}`}
        target={newTab ? "_blank" : "_self"}
        className={classNames(
          path === url && "text-gray-100 hover:text-gray-100",
          "text-base leading-7 text-gray-50 transition-all hover:text-dentsu-navigation-hover"
        )}
      >
        {text}
      </Link>
    </li>
  );
}

export function RenderSocialIcon({ social }: { social: string | undefined }) {
  const s = social?.toUpperCase();

  switch (s) {
    case "WEBSITE":
      return (
        <GlobeIcon className="w-8 h-8 transition-all hover:fill-dentsu-navigation-hover fill-white" />
      );
    case "TWITTER":
      return (
        <AiFillTwitterCircle className="w-10 h-10 transition-all hover:fill-dentsu-navigation-hover" />
      );
    case "YOUTUBE":
      return (
        <AiFillYoutube className="w-10 h-10 transition-all hover:fill-dentsu-navigation-hover" />
      );
    case "DISCORD":
      return (
        <FaDiscord className="w-10 h-10 transition-all hover:fill-dentsu-navigation-hover" />
      );
    case "FACEBOOK":
      return (
        <RiFacebookCircleFill className="w-10 h-10 transition-all hover:fill-dentsu-navigation-hover" />
      );
    case "INSTAGRAM":
      return (
        <RiInstagramLine className="w-10 h-10 transition-all hover:fill-dentsu-navigation-hover" />
      );
    case "LINKEDIN":
      return (
        <RiLinkedinBoxFill className="w-10 h-10 transition-all hover:fill-dentsu-navigation-hover" />
      );

    case "TIKTOK":
      return (
        <TikTokIcon className="w-[1.9rem] h-[1.9rem] fill-[#fff] transition-all hover:fill-dentsu-navigation-hover" />
      );
    default:
      return (
        <PiGlobeThin className="w-10 h-10 transition-all hover:fill-dentsu-navigation-hover" />
      );
  }
}
