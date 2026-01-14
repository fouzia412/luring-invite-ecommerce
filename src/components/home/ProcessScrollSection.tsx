"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  PenTool,
  Layers,
  CheckCircle,
  ClipboardList,
  FileText,
} from "lucide-react";

/* ---------------- TYPES ---------------- */
type Media = { type: "image"; src: string };

type Step = {
  id: number;
  title: string;
  description: string;
  turnaround: string;
  icon: React.ElementType;
  media: Media;
};

/* ---------------- DATA ---------------- */
const steps: Step[] = [
  {
    id: 0,
    title: "Client Requirements",
    description:
      "Understanding your vision, preferences, and event details to align the entire design process.",
    turnaround: "Discussion",
    icon: ClipboardList,
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80",
    },
  },
  {
    id: 1,
    title: "Quotation",
    description:
      "Transparent pricing with a clear breakdown of deliverables, timelines, and revisions.",
    turnaround: "Same Day",
    icon: FileText,
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=1600&q=80",
    },
  },
  {
    id: 2,
    title: "Logo Design",
    description:
      "Custom monogram or logo crafted to reflect your personality and event theme.",
    turnaround: "24h",
    icon: Palette,
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    },
  },
  {
    id: 3,
    title: "Character Design (Caricature)",
    description:
      "Handcrafted caricature illustrations that add a fun and personal touch.",
    turnaround: "48h",
    icon: PenTool,
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    },
  },
  {
    id: 4,
    title: "Slides Design",
    description:
      "Elegant slide layouts with refined typography, color harmony, and visual balance.",
    turnaround: "24h",
    icon: Layers,
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&w=1600&q=80",
    },
  },
  {
    id: 5,
    title: "Final Delivery",
    description:
      "Polished, ready-to-share designs delivered in all required formats.",
    turnaround: "Same Day",
    icon: CheckCircle,
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80",
    },
  },
];

/* ---------------- THEME ---------------- */
const THEME = "#a86dcd";

