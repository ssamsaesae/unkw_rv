"use client";
import React, { useEffect, useState } from "react";
import {
  usePathname,
  useParams,
  useRouter,
  useSelectedLayoutSegments,
} from "next/navigation";
import { LocaleTypes } from "@/i18n/settings";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const routeList = [
  { name: "ABOUT", link: "/about" },
  { name: "PROJECT", link: "/project" },
  { name: "CONTACT", link: "/contact" },
];

export const Header = () => {
  const pathName = usePathname();
  const router = useRouter();
  const locale = useParams()?.locale as LocaleTypes;
  const urlSegments = useSelectedLayoutSegments();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleLocaleChange = (newLocale: string) => {
    router.push(`/${newLocale}/${urlSegments.join("/")}`);
  };

  const isActive = (link: string) => {
    return pathName?.includes(link);
  };

  useEffect(() => {
    setOpen(false);
  }, [pathName]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="font-clash font-bold text-lg text-white hover:text-primary transition-colors"
          >
            UKWRV<span className="text-primary">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {routeList.map((route) => (
              <Link
                key={route.name}
                href={`/${locale}${route.link}`}
                className={`font-mono text-[11px] tracking-[0.15em] transition-colors duration-200 ${
                  isActive(route.link)
                    ? "text-primary"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {route.name}
              </Link>
            ))}

            {/* Language Switcher */}
            <div className="flex items-center gap-1 ml-4 border-l border-white/[0.08] pl-5">
              <button
                onClick={() => handleLocaleChange("ko")}
                className={`font-mono text-[11px] tracking-wider px-2 py-1 transition-colors ${
                  locale === "ko"
                    ? "text-primary"
                    : "text-white/30 hover:text-white/60"
                }`}
              >
                KO
              </button>
              <span className="text-white/15 text-[10px]">/</span>
              <button
                onClick={() => handleLocaleChange("en")}
                className={`font-mono text-[11px] tracking-wider px-2 py-1 transition-colors ${
                  locale === "en"
                    ? "text-primary"
                    : "text-white/30 hover:text-white/60"
                }`}
              >
                EN
              </button>
            </div>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden relative w-7 h-5 flex flex-col justify-between"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-full h-px bg-white origin-center"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="block w-full h-px bg-white"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-full h-px bg-white origin-center"
            />
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-black flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center gap-2">
              {routeList.map((route, idx) => (
                <motion.div
                  key={route.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={`/${locale}${route.link}`}
                    className={`font-clash font-bold text-4xl transition-colors ${
                      isActive(route.link)
                        ? "text-primary"
                        : "text-white hover:text-primary"
                    }`}
                  >
                    {route.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Language Switcher */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 mt-12"
            >
              <button
                onClick={() => handleLocaleChange("ko")}
                className={`font-mono text-sm tracking-wider px-3 py-1.5 border transition-colors ${
                  locale === "ko"
                    ? "border-primary text-primary"
                    : "border-white/20 text-white/40 hover:text-white"
                }`}
              >
                KO
              </button>
              <button
                onClick={() => handleLocaleChange("en")}
                className={`font-mono text-sm tracking-wider px-3 py-1.5 border transition-colors ${
                  locale === "en"
                    ? "border-primary text-primary"
                    : "border-white/20 text-white/40 hover:text-white"
                }`}
              >
                EN
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
