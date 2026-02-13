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
import dynamic from "next/dynamic";
import SocialShare from "@/components/social/SocialShare";
import { skillsList } from "@/constants/info";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

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
  const mouseRef = useRef({ x: 0, y: 0 });

  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  /* Parallax layers for hero text */
  const layer1X = useTransform(springX, [0, 1], [-12, 12]);
  const layer1Y = useTransform(springY, [0, 1], [-8, 8]);
  const gridShiftX = useTransform(springX, [0, 1], [3, -3]);
  const gridShiftY = useTransform(springY, [0, 1], [2, -2]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const nx = e.clientX / window.innerWidth;
      const ny = e.clientY / window.innerHeight;
      mouseX.set(nx);
      mouseY.set(ny);
      mouseRef.current = { x: (nx - 0.5) * 2, y: (ny - 0.5) * 2 };
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
          {[20, 40, 60, 80].map((p) => (
            <motion.div
              key={`v-${p}`}
              className="absolute top-0 bottom-0 w-px bg-white/[0.05]"
              style={{ left: `${p}%` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: ready ? 1 : 0 }}
              transition={{ duration: 1.2, delay: 0.1 + (p / 100) * 0.3, ease: "circOut" }}
            />
          ))}
          {[33, 66].map((p, i) => (
            <motion.div
              key={`h-${p}`}
              className="absolute left-0 right-0 h-px bg-white/[0.05]"
              style={{ top: `${p}%` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: ready ? 1 : 0 }}
              transition={{ duration: 1.4, delay: 0.3 + i * 0.15, ease: "circOut" }}
            />
          ))}
        </motion.div>

        {/* 3D Wireframe Sphere */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute top-[10%] right-[-5%] md:top-[8%] md:right-[5%] w-[70vw] h-[70vw] md:w-[45vw] md:h-[45vw] max-w-[600px] max-h-[600px]">
            <HeroScene mouseRef={mouseRef} />
          </div>
        </motion.div>

        {/* Text Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-[8%]">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-primary" />
            <span className="text-white/30 text-[10px] font-mono tracking-[0.25em] uppercase">
              Frontend Developer & UI/UX Designer
            </span>
          </motion.div>

          {/* Name */}
          <motion.div style={{ x: layer1X, y: layer1Y }}>
            <div className="overflow-hidden">
              <RevealText
                text="UNKNOWN"
                className="font-clash font-bold text-[clamp(2.4rem,8vw,6.5rem)] text-white leading-[0.95] tracking-[-0.02em]"
                delay={0.4}
              />
            </div>
            <div className="overflow-hidden flex items-end gap-2 md:gap-3 mt-1">
              <RevealText
                text="RIVER"
                className="font-clash font-bold text-[clamp(2.4rem,8vw,6.5rem)] text-white leading-[0.95] tracking-[-0.02em]"
                delay={0.7}
              />
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.3, type: "spring", stiffness: 200, damping: 12 }}
                className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary mb-1.5 md:mb-3"
              />
            </div>
          </motion.div>

          {/* Subtitle info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7 }}
            className="mt-8 flex items-center gap-6"
          >
            <div className="flex items-center gap-2">
              <span className="text-white/20 text-[10px] font-mono tracking-[0.2em]">SINCE</span>
              <span className="text-white/50 font-clash font-semibold text-sm">2019</span>
            </div>
            <span className="text-white/10">|</span>
            <div className="flex items-center gap-2">
              <span className="text-white/20 text-[10px] font-mono tracking-[0.2em]">BASED IN</span>
              <span className="text-white/50 font-clash font-semibold text-sm">Seoul, KR</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 border-t border-white/[0.06]"
        >
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex items-center gap-4">
              <span className="text-white/25 text-[10px] font-mono tracking-[0.15em]">
                PORTFOLIO 2025
              </span>
            </div>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="text-white/25 text-[10px] font-mono tracking-[0.15em]"
            >
              SCROLL ↓
            </motion.span>
          </div>
        </motion.div>
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
