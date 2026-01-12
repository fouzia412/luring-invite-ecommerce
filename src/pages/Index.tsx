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
import { useScreenSize } from "@/hooks/use-screen-size";

const Index = () => {
  const screenSize = useScreenSize();

  return (
    <div className="relative min-h-screen bg-background">
      {/* 🌸 Full-page Butterfly Trail */}
      <MouseButterflyTrail size={300} gifSrc="/images/Butterfly-2.gif" />

      {/* Site UI */}
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

        <TrendingVideo />
        <CategoriesCarousel />
        <WhyChooseUs />
        <StatsCounter />
        <BestSellersCarousel />
        <CollectionCarousel />
        <ServicesSection />
        <ProcessScrollSection />
        <ShowcaseParallax />
        <TestimonialsSection />
        <FAQPreview />
        <ContactFormSection />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
