import HomeIcon from "@/app/[lang]/components/icons/HomeIcon";
import Image from "next/image";
import Link from "next/link";

export default function Logo({
  src,
  children,
}: {
  src: string | null;
  children?: React.ReactNode;
}) {
  return (
    <Link href="/" aria-label="Back to homepage" className="flex items-end">
      {src && (
        <img
          src={src}
          alt="logo"
          className="object-contain w-[105px] h-[22px]"
        />
      )}
      <div className="ml-2">{children}</div>
      <div>
        <HomeIcon className="w-5 h-5" />
      </div>
    </Link>
  );
}
