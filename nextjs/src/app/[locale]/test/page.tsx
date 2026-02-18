"use client";
import React, { useEffect, useRef } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ScrollTrigger + Parallax + Video Sequence Case Study Page
export default function CaseStudyScrollPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useViewportScroll();

  // Parallax motion: Hero image & background layers
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 800], [0, 300]);

  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      if (!section) return;
      gsap.fromTo(
        section.querySelector(".text-block"),
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 40%",
            scrub: false,
            once: true,
          },
        }
      );

      gsap.fromTo(
        section.querySelector(".image-block"),
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 50%",
            scrub: false,
            once: true,
          },
        }
      );
    });

    // Video scroll control
    const video = videoRef.current;
    if (video) {
      let frameCount = 90; // total number of frames in sequence
      let currentFrame = 0;
      let requestId: number;

      const updateVideo = () => {
        currentFrame = Math.floor(
          (scrollY.get() / (document.body.scrollHeight - window.innerHeight)) *
            frameCount
        );
        (video as HTMLVideoElement).currentTime = (currentFrame / frameCount) * (video as HTMLVideoElement).duration;
        requestId = requestAnimationFrame(updateVideo);
      };

      requestId = requestAnimationFrame(updateVideo);
      return () => cancelAnimationFrame(requestId);
    }
  }, [scrollY]);

  const sections = [
    {
      title: "Challenge",
      desc: "Designing an immersive digital detox RPG app where each lock session becomes a game event.",
      img: "https://images.unsplash.com/photo-1618005198919-d3d4bdf0b6b1?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Concept & Design",
      desc: "A hero-driven visual metaphor: focus battles distraction monsters — highlighted with parallax depth.",
      img: "https://images.unsplash.com/photo-1605902711622-cfb43c4437c3?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Prototype & Interaction",
      desc: "Scroll-triggered sequence plays an evolving animation synced with progress.",
      img: "https://images.unsplash.com/photo-1628277612838-9c3c4c2d6c97?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Outcome",
      desc: "This experiment became a signature showcase of mindful gamification and focus design.",
      img: "https://images.unsplash.com/photo-1603570419989-b65a4d035a76?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="bg-[#0a0a0f] text-white font-sans min-h-screen overflow-x-hidden"
    >
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-black/30 flex justify-between">
        <div className="font-bold tracking-widest text-sm">CASE STUDY</div>
        <div className="text-xs opacity-70">Scroll ↓</div>
      </header>

      {/* HERO with Parallax */}
      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1618005198919-d3d4bdf0b6b1?auto=format&fit=crop&w=1600&q=80"
          alt="Background Layer"
          style={{ y: y2 }}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
        />
        <motion.div style={{ y: y1 }} className="relative text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-extrabold mb-6"
          >
            Focus as a Game
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl text-sm md:text-base opacity-70 mx-auto"
          >
            A scroll-triggered parallax story — transforming mindfulness into
            motion.
          </motion.p>
        </motion.div>
      </section>

      {/* SCROLL VIDEO SEQUENCE */}
      <section className="relative flex justify-center items-center h-[120vh] bg-black">
        <video
          ref={videoRef}
          src="https://www.apple.com/105/media/us/macbook-pro-14-and-16/2023/fcddc664-9e6d-493a-a04d-f4523a0e07da/anim/hero/large.mp4"
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute bottom-10 text-center text-sm opacity-70">
          Scroll to advance sequence →
        </div>
      </section>

      {/* SECTIONS */}
      {sections.map((sec, i) => (
        <section
          key={i}
          ref={(el) => { if (sectionsRef.current) sectionsRef.current[i] = el; }}
          className="min-h-screen grid md:grid-cols-2 items-center gap-10 px-6 py-20 md:py-32 max-w-6xl mx-auto"
        >
          <div className="text-block order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-4">{sec.title}</h2>
            <p className="text-sm md:text-base opacity-70 leading-relaxed">
              {sec.desc}
            </p>
          </div>
          <div className="image-block order-1 md:order-2">
            <img
              src={sec.img}
              alt={sec.title}
              className="rounded-2xl shadow-2xl border border-white/5 w-full object-cover"
            />
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="min-h-[60vh] flex flex-col justify-center items-center text-center bg-gradient-to-t from-[#13131a] to-[#0a0a0f]">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-4"
        >
          Let’s craft your story.
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-8 py-4 bg-white text-black rounded-2xl font-semibold shadow-lg mt-4"
        >
          Start a project →
        </motion.button>
      </section>
    </div>
  );
}
