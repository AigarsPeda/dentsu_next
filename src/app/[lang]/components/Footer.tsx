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
        <div className="w-full">
          <div className="w-40 h-20 text-xl">
            {footer.legalLinks.map((link: FooterLink) => {
              return <FooterLink key={link.id} {...link} />;
            })}
          </div>
        </div>
        <div className="w-full">
          <p className="pb-5 text-xl text-center">{footer.title}</p>
          <div className="flex justify-center pt-4 pb-12 space-x-5 lg:pt-0 lg:col-end-13">
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
          <p className="text-sm text-center">{footer.copyright}</p>
        </div>
        <div className="flex justify-end w-full h-20">
          <div className="h-20 text-xl w-28">
            {footer.menuLinks.map((link: FooterLink) => {
              return <FooterLink key={link.id} {...link} />;
            })}
          </div>
        </div>
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
        className={`hover:dark:text-violet-400 ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

function RenderSocialIcon({ social }: { social: string | undefined }) {
  switch (social) {
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
