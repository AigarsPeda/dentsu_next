"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  CookieAccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface CookieBannerProps {
  cookieBannerData: {
    id: number;
    description: string;
    moreInfoText: string;
    moreInfoTextLink: string;
    acceptButtonTitle: string;
    dialogTitle: string;
    dialog: string;
    dialogButtonTitle: string;
    manageCookieSettingsTitle: string;
    cookieChoices: {
      id: number;
      title: string;
      description: string;
      isNonNecessary: boolean;
    }[];
  };
}

const CookieBanner: FC<CookieBannerProps> = ({ cookieBannerData }) => {
  const path = usePathname();
  const urlLocale = path.split("/")[1] || "en";
  const { cookies, setCookie } = useCookieConsent();
  const [isShowMore, setIsShowMore] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [isNonNecessary, setIsNonNecessary] = useState(true);

  const addCookieToPage = () => {
    const COOKIE = {
      necessary: true,
      version: "1.0.0",
      nonNecessary: isNonNecessary,
    };

    setCookie("necessary", COOKIE);
    setIsShowDialog(false);
  };

  // if cookieBannerData?.dialog is more 40 Words, then show more button

  const words = cookieBannerData?.dialog.split(" ");
  const isMoreWords = words.length > 81;
  const dialogText = isMoreWords
    ? isShowMore
      ? cookieBannerData?.dialog
      : `${words.slice(0, 81).join(" ")}...`
    : cookieBannerData?.dialog;
  //  isShowMore
  //   ? cookieBannerData?.dialog
  //   : `${words.slice(0, 81).join(" ")}...`;

  useEffect(() => {
    if (cookies?.necessary?.version !== "1.0.0") {
      setIsShowDialog(true);
    }
  }, [cookies]);

  return (
    <AnimatePresence>
      {isShowDialog && (
        <Dialog>
          <motion.div
            exit={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 px-3 py-2 text-black bg-white z-[699]"
          >
            <div className="container flex flex-wrap items-center justify-center gap-3 mx-auto md:justify-center">
              <p className="text-sm text-center xl:text-left">
                {cookieBannerData?.description}
              </p>
              <a
                href={`/${urlLocale}/${cookieBannerData?.moreInfoTextLink}`}
                className="inline-block text-sm underline"
              >
                {cookieBannerData?.moreInfoText}
              </a>
              <DialogTrigger asChild>
                <Button variant="violet">
                  {cookieBannerData?.manageCookieSettingsTitle}
                </Button>
              </DialogTrigger>
              <button
                className="px-5 py-1 ml-2 text-sm text-white bg-black"
                onClick={addCookieToPage}
              >
                {cookieBannerData?.acceptButtonTitle}
              </button>
            </div>
          </motion.div>

          <DialogContent>
            <DialogHeader>
              <DialogTitle className="pb-4 text-black">
                {cookieBannerData?.dialogTitle}
              </DialogTitle>
              <DialogDescription>{dialogText}</DialogDescription>
            </DialogHeader>
            {isMoreWords && (
              <div className="flex items-center justify-start">
                <button
                  className="text-sm text-black underline"
                  onClick={() => setIsShowMore((prev) => !prev)}
                >
                  {isShowMore ? "Show less" : "Show more"}
                </button>
              </div>
            )}

            <div>
              <Accordion type="single" collapsible>
                {cookieBannerData?.cookieChoices.map((choice) => (
                  <div key={choice.id} className="pb-2">
                    <AccordionItem value={`item-${choice?.id}`}>
                      <div className="flex items-center justify-between w-full pr-2 bg-gray-200">
                        <CookieAccordionTrigger className="flex items-center px-3 py-2 bg-gray-200">
                          <div className="flex items-center justify-between w-full">
                            <p className="flex gap-4 text-sm font-normal text-left text-black truncate">
                              {choice?.title}
                            </p>
                          </div>
                        </CookieAccordionTrigger>
                        {choice?.isNonNecessary && (
                          <Switch
                            className="text-black"
                            id="airplane-mode"
                            checked={choice?.isNonNecessary}
                            onClick={() => setIsNonNecessary((state) => !state)}
                          />
                        )}
                      </div>

                      <AccordionContent className="pb-0 text-black">
                        <div className="p-5">
                          <p className="text-sm">{choice?.description}</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                ))}
              </Accordion>
            </div>
            <div className="flex items-center justify-end pt-1">
              <button
                className="px-4 py-2 text-sm text-white bg-black"
                onClick={addCookieToPage}
              >
                {cookieBannerData?.dialogButtonTitle}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
