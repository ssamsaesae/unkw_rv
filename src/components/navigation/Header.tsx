"use client";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  usePathname,
  useParams,
  useRouter,
  useSelectedLayoutSegments,
} from "next/navigation";
import { Button } from "@chakra-ui/react";
import { useTranslation } from "@/i18n/client";
import { LocaleTypes } from "@/i18n/settings";
import BigAdd from "../../../public/big_add.svg";
import Link from "next/link";

export const Header = ({}) => {
  const pathName = usePathname();
  const router = useRouter();
  const locale = useParams()?.locale as LocaleTypes;
  const [open, setOpen] = useState(false);

  const { t } = useTranslation(locale, "common");

  const urlSegments = useSelectedLayoutSegments();

  const routeList = [
    { name: "ABOUT", link: "/about" },
    { name: "PROJECT", link: "/project" },
    { name: "CONTACT", link: "/contact" },
  ];

  const handleLocaleChange = (locale: string) => {
    const newLocale = locale;
    router.push(`/${newLocale}/${urlSegments.join("/")}`);
  };

  const buttonStyle = useCallback(
    (lang: string) => {
      const color = open ? "gray-800" : "primary";
      if (lang === locale) return `bg-black text-${color}`;
      return `bg-${color} border-solid border border-black text-black`;
    },
    [locale, open]
  );

  useEffect(() => {
    setOpen(false);
  }, [pathName]);

  return (
    <>
      <header className="flex absolute top-4 w-full justify-between z-10">
        <div
          className="px-6 pt-6 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <BigAdd color={open ? "white" : "black"} />
        </div>
        <article className="flex gap-1 pr-6 pt-6">
          <Button
            className={buttonStyle("ko")}
            borderRadius={0}
            outline={""}
            onClick={() => handleLocaleChange("ko")}
          >
            KO
          </Button>
          <Button
            className={buttonStyle("en")}
            borderRadius={0}
            outline={""}
            onClick={() => handleLocaleChange("en")}
          >
            EN
          </Button>
        </article>
      </header>
      {open && (
        <section className="w-screen h-screen fixed top-0 left-0 right-0 bg-gray-800">
          <article className="w-full h-full flex flex-col pt-24 justify-center items-center">
            {routeList.map((el) => (
              <Link
                className="py-8 cursor-pointer text-white"
                key={el.name}
                href={el.link}
              >
                {el.name}
              </Link>
            ))}
          </article>
        </section>
      )}
    </>
  );
};

export default Header;
