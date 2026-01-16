import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Flame,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  X,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";

import { getTrendingVideosWithProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/ui/aurora-background";

type Platform = "local" | "youtube" | "instagram" | "pinterest";
type TrendingItem = ReturnType<typeof getTrendingVideosWithProducts>[number];

/** -------- helpers -------- */

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);

    const onChange = () => setMatches(mql.matches);
    onChange();

    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, [query]);

  return matches;
}

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

function inferPlatform(url: string, declared?: Platform): Platform {
  if (isLocalVideoUrl(url)) return "local";

  try {
    const u = new URL(url, window.location.origin);
    const host = u.hostname.toLowerCase();

    if (host.includes("youtube.com") || host.includes("youtu.be"))
      return "youtube";
    if (host.includes("instagram.com")) return "instagram";
    if (host.includes("pinterest.") || host.includes("pin.it"))
      return "pinterest";
  } catch {
    // ignore
  }

  return declared ?? "local";
}

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url, window.location.origin);

    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id || null;
    }

    const v = u.searchParams.get("v");
    if (v) return v;

    const parts = u.pathname.split("/").filter(Boolean);

    const shortsIndex = parts.indexOf("shorts");
    if (shortsIndex >= 0 && parts[shortsIndex + 1])
      return parts[shortsIndex + 1];

    const embedIndex = parts.indexOf("embed");
    if (embedIndex >= 0 && parts[embedIndex + 1]) return parts[embedIndex + 1];

    return null;
  } catch {
    return null;
  }
}

function getPinterestEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url, window.location.origin);
    const parts = u.pathname.split("/").filter(Boolean);

    const pinIndex = parts.indexOf("pin");
    const id = pinIndex >= 0 ? parts[pinIndex + 1] : null;
    if (!id) return null;

    return `https://assets.pinterest.com/ext/embed.html?id=${id}`;
  } catch {
    return null;
  }
}

