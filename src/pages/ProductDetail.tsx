import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { getProductBySlug } from "@/data/products";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Play, X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

import {
  inferPlatform,
  getPinterestEmbedUrl,
  getYouTubeEmbed,
  getYouTubeThumbnail,
  normalizeInstagramUrl,
  type VideoPlatform,
} from "@/lib/video";

/* ✅ Instagram script loader hook */
function useInstagramEmbed(url: string | null) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!url) return;

    const w = window as unknown as { instgrm?: any };

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
    const w = window as unknown as { instgrm?: any };
    const t = window.setTimeout(() => {
      try {
        w.instgrm?.Embeds?.process?.();
        setReady(true);
      } catch {
        setReady(false);
      }
    }, 220);

    return () => window.clearTimeout(t);
  }, [url]);

  return ready;
}

type MediaItem =
  | { kind: "image"; src: string }
  | {
      kind: "video";
      url: string;
      platform: VideoPlatform;
      thumbnail: string;
    };

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug || "");

  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    language: "English",
    notes: "",
  });

  // ✅ guard
  if (!product) return <div className="p-6">Product not found</div>;

  /* -------------------- Build Media Items (Video optional + Images optional) -------------------- */
  const mediaItems: MediaItem[] = useMemo(() => {
    const images = Array.from(
      new Set([product.thumbnail, ...(product.previewImages || [])].filter(Boolean))
    );

    const hasVideo = Boolean(product.video?.url);

    const platform: VideoPlatform | null = hasVideo
      ? inferPlatform(product.video!.url, product.video!.platform)
      : null;

    // ✅ Thumbnail optional logic:
    // 1) custom thumbnail -> use it
    // 2) if YouTube -> auto thumbnail
    // 3) else fallback to product thumbnail
    const videoThumb =
      product.video?.thumbnail ||
      (platform === "youtube" ? getYouTubeThumbnail(product.video!.url) : null) ||
      product.thumbnail;

    const list: MediaItem[] = [];

    if (hasVideo && platform) {
      list.push({
        kind: "video",
        url: product.video!.url,
        platform,
        thumbnail: videoThumb,
      });
    }

    images.forEach((src) => list.push({ kind: "image", src }));

    return list.length ? list : [{ kind: "image", src: product.thumbnail }];
  }, [product]);

  const [activeMedia, setActiveMedia] = useState<MediaItem>(mediaItems[0]);
  const [openVideo, setOpenVideo] = useState(false);

  // reset when product changes
  useEffect(() => {
    setActiveMedia(mediaItems[0]);
    setOpenVideo(false);
  }, [product.slug, mediaItems]);

  // lock body scroll when modal open
  useEffect(() => {
    if (!openVideo) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openVideo]);

  const currentUrl = window.location.href;

  const handleWhatsAppEnquiry = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in: ${product.title}\n\nProduct Link: ${currentUrl}\nPrice: Starting at ₹${product.priceFrom}\n\nMy Details:\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nOccasion Date: ${formData.date}\nLanguage: ${formData.language}\nNotes: ${formData.notes}`
    );

    window.open(
      `https://api.whatsapp.com/send?phone=919121080131&text=${message}`,
      "_blank"
    );
  };

  const handleEmailEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Enquiry Submitted!", description: "We will contact you soon." });
  };

  // Instagram embed processing only if video + instagram
  const instaReady = useInstagramEmbed(
    openVideo && activeMedia.kind === "video" && activeMedia.platform === "instagram"
      ? normalizeInstagramUrl(activeMedia.url)
      : null
  );

  const renderVideoPlayer = () => {
    if (activeMedia.kind !== "video") return null;

    // local
    if (activeMedia.platform === "local") {
      return (
        <video
          src={activeMedia.url}
          controls
          autoPlay
          playsInline
          poster={activeMedia.thumbnail}
          className="w-full h-full object-contain"
        />
      );
    }

    // youtube
    if (activeMedia.platform === "youtube") {
      const embed = getYouTubeEmbed(activeMedia.url);
      if (!embed) {
        return (
          <div className="w-full h-full flex items-center justify-center text-white p-6 text-center">
            <a
              href={activeMedia.url}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Open YouTube Video
            </a>
          </div>
        );
      }

      return (
        <iframe
          src={embed}
          className="w-full h-full"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          title="YouTube Video"
        />
      );
    }

    // instagram
    if (activeMedia.platform === "instagram") {
      const normalized = normalizeInstagramUrl(activeMedia.url);

      return (
        <div className="w-full h-full bg-white overflow-auto">
          <div className="p-2">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={normalized}
              data-instgrm-version="14"
              style={{ margin: 0, width: "100%" }}
            />
            {!instaReady && (
              <div className="text-center text-sm text-muted-foreground py-4">
                Loading Instagram preview...
              </div>
            )}
            <div className="text-center text-xs text-muted-foreground pb-3">
              If it doesn’t load,{" "}
              <a className="underline" href={normalized} target="_blank" rel="noreferrer">
                open on Instagram
              </a>
              .
            </div>
          </div>
        </div>
      );
    }

    // pinterest
    if (activeMedia.platform === "pinterest") {
      const embed = getPinterestEmbedUrl(activeMedia.url);

      if (!embed) {
        return (
          <div className="w-full h-full flex items-center justify-center text-white p-6 text-center">
            <a
              href={activeMedia.url}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Open Pinterest Video
            </a>
          </div>
        );
      }

      return (
        <iframe
          src={embed}
          className="w-full h-full"
          allow="encrypted-media"
          title="Pinterest Embed"
        />
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-8">
        <div className="container-custom section-padding">
          <Link
            to={`/collections/${product.collectionSlug}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to {product.collection}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            {/* ✅ GALLERY */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Main Preview */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-muted">
                {activeMedia.kind === "image" ? (
                  <img
                    src={activeMedia.src}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setOpenVideo(true)}
                    className="w-full h-full relative"
                  >
                    <img
                      src={activeMedia.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-background/90 border border-border w-16 h-16 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                        <Play className="w-7 h-7 text-primary" />
                      </span>
                    </div>

                    {/* Platform tag */}
                    <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-background/90 border border-border">
                      {activeMedia.platform.toUpperCase()}
                    </span>
                  </button>
                )}
              </div>

              {/* Thumbnails (Mobile scroll ✅ + Desktop grid ✅) */}
              <div className="flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible">
                {mediaItems.slice(0, 8).map((m, idx) => {
                  const isActive =
                    m.kind === activeMedia.kind &&
                    (m.kind === "image"
                      ? m.src === (activeMedia as any).src
                      : m.url === (activeMedia as any).url);

                  const thumb = m.kind === "image" ? m.src : m.thumbnail;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveMedia(m)}
                      className={[
                        "relative shrink-0 lg:shrink aspect-square w-[84px] lg:w-auto rounded-xl overflow-hidden border transition-all",
                        isActive ? "border-primary ring-2 ring-primary/20" : "border-border",
                      ].join(" ")}
                    >
                      <img
                        src={thumb}
                        alt="preview"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        draggable={false}
                      />

                      {m.kind === "video" && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                          <span className="w-9 h-9 rounded-full bg-background/90 border border-border flex items-center justify-center">
                            <Play className="w-4 h-4 text-primary" />
                          </span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* ✅ VIDEO MODAL */}
              <AnimatePresence>
                {openVideo && activeMedia.kind === "video" && (
                  <motion.div
                    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    role="dialog"
                    aria-modal="true"
                  >
                    <div
                      className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                      onClick={() => setOpenVideo(false)}
                      aria-hidden="true"
                    />

                    <motion.div
                      className="relative z-10 w-full sm:max-w-[520px] bg-background rounded-t-2xl sm:rounded-2xl overflow-hidden border border-border shadow-xl flex flex-col"
                      style={{ maxHeight: "calc(100vh - 16px)" }}
                      initial={{ y: 16, scale: 0.98, opacity: 0 }}
                      animate={{ y: 0, scale: 1, opacity: 1 }}
                      exit={{ y: 16, scale: 0.98, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                        <p className="font-semibold truncate pr-3">{product.title}</p>
                        <button
                          onClick={() => setOpenVideo(false)}
                          className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center"
                          aria-label="Close"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Player */}
                      <div className="bg-black min-h-[55vh] sm:min-h-[460px]">
                        {renderVideoPlayer()}
                      </div>

                      {/* Footer */}
                      <div className="p-4 border-t border-border bg-background flex gap-2">
                        <Button asChild variant="hero" className="flex-1">
                          <Link to={`/product/${product.slug}`}>View</Link>
                        </Button>

                        <Button
                          variant="whatsapp"
                          className="flex-1"
                          onClick={handleWhatsAppEnquiry}
                        >
                          WhatsApp
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ✅ DETAILS + FORM */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Product Info */}
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-muted px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-2">
                  {product.title}
                </h1>

                <p className="text-muted-foreground">{product.description}</p>
              </div>

              {/* Included */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h3 className="font-extrabold text-2xl">What's Included</h3>
                <ul className="space-y-2">
                  {product.whatIncluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Enquiry Form */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-extrabold text-2xl mb-4">Enquire Now</h3>

                <form onSubmit={handleEmailEnquiry} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />

                  <Input
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />

                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />

                  <Input
                    type="date"
                    placeholder="Occasion Date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />

                  <select
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                    value={formData.language}
                    onChange={(e) =>
                      setFormData({ ...formData, language: e.target.value })
                    }
                  >
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Telugu</option>
                  </select>

                  <Textarea
                    placeholder="Additional notes..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="whatsapp"
                      size="lg"
                      onClick={handleWhatsAppEnquiry}
                    >
                      WhatsApp Enquiry
                    </Button>

                    <Button type="submit" variant="cta" size="lg">
                      Email Enquiry
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