/* ---------------- HELPERS ---------------- */
function useHoverCapable() {
  const [hoverCapable, setHoverCapable] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHoverCapable(mq.matches);
    update();

    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  return hoverCapable;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/* ---------------- COMPONENT ---------------- */
export default function ProcessScrollSection() {
  const [activeId, setActiveId] = useState<number>(2);
  const isDesktop = useHoverCapable();

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRootRef = useRef<HTMLDivElement | null>(null);
  const innerWrapRef = useRef<HTMLDivElement | null>(null);

  const [innerHeight, setInnerHeight] = useState<number>(0);
  const tapLockUntilRef = useRef<number>(0);

  // Slightly smaller gap on mobile gives more room for expanded content
  const GAP = isDesktop ? 10 : 8;

  // Minimums (IMPORTANT for mobile clipping fix)
  const MIN_COLLAPSED = 52;
  const MIN_EXPANDED_DESKTOP = 180;
  const MIN_EXPANDED_MOBILE = 240; // <- ensures full info visible on mobile

  /* ---- Measure the available height inside the cocoon ---- */
  useLayoutEffect(() => {
    const el = innerWrapRef.current;
    if (!el) return;

    // Fallback if ResizeObserver not supported
    if (typeof ResizeObserver === "undefined") {
      const update = () => setInnerHeight(el.getBoundingClientRect().height);
      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }

    const ro = new ResizeObserver((entries) => {
      const h = entries[0]?.contentRect?.height ?? 0;
      setInnerHeight(h);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* ---- Heights that fill the cocoon AND keep mobile expanded readable ---- */
  const { collapsedH, expandedH } = useMemo(() => {
    const n = steps.length;
    const usable = Math.max(0, innerHeight - GAP * (n - 1));

    if (n <= 1) return { collapsedH: usable, expandedH: usable };

    // Prefer a bigger expanded ratio on mobile
    const preferredRatio = isDesktop ? 0.36 : 0.54;
    const preferredExpanded = usable * preferredRatio;

    const minExpanded = isDesktop ? MIN_EXPANDED_DESKTOP : MIN_EXPANDED_MOBILE;

    // Expanded cannot exceed what remains after giving other cards min collapsed
    const maxExpanded = usable - (n - 1) * MIN_COLLAPSED;

    // If container is too small, we still clamp safely
    const exp = clamp(
      preferredExpanded,
      minExpanded,
      Math.max(minExpanded, maxExpanded)
    );

    const remaining = usable - exp;
    const col = remaining / (n - 1);
    const colFinal = Math.max(MIN_COLLAPSED, col);

    // Recompute expFinal if colFinal hit min
    const expFinal = usable - colFinal * (n - 1);

    return {
      collapsedH: colFinal,
      expandedH: Math.max(minExpanded, expFinal),
    };
  }, [innerHeight, isDesktop, GAP]);

  /* ---- Observer: activates step on scroll (but respects tap) ---- */
  useEffect(() => {
    if (isDesktop) return;

    const rootEl = scrollRootRef.current;
    if (!rootEl) return;

    // Fallback if IntersectionObserver not supported (older browsers)
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < tapLockUntilRef.current) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];

        if (!visible) return;
        const el = visible.target as HTMLElement;
        const id = Number(el.dataset.id);
        if (!Number.isNaN(id)) setActiveId(id);
      },
      {
        root: rootEl,
        threshold: [0.35, 0.5, 0.65, 0.8],
        rootMargin: "0px 0px -12% 0px",
      }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [isDesktop]);

  const handleMobileActivate = (id: number, index: number) => {
    tapLockUntilRef.current = Date.now() + 700; // tap wins
    setActiveId(id);

    // Smoothly bring the tapped card into a nice viewing position
    const root = scrollRootRef.current;
    const node = itemRefs.current[index];
    if (!root || !node) return;

    const rootRect = root.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    const delta = nodeRect.top - rootRect.top - rootRect.height * 0.18;

    root.scrollBy({ top: delta, behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen py-20 flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/1-4.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 w-full px-4 flex flex-col items-center">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-black">
            Our{" "}
            <span className="italic" style={{ color: THEME }}>
              Process
            </span>
          </h2>
          <p className="mt-2 text-muted-foreground text-sm md:text-base">
            Crafting your story, one layer at a time
          </p>
        </div>

        {/* TOP THREAD */}
        <div
          className="h-16 w-[4px] mb-[-4px]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(168,109,205,0) 0%, rgba(168,109,205,1) 60%, rgba(168,109,205,1) 100%)",
          }}
        />

        {/* COCOON */}
        <div className="relative w-full max-w-[420px] md:max-w-[520px] aspect-[0.6/1]">
          <div
            className="absolute inset-0 rounded-[50%] overflow-hidden border-[6px] bg-black shadow-2xl px-4 py-6"
            style={{ borderColor: "rgba(168,109,205,0.25)" }}
          >
            <div ref={innerWrapRef} className="h-full">
              <div
                ref={scrollRootRef}
                className={[
                  "h-full",
                  "flex flex-col justify-center",
                  isDesktop ? "overflow-hidden" : "overflow-y-auto",
                  !isDesktop
                    ? "scroll-smooth pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    : "",
                ].join(" ")}
                style={{
                  WebkitOverflowScrolling: "touch",
                  touchAction: "pan-y",
                  overscrollBehavior: "contain",
                }}
              >
                {steps.map((step, index) => {
                  const active = activeId === step.id;

                  return (
                    <motion.div
                      key={step.id}
                      ref={(el) => (itemRefs.current[index] = el)}
                      data-id={step.id}
                      onMouseEnter={() => isDesktop && setActiveId(step.id)}
                      onPointerUp={() => {
                        if (!isDesktop) handleMobileActivate(step.id, index);
                      }}
                      layout
                      animate={{ height: active ? expandedH : collapsedH }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 30,
                        mass: 0.9,
                      }}
                      className="relative w-full overflow-hidden rounded-xl cursor-pointer select-none"
                      style={{
                        marginBottom: index !== steps.length - 1 ? GAP : 0,
                        willChange: "height, transform",
                        transform: "translateZ(0)",
                      }}
                    >
                      {/* MEDIA */}
                      <div className="absolute inset-0">
                        <img
                          src={step.media.src}
                          alt={step.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                        <div
                          className="absolute inset-0 transition-opacity duration-300"
                          style={{
                            backgroundColor: active
                              ? "rgba(0,0,0,0.40)"
                              : "rgba(0,0,0,0.70)",
                          }}
                        />
                      </div>

                      {/* CONTENT */}
                      <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
                        {!active && (
                          <span className="md:text-[16px] text-[10px] uppercase tracking-[0.25em] font-subheading opacity-90">
                            {step.title}
                          </span>
                        )}

                        <AnimatePresence mode="wait">
                          {active && (
                            <motion.div
                              key={step.id}
                              initial={{ opacity: 0, y: 6, scale: 0.985 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -6, scale: 0.985 }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 24,
                                mass: 0.85,
                              }}
                              className="flex flex-col items-center gap-2 md:gap-3"
                            >
                              <div
                                className="p-3 rounded-full backdrop-blur border"
                                style={{
                                  backgroundColor: "rgba(255,255,255,0.10)",
                                  borderColor: "rgba(255,255,255,0.20)",
                                }}
                              >
                                <step.icon
                                  className="w-6 h-6"
                                  style={{ color: THEME }}
                                />
                              </div>

                              <h3 className="text-[20px] md:text-2xl font-serif font-bold leading-tight">
                                {step.title}
                              </h3>

                              {/* IMPORTANT: better mobile readability */}
                              <p className="text-[12px] md:text-sm text-white/90 max-w-[290px] leading-relaxed">
                                {step.description}
                              </p>

                              <span
                                className="px-3 py-1 text-[10px] uppercase tracking-widest border rounded-full"
                                style={{
                                  borderColor: "rgba(255,255,255,0.30)",
                                  backgroundColor: "rgba(0,0,0,0.40)",
                                }}
                              >
                                {step.turnaround}
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM THREAD */}
        <div
          className="h-16 w-[4px] mt-[-4px]"
          style={{
            background:
              "linear-gradient(to top, rgba(168,109,205,0) 0%, rgba(168,109,205,1) 60%, rgba(168,109,205,1) 100%)",
          }}
        />
      </div>
    </section>
  );
}