function getEmbedSrc(platform: Platform, url: string): string | null {
  if (platform === "youtube") {
    const id = getYouTubeId(url);
    if (!id) return null;
    return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1&autoplay=1`;
  }

  if (platform === "pinterest") return getPinterestEmbedUrl(url);

  return null;
}

function normalizeInstagramUrl(url: string) {
  try {
    const u = new URL(url, window.location.origin);
    u.protocol = "https:";
    if (!u.pathname.endsWith("/")) u.pathname += "/";
    u.search = "";
    u.hash = "";
    return u.toString();
  } catch {
    return url;
  }
}

function useInstagramEmbed(url: string | null) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!url) return;

    const w = window as any;

    const process = () => {
      try {
        w.instgrm?.Embeds?.process?.();
        setReady(true);
      } catch {
        setReady(false);
      }
    };

    if (w.instgrm?.Embeds?.process) {
      process();
      return;
    }

    const existing = document.querySelector(
      'script[data-instgrm-embed="true"]'
    ) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", process, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://www.instagram.com/embed.js";
    script.setAttribute("data-instgrm-embed", "true");
    script.onload = process;
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, [url]);

  useEffect(() => {
    if (!url) return;
    const w = window as any;
    const t = setTimeout(() => {
      try {
        w.instgrm?.Embeds?.process?.();
        setReady(true);
      } catch {
        setReady(false);
      }
    }, 220);
    return () => clearTimeout(t);
  }, [url]);

  return ready;
}

function getBestThumbnail(
  item: TrendingItem,
  platform: Platform
): string | null {
  if (item.thumbnail) return item.thumbnail;

  if (platform === "youtube") {
    const id = getYouTubeId(item.url);
    if (!id) return null;
    return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  }

  return null;
}

/** -------- component -------- */

export default function TrendingVideo() {
  const items = useMemo(() => getTrendingVideosWithProducts(), []);
  const [selected, setSelected] = useState<TrendingItem | null>(null);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  // ✅ Correct TS type import: EmblaOptionsType comes from "embla-carousel"
  const emblaOptions = useMemo<EmblaOptionsType>(
    () => ({
      loop: true,
      align: isDesktop ? "start" : "center",
      slidesToScroll: 1,
      dragFree: false,
      // ✅ valid: 'trimSnaps' | 'keepSnaps' | false
      containScroll: false,
    }),
    [isDesktop]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!selected) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [selected]);

  const handleWhatsAppEnquiry = (product: TrendingItem["product"]) => {
    const currentUrl = window.location.origin + `/product/${product.slug}`;

    const message = encodeURIComponent(
      `Hi! I'm interested in this product:\n\n` +
        `📌 Product: ${product.title}\n` +
        `💰 Price: Starting at ₹${product.priceFrom}\n` +
        `🔗 Link: ${currentUrl}\n\n` +
        `Please share more details.`
    );

    window.open(
      `https://api.whatsapp.com/send?phone=919121080131&text=${message}`,
      "_blank"
    );
  };

  return (
    <AuroraBackground
      className="h-auto min-h-0 w-full items-stretch justify-start py-0"
      showRadialGradient
    >
      <section className="section-padding w-full relative z-10">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mb-8"
          >
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Flame className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Trending Now
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground">
                Trending Videos
              </h2>
            </div>

            <div className="mt-4 flex justify-center md:mt-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2">
              <Button asChild variant="ctaOutline" className="group">
                <Link to="/collections">
                  View All
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Carousel */}
          <div className="relative">
            <button
              type="button"
              onClick={scrollPrev}
              className="
                flex items-center justify-center
                absolute left-2 sm:left-0 top-1/2 -translate-y-1/2
                z-10
                w-10 h-10 sm:w-11 sm:h-11
                rounded-full
                bg-background/90 border border-border shadow-md
                hover:bg-muted
                sm:-translate-x-1/2
              "
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={scrollNext}
              className="
                flex items-center justify-center
                absolute right-2 sm:right-0 top-1/2 -translate-y-1/2
                z-10
                w-10 h-10 sm:w-11 sm:h-11
                rounded-full
                bg-background/90 border border-border shadow-md
                hover:bg-muted
                sm:translate-x-1/2
              "
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div ref={emblaRef} className="overflow-hidden w-full">
              <div className="flex gap-4 px-4 md:px-0 items-stretch">
                {items.map((item, index) => {
                  const resolvedPlatform = inferPlatform(
                    item.url,
                    item.platform as Platform
                  );
                  const thumb = getBestThumbnail(item, resolvedPlatform);

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.03 }}
                      className="
                        flex-shrink-0
                        basis-[88%]
                        sm:basis-[52%]
                        md:basis-[33.333%]
                        lg:basis-[25%]
                      "
                    >
                      <div className="w-full h-full rounded-2xl border border-border bg-background shadow-sm overflow-hidden flex flex-col">
                        <div className="relative aspect-[9/16] bg-muted">
                          {thumb ? (
                            <img
                              src={thumb}
                              alt={item.product.title}
                              className="w-full h-full object-cover"
                              draggable={false}
                              loading="lazy"
                            />
                          ) : resolvedPlatform === "local" ? (
                            <video
                              src={item.url}
                              className="w-full h-full object-cover"
                              muted
                              playsInline
                              loop
                              preload="metadata"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
                              <div className="text-center px-5">
                                <div className="text-[11px] font-semibold text-muted-foreground mb-2">
                                  {resolvedPlatform.toUpperCase()}
                                </div>
                                <div className="text-sm text-foreground/80">
                                  Tap to preview
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="absolute top-3 right-3 flex gap-2">
                            {item.product.bestSeller && (
                              <span className="bg-primary text-primary-foreground text-[11px] font-semibold px-2.5 py-1 rounded-full">
                                Best Seller
                              </span>
                            )}
                            {item.product.isNew && (
                              <span className="bg-foreground text-background text-[11px] font-semibold px-2.5 py-1 rounded-full">
                                New
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => setSelected(item)}
                            className="absolute inset-0 flex items-center justify-center"
                            aria-label="Play video"
                          >
                            <span className="w-14 h-14 rounded-full bg-background/85 border border-border flex items-center justify-center shadow-sm hover:scale-105 transition-transform">
                              <Play className="w-6 h-6" />
                            </span>
                          </button>
                        </div>

                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex flex-wrap gap-2 mb-2">
                            {item.product.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <h3 className="font-semibold text-foreground leading-snug line-clamp-1">
                            {item.product.title}
                          </h3>

                          <div className="mt-4 flex gap-2">
                            <Button
                              asChild
                              variant="hero"
                              size="default"
                              className="w-full flex-1"
                            >
                              <Link to={`/product/${item.product.slug}`}>
                                View
                              </Link>
                            </Button>

                            <Button
                              type="button"
                              variant="whatsapp"
                              size="default"
                              className="flex-1"
                              onClick={() =>
                                handleWhatsAppEnquiry(item.product)
                              }
                            >
                              WhatsApp
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {selected && (
            <TrendingModal
              selected={selected}
              onClose={() => setSelected(null)}
              onWhatsApp={handleWhatsAppEnquiry}
            />
          )}
        </AnimatePresence>
      </section>
    </AuroraBackground>
  );
}

/** Modal */
function TrendingModal({
  selected,
  onClose,
  onWhatsApp,
}: {
  selected: TrendingItem;
  onClose: () => void;
  onWhatsApp: (p: TrendingItem["product"]) => void;
}) {
  const resolvedPlatform = inferPlatform(
    selected.url,
    selected.platform as Platform
  );
  const normalizedInstaUrl =
    resolvedPlatform === "instagram"
      ? normalizeInstagramUrl(selected.url)
      : selected.url;

  const embedSrc =
    resolvedPlatform === "local"
      ? null
      : getEmbedSrc(resolvedPlatform, normalizedInstaUrl);
  const instaReady = useInstagramEmbed(
    resolvedPlatform === "instagram" ? normalizedInstaUrl : null
  );

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-foreground/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        className="
          relative z-10 w-full
          sm:max-w-[460px]
          bg-background
          rounded-t-2xl sm:rounded-2xl
          overflow-hidden border border-border shadow-xl
          flex flex-col
        "
        style={{ maxHeight: "calc(100vh - 16px)" }}
        initial={{ y: 16, scale: 0.99, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 16, scale: 0.99, opacity: 0 }}
        transition={{ duration: 0.18 }}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">Preview</p>
            <p className="font-semibold truncate">{selected.product.title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 min-h-0 bg-black">
          {resolvedPlatform === "local" ? (
            <video
              src={selected.url}
              className="w-full h-full object-contain"
              controls
              playsInline
            />
          ) : resolvedPlatform === "instagram" ? (
            <div className="w-full h-full bg-white overflow-auto">
              <div className="p-2">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={normalizedInstaUrl}
                  data-instgrm-version="14"
                  style={{ margin: 0, width: "100%" }}
                />
                {!instaReady && (
                  <div className="text-center text-sm text-muted-foreground py-4">
                    Loading Instagram preview...
                  </div>
                )}
              </div>
            </div>
          ) : embedSrc ? (
            <iframe
              src={embedSrc}
              className="w-full h-full"
              allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              title="Video Preview"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white p-6 text-center">
              <div>
                <p className="mb-3">Embed not available for this link.</p>
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Open video
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="relative z-10 shrink-0 px-4 py-3 border-t border-border bg-background">
          <div className="flex gap-2">
            <Button asChild variant="hero" className="w-full flex-1">
              <Link to={`/product/${selected.product.slug}`}>View</Link>
            </Button>

            <Button
              type="button"
              variant="whatsapp"
              className="flex-1"
              onClick={() => onWhatsApp(selected.product)}
            >
              WhatsApp
            </Button>
          </div>

          <div className="mt-2 text-[11px] text-muted-foreground">
            If preview doesn’t load, open:
            <a
              href={selected.url}
              target="_blank"
              rel="noreferrer"
              className="underline ml-1"
            >
              Link
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
