import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Flame,
  ArrowRight,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

import { getBestSellers, type Product, type VideoPlatform } from "@/data/products";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/ui/aurora-background";

/* -------------------------------- helpers -------------------------------- */

function isLocalVideoUrl(url: string): boolean {
  const lower = url.toLowerCase().split("?")[0].split("#")[0];
  return (
    lower.endsWith(".mp4") ||
    lower.endsWith(".webm") ||
    lower.endsWith(".ogg") ||
    lower.startsWith("/videos/") ||
    lower.startsWith("videos/")
  );
}

function inferPlatform(url: string, declared?: VideoPlatform): VideoPlatform {
  if (isLocalVideoUrl(url)) return "local";
  try {
    const u = new URL(url, window.location.origin);
    const host = u.hostname.toLowerCase();
    if (host.includes("youtube")) return "youtube";
    if (host.includes("instagram")) return "instagram";
    if (host.includes("pinterest") || host.includes("pin.it"))
      return "pinterest";
  } catch {}
  return declared ?? "local";
}

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url, window.location.origin);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const parts = u.pathname.split("/").filter(Boolean);
    const idx = parts.indexOf("shorts");
    if (idx >= 0) return parts[idx + 1];
  } catch {}
  return null;
}

function getEmbedSrc(platform: VideoPlatform, url: string) {
  if (platform === "youtube") {
    const id = getYouTubeId(url);
    if (!id) return null;
    return `https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1`;
  }
  return null;
}

/* -------------------------------- component -------------------------------- */

export default function BestSellersCarousel() {
  const bestSellers = useMemo(() => getBestSellers(), []);
  const [selected, setSelected] = useState<Product | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!selected) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [selected]);

  const handleWhatsAppEnquiry = (product: Product) => {
    const url = `${window.location.origin}/product/${product.slug}`;
    const msg = encodeURIComponent(
      `Hi! I'm interested in:\n\n📌 ${product.title}\n💰 From ₹${product.priceFrom}\n🔗 ${url}`
    );
    window.open(
      `https://api.whatsapp.com/send?phone=919121080131&text=${msg}`,
      "_blank"
    );
  };

  return (
    <AuroraBackground className="relative w-full py-24">
      <section className="relative z-10">
        <div className="container-custom">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 text-primary mb-4">
                <Flame className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase">
                  Trending Now
                </span>
              </div>
              <h2 className="text-4xl font-heading">Best Sellers</h2>
            </div>

            <Link to="/collections" className="relative z-20 mt-4 md:mt-0">
              <Button variant="ctaOutline">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* CAROUSEL */}
          <div className="relative">
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 z-20 -translate-y-1/2 bg-background w-10 h-10 rounded-full flex items-center justify-center"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 z-20 -translate-y-1/2 bg-background w-10 h-10 rounded-full flex items-center justify-center"
            >
              <ChevronRight />
            </button>

            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex gap-6">
                {bestSellers.map((product) => (
                  <div
                    key={product.id}
                    className="flex-none w-[320px] relative"
                  >
                    <div className="relative rounded-xl overflow-hidden">
                      <Link
                        to={`/product/${product.slug}`}
                        className="block"
                      >
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-[420px] object-cover"
                        />
                      </Link>

                      {product.video?.url && (
                        <button
                          onClick={() => setSelected(product)}
                          className="absolute inset-0 z-10 flex items-center justify-center"
                        >
                          <span className="bg-white/80 w-14 h-14 rounded-full flex items-center justify-center">
                            <Play />
                          </span>
                        </button>
                      )}

                      {/* CTA */}
                      <div className="absolute bottom-4 left-4 right-4 z-20 flex gap-2">
                        <Button asChild variant="hero" className="flex-1">
                          <Link to={`/product/${product.slug}`}>
                            View Details
                          </Link>
                        </Button>

                        <Button
                          variant="whatsapp"
                          className="flex-1"
                          onClick={() => handleWhatsAppEnquiry(product)}
                        >
                          WhatsApp
                        </Button>
                      </div>
                    </div>

                    <h3 className="mt-4 font-normal">
                      {product.title}
                    </h3>
                    {/* <p className="text-primary font-bold">
                      From ₹{product.priceFrom}
                    </p> */}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MODAL */}
          <AnimatePresence>
            {selected && (
              <BestSellerVideoModal
                selected={selected}
                onClose={() => setSelected(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </section>
    </AuroraBackground>
  );
}

/* -------------------------------- modal -------------------------------- */

function BestSellerVideoModal({
  selected,
  onClose,
}: {
  selected: Product;
  onClose: () => void;
}) {
  const platform = inferPlatform(selected.video!.url);
  const embedSrc =
    platform === "local"
      ? null
      : getEmbedSrc(platform, selected.video!.url);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      <motion.div
        className="relative z-10 w-[380px] bg-background rounded-xl overflow-hidden"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between p-4 border-b">
          <h4 className="font-semibold">{selected.title}</h4>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="bg-black h-[420px]">
          {platform === "local" ? (
            <video
              src={selected.video!.url}
              controls
              className="w-full h-full"
            />
          ) : (
            <iframe
              src={embedSrc!}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
        </div>

        <div className="p-4 flex gap-2">
          <Button asChild className="flex-1">
            <Link to={`/product/${selected.slug}`}>View</Link>
          </Button>
          <Button
            variant="whatsapp"
            className="flex-1"
            onClick={() =>
              window.open(
                `https://api.whatsapp.com/send?phone=919121080131`,
                "_blank"
              )
            }
          >
            WhatsApp
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
