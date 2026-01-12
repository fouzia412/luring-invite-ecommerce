"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  PenTool,
  Layers,
  Play,
  RefreshCw,
  CheckCircle,
} from "lucide-react";

/* ---------------- TYPES ---------------- */

type Media = { type: "image"; src: string } | { type: "video"; src: string };

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
    title: "Logo Design",
    description:
      "We create a unique couple monogram or wedding logo that reflects your personality.",
    turnaround: "24–48 hrs",
    icon: Palette,
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    },
  },
  {
    id: 1,
    title: "Caricature",
    description:
      "Our artists craft a fun, personalized caricature of you and your partner.",
    turnaround: "48–72 hrs",
    icon: PenTool,
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    },
  },
  {
    id: 2,
    title: "Slides Design",
    description:
      "Beautiful invitation slides with typography, color balance and spacing.",
    turnaround: "24–48 hrs",
    icon: Layers,
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&w=1600&q=80",
    },
  },
  {
    id: 3,
    title: "Video Preview",
    description:
      "Preview your cinematic invitation with music and motion effects.",
    turnaround: "48–72 hrs",
    icon: Play,
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    },
  },
  {
    id: 4,
    title: "Revisions",
    description:
      "We refine everything based on your feedback until it feels perfect.",
    turnaround: "24–48 hrs",
    icon: RefreshCw,
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80",
    },
  },
  {
    id: 5,
    title: "Final Delivery",
    description:
      "Receive your final invitation in formats ready to share everywhere.",
    turnaround: "Same day",
    icon: CheckCircle,
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80",
    },
  },
];

/* ---------------- COMPONENT ---------------- */

export default function ProcessAccordion() {
  const [activeId, setActiveId] = useState(0);

  return (
    <section className="py-10 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-5xl font-bold">
            Our <span className="text-primary">Process</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            A clear journey from concept to final delivery.
          </p>
        </div>

        {/* ================= DESKTOP (Hover Accordion) ================= */}
        <div className="hidden lg:flex gap-3 h-[460px] max-w-6xl mx-auto">
          {steps.map((step) => {
            const isActive = activeId === step.id;

            return (
              <motion.div
                key={step.id}
                layout
                onMouseEnter={() => setActiveId(step.id)}
                className={`relative overflow-hidden rounded-2xl cursor-pointer border border-border/40
                ${
                  isActive ? "flex-[2.4] shadow-xl" : "flex-[0.7] bg-muted/30"
                }`}
              >
                {/* Media */}
                {step.media.type === "image" ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${step.media.src})` }}
                  />
                ) : (
                  <video
                    src={step.media.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-black/55" />

                <div className="relative h-full p-6 flex flex-col text-white">
                  <div className="flex justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                      <step.icon size={20} />
                    </div>
                    {isActive && (
                      <span className="text-3xl font-bold opacity-20">
                        0{step.id + 1}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 flex items-center">
                    <AnimatePresence mode="wait">
                      {isActive ? (
                        <motion.div
                          key="active"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.25 }}
                        >
                          <span className="text-xs uppercase tracking-wide text-white/70">
                            {step.turnaround}
                          </span>
                          <h3 className="text-2xl font-bold mt-2 mb-3">
                            {step.title}
                          </h3>
                          <p className="text-sm text-white/85 max-w-[340px]">
                            {step.description}
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="inactive"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="w-full flex justify-center"
                        >
                          <h3 className="text-sm font-bold uppercase tracking-widest rotate-[-90deg] text-white/80">
                            {step.title}
                          </h3>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="process-underline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ================= MOBILE + TABLET (Vertical Accordion – NOT CARDS) ================= */}
        <div className="lg:hidden divide-y divide-border/60">
          {steps.map((step) => {
            const isActive = activeId === step.id;

            return (
              <div key={step.id}>
                {/* Header row */}
                <button
                  onClick={() => setActiveId(isActive ? -1 : step.id)}
                  className="w-full flex items-center gap-4 py-5 text-left"
                >
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                    <step.icon size={18} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {step.turnaround}
                    </p>
                  </div>
                </button>

                {/* Expand */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden pb-6"
                    >
                      {/* Media */}
                      <div className="mt-2 rounded-xl overflow-hidden">
                        {step.media.type === "image" ? (
                          <img
                            src={step.media.src}
                            alt={step.title}
                            className="w-full h-48 object-cover"
                          />
                        ) : (
                          <video
                            src={step.media.src}
                            muted
                            autoPlay
                            loop
                            playsInline
                            className="w-full h-48 object-cover"
                          />
                        )}
                      </div>

                      <p className="mt-4 text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
