import { useCallback, useEffect, useState } from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

import CategoriesCarousel from "@/components/home/CategoriesCarousel";
import BestSellersCarousel from "@/components/home/BestSellersCarousel";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ProcessScrollSection from "@/components/home/ProcessScrollSection";
import ShowcaseParallax from "@/components/home/ShowcaseParallax";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQPreview from "@/components/home/FAQPreview";
import StatsCounter from "@/components/home/StatsCounter";
import ServicesSection from "@/components/home/ServicesSection";
import ContactFormSection from "@/components/home/ContactFormSection";
import TrendingVideo from "@/components/home/TrendingVideo";
import CollectionCarousel from "@/components/home/CollectionCarousel";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import MouseButterflyTrail from "@/components/ui/MouseButterflyTrail";

import InviteSection from "@/components/InviteSection";
import AboutModal from "@/components/AboutModal";

const Index = () => {
  // ✅ FIX: avoid window.open collision, define state
  const [aboutOpen, setAboutOpen] = useState(false);

  const openAbout = useCallback(() => setAboutOpen(true), []);
  const closeAbout = useCallback(() => setAboutOpen(false), []);

  // ✅ FIX: remove “white space on revisit” caused by preserved scroll position
  useEffect(() => {
    window.scrollTo(0, 0);
    setAboutOpen(false);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      {/* <MouseButterflyTrail size={300} gifSrc="/images/Butterfly-2.gif" /> */}

      <Header />

      <main className="relative z-10">
        <ScrollExpandMedia
          mediaType="video"
          mediaSrc="/videos/d.mp4"
          bgImageSrc="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          title="Outrights Luring Invite"
          date="2025"
          scrollToExpand="Scroll to expand"
        />

        {/* Envelope scroll → modal */}
        <InviteSection  />

        {/* <AboutModal
          open={aboutOpen}
          onClose={closeAbout}
          enableSound
          //soundSrc="/sounds/envelope-open.mp3"
        /> */}

        <TrendingVideo />
        <ServicesSection />
        <WhyChooseUs />
        {/* <CategoriesCarousel /> */}
       
        <ProcessScrollSection />
        <BestSellersCarousel />
        <StatsCounter />
        <TestimonialsSection />
        {/* <CollectionCarousel /> */}
       
       
        {/* <ShowcaseParallax /> */}
        {/* <FAQPreview /> */}
        {/* <ContactFormSection /> */}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
