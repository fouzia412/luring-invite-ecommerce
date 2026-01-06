import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import HeroSection from '@/components/home/HeroSection';
import CategoriesCarousel from '@/components/home/CategoriesCarousel';
import BestSellersCarousel from '@/components/home/BestSellersCarousel';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ProcessSection from '@/components/home/ProcessSection';
import ShowcaseParallax from '@/components/home/ShowcaseParallax';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQPreview from '@/components/home/FAQPreview';
import BannerTransition from '@/components/home/BannerTransition';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
         <BannerTransition />
        {/* <HeroSection /> */}
        <CategoriesCarousel />
        <BestSellersCarousel />
        <WhyChooseUs />
        <ProcessSection />
        <ShowcaseParallax />
        <TestimonialsSection />
        <FAQPreview />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
