"use client";
import Logo from "@/app/[lang]/components/Logo";
import type { StrapiLocaleType } from "@/app/[lang]/layout";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useState } from "react";

export default function Navbar({
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
  const router = useRouter();
  const path = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const urlLocale = path.split("/")[1] || "en";

  const switchLocale = (newLocale: string) => {
    const availableLocalesCodes = availableLocales.map((locale) => locale.code);
    const currentLocale = availableLocalesCodes.reduce((acc, locale) => {
      if (path.includes(locale)) {
        return locale;
      }
      return acc;
    });

    const newPath = path.replace(currentLocale, newLocale);
    router.push(newPath);
  };

  const linksWithLocale = links.map((link) => ({
    ...link,
    locale: urlLocale,
  }));

  return (
    <div className="sticky top-0 z-30 py-4 bg-dentsu-primary">
      <div className="container flex items-center justify-between mx-auto h-9 md:h-14">
        <Logo href={`/${urlLocale}`} src={logoUrl}>
          {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
        </Logo>

        <div className="items-center flex-shrink-0 hidden lg:flex">
          <ul className="items-stretch space-x-6 lg:flex">
            {linksWithLocale.map((item: NavLink) => (
              <NavLink key={item.id} {...item} />
            ))}
          </ul>
          <div className="flex items-center justify-center ml-6 space-x-3">
            {availableLocales.map((locale) => (
              <button
                type="button"
                key={locale.id}
                title={locale.name}
                onClick={() => switchLocale(locale.code)}
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
                      src={locale.img.data.attributes.url}
                      alt={locale.name}
                      className="w-full h-full"
                    />
                  ) : (
                    locale.name
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <Transition show={mobileMenuOpen} as={Fragment}>
          <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            <TransitionChild
              as={Fragment}
              enter="transition-all duration-500"
              enterFrom="transform -translate-y-full opacity-0"
              enterTo="transform translate-y-0 opacity-100"
              leave="transition-all duration-300"
              leaveFrom="transform translate-y-0 opacity-100"
              leaveTo="transform -translate-y-full opacity-0"
            >
              <div className="fixed inset-0 z-40 bg-dentsu-primary" />
            </TransitionChild>
            <TransitionChild
              as={Fragment}
              enter="transition-all duration-500"
              enterFrom="transform -translate-y-full opacity-0"
              enterTo="transform translate-y-0 opacity-100"
              leave="transition-all duration-300"
              leaveFrom="transform translate-y-0 opacity-100"
              leaveTo="transform -translate-y-full opacity-0"
            >
              <DialogPanel className="fixed inset-y-0 z-50 w-full px-6 py-6 overflow-y-auto bg-dentsu-primary rtl:left-0 ltr:right-0 sm:max-w-sm sm:ring-1 sm:ring-inset sm:ring-white/10">
                <div className="flex items-center justify-between">
                  <a href={`/${urlLocale}`} className="-m-1.5 p-1.5">
                    <span className="sr-only">Dentsu</span>
                    {logoUrl && (
                      <img className="w-auto h-8" src={logoUrl} alt="" />
                    )}
                  </a>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="flow-root mt-6">
                  <div className="-my-6 divide-y divide-gray-700">
                    <div className="py-6 space-y-2">
                      {linksWithLocale.map((item) => (
                        <MobileNavLink
                          key={item.id}
                          closeMenu={closeMenu}
                          {...item}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6 mt-6">
                  {availableLocales.map((locale) => (
                    <button
                      type="button"
                      key={locale.id}
                      title={locale.name}
                      onClick={() => switchLocale(locale.code)}
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
                            src={locale.img.data.attributes.url}
                            alt={locale.name}
                            className="w-full h-full"
                          />
                        ) : (
                          locale.name
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </DialogPanel>
            </TransitionChild>
          </Dialog>
        </Transition>

        <button
          className="p-0 lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Bars3Icon className="text-gray-100 h-7 w-7" aria-hidden="true" />
        </button>
      </div>
    </div>
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
        className={`flex items-center -mb-1 ${path === url && " "}`}
      >
        {text}
      </Link>
    </li>
  );
}

function MobileNavLink({ url, text, locale, closeMenu }: MobileNavLink) {
  const path = usePathname();

  const handleClick = () => {
    closeMenu();
  };

  return (
    <Link
      onClick={handleClick}
      href={`/${locale}${url}`}
      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-900 ${
        path === url && ""
      }}`}
    >
      {text}
    </Link>
  );
}
