"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";
import { PiGlobeThin } from "react-icons/pi";

import {
  RiFacebookCircleFill,
  RiInstagramLine,
  RiLinkedinBoxFill,
} from "react-icons/ri";
import classNames from "../utils/classNames";

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
          <div className="mx-auto text-xl md:w-40 lg:mx-0">
            {footer.legalLinks.map((link: FooterLink) => {
              return <FooterLink key={link.id} {...link} />;
            })}
          </div>
        </div>
        <div className="w-full">
          <p className="text-xl text-center lg:pb-5">{footer.title}</p>
          <div className="flex justify-center pt-4 space-x-2 lg:space-x-5 lg:pb-12 lg:pt-0 lg:col-end-13">
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
          <div className="flex flex-col items-center text-xl lg:w-28 lg:block">
            {footer.menuLinks.map((link: FooterLink) => {
              return <FooterLink key={link.id} {...link} />;
            })}
          </div>
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

  return (
    <li className="flex">
      <Link
        href={url}
        target={newTab ? "_blank" : "_self"}
        className={classNames(
          path === url && "text-gray-100 hover:text-gray-100",
          "text-[20px] leading-7 text-gray-50 hover:text-gray-200 transition-all"
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
      return <CgWebsite className="w-10 h-10 " />;
    case "TWITTER":
      return <AiFillTwitterCircle className="w-10 h-10 " />;
    case "YOUTUBE":
      return <AiFillYoutube className="w-10 h-10 " />;
    case "DISCORD":
      return <FaDiscord className="w-10 h-10 " />;
    case "FACEBOOK":
      return <RiFacebookCircleFill className="w-10 h-10 " />;
    case "INSTAGRAM":
      return <RiInstagramLine className="w-10 h-10 " />;
    case "LINKEDIN":
      return <RiLinkedinBoxFill className="w-10 h-10 " />;
    default:
      return <PiGlobeThin className="w-10 h-10 " />;
  }
}
