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
import { usePathname } from "next/navigation";
import { useState } from "react";

const CookieBanner = () => {
  const path = usePathname();
  const urlLocale = path.split("/")[1] || "en";
  const [isShowMore, setIsShowMore] = useState(false);

  return (
    <div>
      <Dialog>
        <div className="fixed bottom-0 left-0 right-0 px-3 py-2 text-black bg-white">
          <div className="container flex flex-wrap items-center justify-center gap-3 mx-auto md:justify-center">
            <p className="text-sm text-center md:text-left">
              We use cookies on our website to provide you with the best
              possible user experience. More information can be found in our
            </p>
            <a
              href={`/${urlLocale}/privacycookiepolicy`}
              className="inline-block text-sm underline"
            >
              Privacy & Cookie policy
            </a>
            <DialogTrigger asChild>
              <Button variant="violet">Manage cookie settings</Button>
            </DialogTrigger>
            <button className="px-5 py-1 ml-2 text-sm text-white bg-black">
              I accept
            </button>
          </div>
        </div>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="pb-4 text-black">
              Privacy Overview
            </DialogTitle>
            <DialogDescription>
              This website uses cookies to improve your experience while you
              navigate through the website. Out of these cookies, the cookies
              that are categorized as necessary are stored on your browser as
              they are essential for the working of basic functionalities
              {!isShowMore
                ? "..."
                : "of the website. We also use third-party cookies that help us analyze and understand how you use this website. These cookies will be stored in your browser only with your consent. You also have the option to opt-out of these cookies. But opting out of some of these cookies may have an effect on your browsing experience."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-start">
            <button
              className="text-sm text-black underline"
              onClick={() => setIsShowMore((prev) => !prev)}
            >
              {isShowMore ? "Show less" : "Show more"}
            </button>
          </div>
          <div>
            <Accordion type="single" collapsible>
              <AccordionItem className="pb-5" value={`item-${1}`}>
                <CookieAccordionTrigger className="flex items-center px-2 py-3 bg-gray-200 md:p-4">
                  <div className="flex items-center justify-between w-full">
                    <p className="flex gap-4 text-sm font-normal text-left text-black truncate">
                      {"Necessary"}
                    </p>
                    <p className="text-sm font-normal text-black">
                      {"Always Enabled"}
                    </p>
                  </div>
                </CookieAccordionTrigger>
                <AccordionContent className="pb-0 text-black">
                  <div className="p-5">
                    <p className="text-sm">
                      {
                        "Necessary cookies are absolutely essential for the website to function properly. This category only includes cookies that ensures basic functionalities and security features of the website. These cookies do not store any personal information."
                      }
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value={`item-${2}`}>
                <CookieAccordionTrigger className="flex items-center px-2 py-3 bg-gray-200 md:p-4">
                  <div className="flex items-center justify-between w-full">
                    <p className="flex gap-4 text-sm font-normal text-left text-black truncate">
                      {"Non-necessary"}
                    </p>
                    <p className="text-sm font-normal text-black">
                      {"This needs to switch"}
                    </p>
                  </div>
                </CookieAccordionTrigger>
                <AccordionContent className="pb-0 text-black">
                  <div className="p-5">
                    <p className="text-sm">
                      {
                        "Any cookies that may not be particularly necessary for the website to function and is used specifically to collect user personal data via analytics, ads, other embedded contents are termed as non-necessary cookies. It is mandatory to procure user consent prior to running these cookies on your website."
                      }
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex items-center justify-end">
            <button className="px-4 py-2 text-sm text-white bg-black">
              SAVE AND ACCEPT
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CookieBanner;
