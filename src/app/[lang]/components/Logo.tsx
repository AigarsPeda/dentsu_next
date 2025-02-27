import Link from "next/link";

export default function Logo({
  src,
  href,
  children,
  closeMenu,
}: {
  href: string;
  src: string | null;
  children?: React.ReactNode;
  closeMenu?: () => void;
}) {
  return (
    <Link
      href={href}
      prefetch={true}
      aria-label="Back to homepage"
      className="flex items-end transition-all hover:opacity-70"
      onClick={() => {
        if (closeMenu) {
          closeMenu();
        }
      }}
    >
      {src && (
        <img
          src={src}
          alt="dentu logo"
          className="object-contain w-[105px] h-[22px]"
        />
      )}
      {children && <div className="ml-2">{children}</div>}
      {/* <div>
        <HomeIcon className="w-5 h-5" />
      </div> */}
    </Link>
  );
}
