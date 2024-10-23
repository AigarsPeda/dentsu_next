"use client";
import Logo from "@/app/[lang]/components/Logo";
import type { StrapiLocaleType } from "@/app/[lang]/layout";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Variants, motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, Suspense, useEffect, useState } from "react";

const variants: Variants = {
  hidden: {
    y: "-100%", // Start from above the viewport
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  visible: {
    y: 96, // Slide down into view
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

type NavbarProps = {
  links: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
  availableLocales: StrapiLocaleType[];
};

export default function NavbarContent({
  links,
  logoUrl,
  logoText,
  availableLocales,
}: NavbarProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar
        links={links}
        logoUrl={logoUrl}
        logoText={logoText}
        availableLocales={availableLocales}
      />
    </Suspense>
  );
}

function Navbar({
  links,
  logoUrl,
  logoText,
  availableLocales,
}: {
  links: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
  availableLocales: StrapiLocaleType[];
}) {
  const path = usePathname();
  const controls = useAnimation();
  const params = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const urlLocale = path.split("/")[1] || "en";

  const linksWithLocale = links.map((link) => ({
    ...link,
    locale: urlLocale,
  }));

  const getCurrentLocaleAndReplace = (newLocale: string) => {
    const pathArray = path.split("/");

    if (pathArray.length === 1) {
      return path; // Return the original path if it's invalid
    }

    pathArray[1] = newLocale;

    // Rebuild the path without the locale and add back search params
    const newPath = pathArray.join("/");

    // Get search params and append them back to the new path
    const searchParams = params?.toString(); // Convert search params to string

    return searchParams ? `${newPath}?${searchParams}` : newPath;
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="sticky top-0 z-[1999] py-4 bg-dentsu-primary">
        <div className="container flex items-center justify-center mx-auto lg:justify-between h-9 md:h-14">
          <div>
            <Logo
              href={`/${urlLocale}`}
              src={logoUrl}
              closeMenu={() => setMobileMenuOpen(false)}
            >
              {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
            </Logo>
          </div>

          <div className="items-center flex-shrink-0 hidden lg:flex">
            <ul className="items-stretch space-x-6 lg:flex">
              {linksWithLocale.map((item: NavLink) => (
                <NavLink key={item.id} {...item} />
              ))}
            </ul>
            <div className="flex items-center justify-center ml-6 space-x-3">
              {availableLocales.map((locale) => (
                <Link
                  scroll={false}
                  key={locale.id}
                  locale={locale.code}
                  href={getCurrentLocaleAndReplace(locale.code)}
                >
                  <div
                    style={{
                      width: 27,
                      height: 17,
                      overflow: "hidden",
                    }}
                  >
                    {locale.img.data?.attributes.url ? (
                      <img
                        src={locale.img.data?.attributes.url}
                        alt={locale.name}
                        className="w-full h-full"
                      />
                    ) : (
                      locale.name
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-3 lg:hidden">
          <button
            className="pt-1"
            onClick={() => {
              setMobileMenuOpen((prev) => !prev);
            }}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="text-white h-7 w-7" />
            )}
          </button>
        </div>
      </div>
      <Transition show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          className="relative z-[999]"
        >
          <motion.div
            initial="hidden"
            variants={variants}
            animate={mobileMenuOpen ? "visible" : "hidden"}
            className="fixed inset-0 z-[999] p-6 mx-auto bg-dentsu-primary lg:hidden "
          >
            <DialogPanel className="fixed inset-0  z-[999] w-full max-w-xs px-6 py-6 mx-auto overflow-y-auto text-center bg-dentsu-primary sm:max-w-sm">
              <>
                {/* <div className="flex justify-center items-center mt-14">
                  <Logo
                    href={`/${urlLocale}`}
                    src={logoUrl}
                    closeMenu={() => setMobileMenuOpen(false)}
                  >
                    {logoText && (
                      <h2 className="text-2xl font-bold">{logoText}</h2>
                    )}
                  </Logo>
                </div> */}
              </>
              <div className="flow-root mt-14">
                <div className="-my-6 divide-y divide-gray-700">
                  <div className="py-6 space-y-2">
                    {linksWithLocale.map((item) => (
                      <MobileNavLink
                        key={item.id}
                        closeMenu={() => setMobileMenuOpen(false)}
                        {...item}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-6 mt-6">
                {availableLocales.map((locale) => (
                  <Link
                    scroll={false}
                    key={locale.id}
                    locale={locale.code}
                    href={getCurrentLocaleAndReplace(locale.code)}
                  >
                    <div
                      style={{
                        width: 37,
                        height: 27,
                        overflow: "hidden",
                      }}
                    >
                      {locale.img.data?.attributes.url ? (
                        <img
                          alt={locale.name}
                          className="w-full h-full"
                          src={locale.img.data.attributes.url}
                        />
                      ) : (
                        locale.name
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </DialogPanel>
          </motion.div>
        </Dialog>
      </Transition>
    </>
  );
}

interface NavLink {
  id: number;
  url: string;
  text: string;
  locale: string;
  newTab: boolean;
}

interface MobileNavLink extends NavLink {
  closeMenu: () => void;
}

function NavLink({ url, text, locale }: NavLink) {
  const path = usePathname();

  return (
    <li className="flex">
      <Link
        href={`/${locale}${url}`}
        className={`flex items-center hover:text-dentsu-navigation-hover -mb-1 ${
          path === url && " "
        }`}
      >
        {text}
      </Link>
    </li>
  );
}

function MobileNavLink({ url, text, locale, closeMenu }: MobileNavLink) {
  const path = usePathname();

  // const handleClick = () => {
  //   closeMenu();
  // };

  return (
    <Link
      onClick={closeMenu}
      href={`/${locale}${url}`}
      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-900 ${
        path === url && ""
      }}`}
    >
      {text}
    </Link>
  );
}
