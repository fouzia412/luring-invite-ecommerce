"use client";

import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ───────────────── Flipping Card ───────────────── */
interface FlippingCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
}

const FlippingCard = memo(function FlippingCard({
  frontContent,
  backContent,
  className,
}: FlippingCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-[300px] sm:w-[320px] lg:w-[340px] perspective-[1200px] cursor-pointer"
      onClick={() => setFlipped((v) => !v)}
    >
      <div
        className={cn(
          "relative h-[360px] sm:h-[380px] lg:h-[400px] w-full rounded-2xl",
          "border border-border/40 bg-gradient-to-b from-white/5 to-white/2",
          "shadow-xl transition-transform duration-700 [transform-style:preserve-3d]",
          "sm:group-hover:[transform:rotateY(180deg)]",
          flipped && "[transform:rotateY(180deg)]",
          className
        )}
      >
        {/* Front */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden]">
          {frontContent}
        </div>

        {/* Back */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#A86DCD]/10 to-[#A86DCD]/5 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex h-full w-full flex-col items-center justify-center p-6 sm:p-7 text-center">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
});

/* ───────────────── Services Data ───────────────── */
const services = [
  {
    id: "ai-video",
    title: "AI Video Invitations",
    shortDesc: "Cinematic AI-powered love stories",
    fullDesc:
      "Bring your love story to life with cinematic AI-powered videos featuring 3D animations, emotional storytelling, and modern visual effects.",
    image:
      "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&h=600&fit=crop",
    link: "/collections?category=ai-video-invites",
  },
  {
    id: "digital-invites",
    title: "Digital Invitations",
    shortDesc: "Elegant, modern & eco-friendly invites",
    fullDesc:
      "Beautifully crafted digital invitations ranging from traditional Indian designs to sleek modern styles.",
    image: "/assets/digital-invites.webp",
    link: "/collections?category=digital-invites",
  },
  {
    id: "custom-logo",
    title: "Custom Logo Design",
    shortDesc: "Personalized monograms & wedding logos",
    fullDesc:
      "Unique couple monograms and signature wedding logos that become the visual identity of your celebration.",
    image: "/assets/custom-logo.webp",
    link: "/collections/logo",
  },
  {
    id: "caricature",
    title: "Caricature Art",
    shortDesc: "Fun & personalized couple portraits",
    fullDesc:
      "Playful hand-drawn caricatures filled with charm, emotions, and personal details.",
    image: "/assets/caricature.webp",
    link: "/collections/caricature",
  },
  {
    id: "stationery",
    title: "Complete Wedding Stationery",
    shortDesc: "A perfectly matched stationery suite",
    fullDesc:
      "Save-the-dates, invitations, menus, place cards, and thank-you notes — all beautifully coordinated.",
    image: "/assets/stationery.avif",
    link: "/collections/stationery",
  },
  {
    id: "magnets",
    title: "Customized Magnets & Badges",
    shortDesc: "Memorable wedding keepsakes",
    fullDesc:
      "Thoughtfully designed custom magnets and badges as wedding favours and lasting souvenirs.",
    image: "/assets/magnet.jpg",
    link: "/contact",
  },
  {
    id: "wedding-calendar",
    title: "Wedding Calendars",
    shortDesc: "Your memories, beautifully dated",
    fullDesc:
      "Personalized wedding calendars featuring your most cherished moments.",
    image: "/assets/wedding-cal.webp",
    link: "/contact",
  },
  {
    id: "pdf-invitations",
    title: "PDF Invitations",
    shortDesc: "Classic invites in digital format",
    fullDesc:
      "High-quality PDF invitations designed for easy sharing and printing.",
    image: "/assets/pdf-invite.jpg",
    link: "/contact",
  },
  {
    id: "festival-greetings",
    title: "Festival Greetings",
    shortDesc: "Personalized greetings for every festival",
    fullDesc:
      "Custom-designed festival greeting cards perfect for personal and professional wishes.",
    image: "/assets/festival.png",
    link: "/contact",
  },
];

/* ───────────────── Page ───────────────── */
export default function ServicesPage() {
  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center px-4"
        >
          <h1 className="text-4xl sm:text-6xl font-bold">
            Our <span className="text-[#A86DCD]">Wedding</span> Services
          </h1>
          <p className="mt-6 text-base sm:text-xl text-muted-foreground">
            Invitations, stationery, and keepsakes — crafted with love and
            precision.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 justify-items-center">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group flex justify-center"
              >
                <Link to={service.link}>
                  <FlippingCard
                    frontContent={
                      <div className="relative h-full">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                        <div className="relative z-10 h-full flex flex-col justify-end p-6">
                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                            {service.title}
                          </h3>
                          <p className="text-sm text-white/90">
                            {service.shortDesc}
                          </p>
                        </div>
                      </div>
                    }
                    backContent={
                      <>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#A86DCD] mb-3">
                          {service.title}
                        </h3>
                        <p className="text-sm sm:text-base text-foreground/90">
                          {service.fullDesc}
                        </p>
                        <Button
                          onClick={(e) => e.stopPropagation()}
                          className="mt-5 bg-[#A86DCD] hover:bg-[#A86DCD]/90"
                        >
                          Explore →
                        </Button>
                      </>
                    }
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30 text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Let’s create something unforgettable
        </h2>
        <Link to="/contact">
          <Button
            size="lg"
            className="px-10 py-7 text-lg bg-[#A86DCD] hover:bg-[#A86DCD]/90 shadow-xl"
          >
            Contact Us
          </Button>
        </Link>
      </section>
    </main>
  );
}
