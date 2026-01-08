"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** ✅ Your original content (unchanged) */
export const processSteps = [
  {
    id: 1,
    title: "Logo Design",
    description:
      "We create a unique couple monogram or wedding logo that reflects your personality.",
    turnaround: "24-48 hours",
    icon: "Palette",
  },
  {
    id: 2,
    title: "Caricature",
    description:
      "Our artists craft a fun, personalized caricature of you and your partner.",
    turnaround: "48-72 hours",
    icon: "PenTool",
  },
  {
    id: 3,
    title: "Slides Design",
    description:
      "We design beautiful invitation slides with all your event details.",
    turnaround: "24-48 hours",
    icon: "Layers",
  },
  {
    id: 4,
    title: "Video Preview",
    description:
      "Review your video invitation draft with background music and animations.",
    turnaround: "48-72 hours",
    icon: "Play",
  },
  {
    id: 5,
    title: "Revisions",
    description:
      "We make adjustments based on your feedback to perfect every detail.",
    turnaround: "24-48 hours",
    icon: "RefreshCw",
  },
  {
    id: 6,
    title: "Final Delivery",
    description: "Receive your final invitation in multiple formats ready to share.",
    turnaround: "Same day",
    icon: "CheckCircle",
  },
];

type Step = {
  id: number;
  title: string;
  description: string;
  turnaround: string;
  src: string;
};

function useResponsive() {
  const [bp, setBp] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) return setBp("mobile");
      if (w < 1024) return setBp("tablet");
      return setBp("desktop");
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return bp;
}

export default function ProcessStackShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const bp = useResponsive();

  // ✅ Unsplash preview images (example only)
  const steps: Step[] = useMemo(() => {
    const imgs = [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    ];

    return processSteps.map((s, i) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      turnaround: s.turnaround,
      src: imgs[i % imgs.length],
    }));
  }, []);

  // ✅ Scroll controls which step is active (one screen per step)
  const sectionHeightVh = (steps.length + 1) * 100;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (p) => {
      const idx = Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length)));
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActiveIndex(idx);
      }
    });
    return () => {
      unsub?.();
    };
  }, [scrollYProgress, steps.length]);

  // ✅ Click arrows / slim cards -> scroll to that step so scroll + click stay in sync
  const goTo = useCallback(
    (index: number) => {
      const el = ref.current;
      if (!el) return;
      const next = Math.max(0, Math.min(steps.length - 1, index));
      setActiveIndex(next);
      activeRef.current = next;
      const top = el.offsetTop + next * window.innerHeight;
      window.scrollTo({ top, behavior: "smooth" });
    },
    [steps.length]
  );

  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  // ✅ Layout numbers (match the screenshot vibe)
  const slimWidth =
    bp === "mobile" ? 56 : bp === "tablet" ? 72 : 88; // px
  const gap = bp === "mobile" ? 10 : 14; // px
  const maxSlim = bp === "mobile" ? 2 : bp === "tablet" ? 3 : 4;

  const rightStack = useMemo(() => {
    // show upcoming cards to the right (like the screenshot)
    const start = activeIndex + 1;
    const end = Math.min(steps.length, start + maxSlim);
    const list = [];
    for (let i = start; i < end; i++) list.push(i);
    return list;
  }, [activeIndex, steps.length, maxSlim]);

  return (
    <section ref={ref} className="relative bg-white" style={{ height: `${sectionHeightVh}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Container */}
        <div className="mx-auto h-full w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="w-full">
            {/* Header row */}
            <div className="mb-5 sm:mb-7 flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-black/60">
                  Our Process
                </p>
                <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-black">
                  How we work
                </h2>
              </div>

              {/* Arrows (always visible, like your request) */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  disabled={activeIndex === 0}
                  className="w-10 h-10 rounded-full bg-white border border-black/10 shadow-sm flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/[0.03]"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={activeIndex === steps.length - 1}
                  className="w-10 h-10 rounded-full bg-white border border-black/10 shadow-sm flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/[0.03]"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Showcase row (one big + slim stack) */}
            <div className="relative flex items-stretch">
              {/* BIG ACTIVE CARD */}
              <motion.div
                key={steps[activeIndex].id}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.28 }}
                className="relative overflow-hidden rounded-[26px] shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
                style={{
                  width: `calc(100% - ${(rightStack.length * slimWidth) + (rightStack.length * gap)}px)`,
                  minHeight: bp === "mobile" ? 360 : bp === "tablet" ? 420 : 480,
                }}
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${steps[activeIndex].src})` }}
                />
                {/* Dark gradient overlay like screenshot */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                {/* Content */}
                <div className="relative h-full p-6 sm:p-8 flex flex-col justify-end">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-white/15 border border-white/15 px-3 py-1 text-[11px] sm:text-xs font-semibold text-white">
                      Step {activeIndex + 1} / {steps.length}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-white/15 border border-white/15 px-3 py-1 text-[11px] sm:text-xs font-semibold text-white">
                      {steps[activeIndex].turnaround}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-white">
                    {steps[activeIndex].title}
                  </h3>

                  <p className="mt-3 max-w-xl text-white/85 text-sm sm:text-base leading-relaxed">
                    {steps[activeIndex].description}
                  </p>

                  {/* Small hint */}
                  <div className="mt-5 text-white/70 text-xs sm:text-sm">
                    Scroll to advance • Or click the slim cards to open
                  </div>
                </div>
              </motion.div>

              {/* SLIM STACK (RIGHT) */}
              <div
                className="relative flex"
                style={{
                  marginLeft: gap,
                  gap,
                  alignItems: "stretch",
                }}
              >
                {rightStack.length === 0 ? (
                  // keep spacing stable when you reach the last step
                  <div
                    style={{ width: slimWidth }}
                    className="hidden sm:block"
                    aria-hidden="true"
                  />
                ) : null}

                {rightStack.map((idx, i) => {
                  const s = steps[idx];
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => goTo(idx)}
                      className="relative overflow-hidden rounded-[22px] border border-black/10 shadow-[0_12px_35px_rgba(0,0,0,0.16)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition-shadow"
                      style={{
                        width: slimWidth,
                        minHeight: bp === "mobile" ? 360 : bp === "tablet" ? 420 : 480,
                      }}
                      aria-label={`Open ${s.title}`}
                    >
                      {/* BG */}
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${s.src})` }}
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/55" />

                      {/* Vertical title like screenshot */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rotate-90 whitespace-nowrap text-white/90 font-semibold text-base sm:text-lg tracking-wide">
                          {s.title}
                        </div>
                      </div>

                      {/* Small top marker (like a "tab") */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-7 h-[3px] rounded-full bg-white/70" />

                      {/* On hover: subtle highlight */}
                      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-white/10" />

                      {/* Depth offset (slight) */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          boxShadow:
                            i === 0
                              ? "inset 0 0 0 1px rgba(255,255,255,0.10)"
                              : "none",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile helper (optional) */}
            <div className="mt-5 sm:hidden text-xs text-black/60">
              Tip: Use arrows to switch steps. Scroll also moves to next step.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
