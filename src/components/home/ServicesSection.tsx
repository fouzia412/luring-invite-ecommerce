"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ── Flipping Card Component ────────────────────────────────────────────────
interface FlippingCardProps {
  className?: string;
  height?: number;
  width?: number;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
}

function FlippingCard({
  className,
  frontContent,
  backContent,
  height = 380,
  width = 340,
}: FlippingCardProps) {
  return (
    <div
      className="group/flip perspective-[1000px]"
      style={
        {
          "--height": `${height}px`,
          "--width": `${width}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "relative h-[var(--height)] w-[var(--width)] rounded-2xl border border-border/40",
          "bg-gradient-to-b from-white/5 to-white/2 dark:from-black/40 dark:to-black/30",
          "shadow-xl shadow-black/10 transition-all duration-700 [transform-style:preserve-3d]",
          "group-hover/flip:[transform:rotateY(180deg)]",
          className
        )}
      >
        {/* Front */}
        <div className="absolute inset-0 h-full w-full rounded-2xl [backface-visibility:hidden] [transform:rotateY(0deg)]">
          <div className="relative h-full w-full overflow-hidden rounded-2xl">
            {frontContent}
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-br from-[#A86DCD]/10 to-[#A86DCD]/5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Service Data with Unsplash images (wedding/invitation theme) ───────────
const services = [
  {
    id: "ai-video",
    title: "AI Video Invitations",
    shortDesc: "Cinematic AI-powered video stories",
    fullDesc:
      "Bring your love story to life with stunning 3D animated videos, emotional storytelling and modern cinematic effects.",
    image:
      "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&h=600&fit=crop",

    link: "/collections?category=ai-video-invites",
  },
  {
    id: "digital-invites",
    title: "Digital Invitations",
    shortDesc: "Elegant & modern digital designs",
    fullDesc:
      "From classic Indian styles to ultra-minimalist modern designs — beautiful, shareable and eco-friendly.",
    image: "/assets/digital-invites.webp",
    link: "/collections?category=digital-invites",
  },
  {
    id: "custom-logo",
    title: "Custom Logo Design",
    shortDesc: "Unique monograms & signatures",
    fullDesc:
      "Personalized couple initials, wedding monograms and elegant logos that become the identity of your celebration.",
    image: "/assets/custom-logo.webp",
    link: "/collections/logo",
  },
  {
    id: "caricature",
    title: "Caricature Art",
    shortDesc: "Playful personalized portraits",
    fullDesc:
      "Fun, hand-drawn style caricatures full of love, emotion and little inside jokes that make guests smile.",
    image: "/assets/caricature.webp",
    link: "/collections/caricature",
  },
  {
    id: "stationery",
    title: "Complete Stationery",
    shortDesc: "Full coordinated suite",
    fullDesc:
      "Save the dates, main invitations, menus, place cards, thank you notes — everything beautifully matched.",
    image: "/assets/stationery.avif",
    link: "/collections/stationery",
  },
  {
    id: "magnets",
    title: "Customized Magnets",
    shortDesc: "Memorable keepsakes",
    fullDesc:
      "Beautiful custom magnets — perfect wedding favours, event souvenirs and lasting mementos for your guests.",
    image: "/assets/magnets.webp",
    link: "/contact",
  },
];

// ── Main Component ──────────────────────────────────────────────────────────
export default function ServicesSection() {
  return (
    <section className="py-10  bg-gradient-to-b from-background to-muted/30">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 md:mb-20"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
            Our <span style={{ color: "#A86DCD" }}>Special</span> Services
          </h2>
          <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            From emotional video invitations to timeless printed stationery — we
            create every detail with love
          </p>
        </motion.div>

        {/* Flipping Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 justify-items-center">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <Link to={service.link} className="block h-full">
                <FlippingCard
                  height={400}
                  width={360}
                  frontContent={
                    <div className="relative h-full">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="absolute inset-0 h-full w-full object-cover brightness-[0.85]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <div className="relative z-10 flex h-full flex-col justify-end p-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                          {service.title}
                        </h3>
                        <p className="text-white/90 text-base">
                          {service.shortDesc}
                        </p>
                      </div>
                    </div>
                  }
                  backContent={
                    <div className="space-y-6">
                      <h3
                        className="text-2xl md:text-3xl font-bold mb-4"
                        style={{ color: "#A86DCD" }}
                      >
                        {service.title}
                      </h3>
                      <p className="text-base leading-relaxed text-foreground/90">
                        {service.fullDesc}
                      </p>
                      <div className="pt-4">
                        <Button
                          size="lg"
                          className="bg-[#A86DCD] hover:bg-[#A86DCD]/90 text-white shadow-lg shadow-[#A86DCD]/20"
                        >
                          Explore Collection →
                        </Button>
                      </div>
                    </div>
                  }
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-16 md:mt-24"
        >
          <Link to="/services">
            <Button
              size="lg"
              className="text-lg px-10 py-7 bg-[#A86DCD] hover:bg-[#A86DCD]/90 shadow-xl shadow-[#A86DCD]/25"
            >
              Discover All Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
