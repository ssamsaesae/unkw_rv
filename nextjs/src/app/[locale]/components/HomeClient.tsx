"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useInView,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import SocialShare from "@/components/social/SocialShare";
import { skillsList } from "@/constants/info";

/* ─── Animated Counter Hook ─── */
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start: number | null = null;
    let id: number;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * end));
      if (p < 1) id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [isInView, end, duration]);

  return { count, ref };
}

/* ─── Character-by-character Reveal ─── */
const RevealText = ({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => (
  <span className={className} aria-label={text}>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 80, rotateX: -90 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{
          duration: 0.6,
          delay: delay + i * 0.045,
          ease: [0.215, 0.61, 0.355, 1],
        }}
        className="inline-block"
        style={{ transformOrigin: "bottom" }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </span>
);

/* ─── Magnetic Hover Wrapper ─── */
const Magnetic = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════ */
/*               MAIN COMPONENT               */
/* ═══════════════════════════════════════════ */

export default function HomeClient({
  description,
  locale,
}: {
  description: string;
  locale: string;
}) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  /* Parallax layers for hero text */
  const layer1X = useTransform(springX, [0, 1], [-20, 20]);
  const layer1Y = useTransform(springY, [0, 1], [-12, 12]);
  const layer2X = useTransform(springX, [0, 1], [14, -14]);
  const layer2Y = useTransform(springY, [0, 1], [8, -8]);
  const gridShiftX = useTransform(springX, [0, 1], [3, -3]);
  const gridShiftY = useTransform(springY, [0, 1], [2, -2]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    },
    [mouseX, mouseY]
  );

  /* Grid draw-in animation */
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* Stats */
  const years = useCounter(5, 1500);
  const projects = useCounter(15, 2000);
  const companies = useCounter(3, 1200);

  /* Scroll progress */
  const { scrollYProgress } = useScroll();
  const progressW = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /* Marquee */
  const marquee =
    "REACT \u00B7 NEXT.JS \u00B7 TYPESCRIPT \u00B7 REACT NATIVE \u00B7 NODE.JS \u00B7 VUE \u00B7 REDUX \u00B7 FRAMER MOTION \u00B7 TAILWINDCSS \u00B7 CHAKRA UI \u00B7 MUI \u00B7 STORYBOOK \u00B7 ";

  /* Experience list */
  const expList = [
    { company: "Greenery", year: "2022 \u2014 Present", role: "Frontend Developer" },
    { company: "H-Energy", year: "2020 \u2014 2022", role: "Frontend Developer" },
    { company: "Geeks Family", year: "2019 \u2014 2020", role: "Frontend Developer" },
  ];

  return (
    <div onMouseMove={handleMouseMove} className="bg-black">
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-primary z-50"
        style={{ width: progressW }}
      />

      {/* ═══════ HERO ═══════ */}
      <section className="h-screen w-full relative overflow-hidden select-none">
        {/* Grid Lines */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ x: gridShiftX, y: gridShiftY }}
        >
          {/* Vertical */}
          {[16.66, 33.33, 50, 66.66, 83.33].map((p) => (
            <motion.div
              key={`v-${p}`}
              className="absolute top-0 bottom-0 w-px bg-white/[0.07]"
              style={{ left: `${p}%` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: ready ? 1 : 0 }}
              transition={{ duration: 1.2, delay: 0.1 + (p / 100) * 0.3, ease: "circOut" }}
            />
          ))}
          {/* Horizontal */}
          {[25, 50, 75].map((p, i) => (
            <motion.div
              key={`h-${p}`}
              className="absolute left-0 right-0 h-px bg-white/[0.07]"
              style={{ top: `${p}%` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: ready ? 1 : 0 }}
              transition={{ duration: 1.4, delay: 0.3 + i * 0.15, ease: "circOut" }}
            />
          ))}
        </motion.div>

        {/* Grid Coordinates */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {[
            { x: "16.66%", y: "25%" },
            { x: "33.33%", y: "25%" },
            { x: "50%", y: "25%" },
            { x: "66.66%", y: "25%" },
            { x: "83.33%", y: "25%" },
          ].map((pos, i) => (
            <span
              key={i}
              className="absolute text-[10px] text-white/15 font-mono -translate-x-1/2"
              style={{ left: pos.x, top: pos.y, marginTop: "-18px" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          ))}
          {/* Accent dots at grid intersections */}
          <motion.div
            className="absolute w-2.5 h-2.5 rounded-full bg-primary"
            style={{ top: "50%", left: "66.66%", x: "-50%", y: "-50%" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2, type: "spring", stiffness: 300 }}
          />
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-white/15"
            style={{ top: "75%", left: "33.33%", transform: "translate(-50%,-50%)" }}
          />
          <div
            className="absolute w-1 h-1 rounded-full bg-white/10"
            style={{ top: "50%", left: "16.66%", transform: "translate(-50%,-50%)" }}
          />
        </motion.div>

        {/* ── UNKNOWN ── */}
        <motion.div
          className="absolute left-6 md:left-[12%]"
          style={{ top: "22%", x: layer1X, y: layer1Y }}
        >
          <div className="overflow-hidden">
            <RevealText
              text="UNKNOWN"
              className="font-clash font-bold text-[clamp(3.2rem,13vw,11rem)] text-white leading-[0.9] tracking-[-0.03em]"
              delay={0.4}
            />
          </div>
        </motion.div>

        {/* ── RIVER ── */}
        <motion.div
          className="absolute left-6 md:left-[12%]"
          style={{ top: "40%", x: layer2X, y: layer2Y }}
        >
          <div className="overflow-hidden flex items-end gap-2 md:gap-4">
            <RevealText
              text="RIVER"
              className="font-clash font-bold text-[clamp(3.2rem,13vw,11rem)] text-white leading-[0.9] tracking-[-0.03em]"
              delay={0.7}
            />
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.3, type: "spring", stiffness: 200, damping: 12 }}
              className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-primary mb-2 md:mb-4"
            />
          </div>
        </motion.div>

        {/* Right Annotations */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: "circOut" }}
          className="absolute top-[24%] right-6 md:right-[8%] text-right"
        >
          <p className="text-white/30 text-[10px] font-mono tracking-[0.25em] uppercase">
            Since
          </p>
          <p className="text-white font-clash font-semibold text-xl mt-0.5">
            2019 —
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.7, duration: 0.8, ease: "circOut" }}
          className="absolute top-[50%] right-6 md:right-[8%] text-right"
        >
          <p className="text-white/30 text-[10px] font-mono tracking-[0.25em] uppercase">
            Based in
          </p>
          <p className="text-white font-clash font-semibold text-xl mt-0.5">
            Seoul, KR
          </p>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 border-t border-white/10"
        >
          <div className="flex justify-between items-center px-6 py-5">
            <div className="flex items-center gap-4 md:gap-6">
              <span className="text-white/30 text-[10px] md:text-xs font-mono tracking-[0.15em]">
                FRONTEND DEVELOPER
              </span>
              <span className="text-white/15 hidden md:inline">/</span>
              <span className="text-white/30 text-[10px] md:text-xs font-mono tracking-[0.15em] hidden md:inline">
                UI/UX DESIGNER
              </span>
            </div>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="text-white/30 text-[10px] font-mono tracking-[0.15em]"
            >
              SCROLL ↓
            </motion.span>
          </div>
        </motion.div>

        {/* Top gradient for header icon visibility */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none z-[5]" />
      </section>

      {/* ═══════ MARQUEE ═══════ */}
      <section className="bg-primary py-3.5 overflow-hidden border-y border-black/10">
        <div className="marquee-wrap flex">
          <div className="marquee-track flex whitespace-nowrap">
            <span className="font-clash font-bold text-base md:text-lg text-black tracking-wider">
              {marquee}
            </span>
            <span className="font-clash font-bold text-base md:text-lg text-black tracking-wider">
              {marquee}
            </span>
          </div>
        </div>
      </section>

      {/* ═══════ ABOUT ═══════ */}
      <section className="py-24 md:py-36 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-14"
          >
            <span className="text-primary font-mono text-[11px] tracking-[0.2em]">
              01
            </span>
            <div className="w-10 h-px bg-primary" />
            <span className="text-white/30 font-mono text-[11px] tracking-[0.2em]">
              ABOUT
            </span>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-12 md:gap-16">
            {/* Text */}
            <motion.div
              className="md:col-span-3"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-white/60 text-lg md:text-xl leading-relaxed">
                {description}
              </p>
              <Link href={`/${locale}/about`}>
                <Magnetic className="mt-10 inline-block">
                  <span className="inline-flex items-center gap-3 text-primary font-mono text-sm group cursor-pointer border-b border-primary/30 pb-1 hover:border-primary transition-colors">
                    VIEW FULL CAREER
                    <motion.span
                      className="inline-block"
                      whileHover={{ x: 4 }}
                    >
                      →
                    </motion.span>
                  </span>
                </Magnetic>
              </Link>
            </motion.div>

            {/* Stats */}
            <div className="md:col-span-2 grid grid-cols-3 gap-px bg-white/[0.08] self-start">
              {[
                { ref: years.ref, val: years.count, label: "YEARS" },
                { ref: projects.ref, val: projects.count, label: "PROJECTS" },
                { ref: companies.ref, val: companies.count, label: "COMPANIES" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  ref={s.ref}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i }}
                  className="bg-black p-5 md:p-6 text-center"
                >
                  <p className="font-clash font-bold text-3xl md:text-4xl text-white">
                    {s.val}
                    <span className="text-primary">+</span>
                  </p>
                  <p className="text-white/25 text-[10px] font-mono mt-2 tracking-[0.15em]">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SKILLS GRID ═══════ */}
      <section className="pb-24 md:pb-36 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-14"
          >
            <span className="text-primary font-mono text-[11px] tracking-[0.2em]">
              02
            </span>
            <div className="w-10 h-px bg-primary" />
            <span className="text-white/30 font-mono text-[11px] tracking-[0.2em]">
              SKILLS
            </span>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.08]">
            {skillsList.map((sk, idx) => (
              <motion.div
                key={sk.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-black p-6 md:p-8 flex items-center gap-4 cursor-default group
                           hover:bg-primary/[0.06] transition-colors duration-300"
              >
                <Image
                  src={sk.icon}
                  width={28}
                  height={28}
                  alt={sk.label}
                  className="opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="text-white/70 font-clash font-semibold text-base md:text-lg group-hover:text-primary transition-colors duration-300">
                  {sk.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ EXPERIENCE PREVIEW ═══════ */}
      <section className="pb-24 md:pb-36 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-14"
          >
            <span className="text-primary font-mono text-[11px] tracking-[0.2em]">
              03
            </span>
            <div className="w-10 h-px bg-primary" />
            <span className="text-white/30 font-mono text-[11px] tracking-[0.2em]">
              EXPERIENCE
            </span>
          </motion.div>

          <div>
            {expList.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.6, ease: "circOut" }}
                className="border-t border-white/[0.08] py-5 md:py-6 flex justify-between items-center
                           group cursor-default hover:border-primary/40 transition-colors duration-300"
              >
                <div className="flex items-baseline gap-3 md:gap-6">
                  <span className="text-white/15 font-mono text-[11px]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-clash font-bold text-xl md:text-3xl text-white group-hover:text-primary transition-colors duration-300">
                    {exp.company}
                  </h3>
                  <span className="text-white/20 text-sm hidden md:inline">
                    {exp.role}
                  </span>
                </div>
                <span className="text-white/30 font-mono text-xs md:text-sm">
                  {exp.year}
                </span>
              </motion.div>
            ))}
            <div className="border-t border-white/[0.08]" />
          </div>

          <Link href={`/${locale}/about`}>
            <Magnetic className="mt-10 inline-block">
              <span className="inline-flex items-center gap-3 text-primary font-mono text-sm cursor-pointer border-b border-primary/30 pb-1 hover:border-primary transition-colors">
                VIEW ALL EXPERIENCE →
              </span>
            </Magnetic>
          </Link>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-32 md:py-40 px-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-clash font-bold text-4xl md:text-6xl lg:text-8xl text-white leading-[1.05]">
              LET&apos;S WORK
              <br />
              <span className="text-primary">TOGETHER</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10"
          >
            <Magnetic className="inline-block">
              <a
                href="mailto:khe0124@gmail.com"
                className="font-mono text-white/50 text-sm hover:text-primary transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-primary"
              >
                khe0124@gmail.com
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex justify-center"
          >
            <SocialShare size={26} color="#E94710" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
