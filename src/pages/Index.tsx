import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import BannerTransition from '@/components/home/BannerTransition';
import CategoriesCarousel from '@/components/home/CategoriesCarousel';
import BestSellersCarousel from '@/components/home/BestSellersCarousel';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ProcessSection from '@/components/home/ProcessSection';
import ShowcaseParallax from '@/components/home/ShowcaseParallax';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQPreview from '@/components/home/FAQPreview';
import StatsCounter from '@/components/home/StatsCounter';
import ServicesSection from '@/components/home/ServicesSection';
import ContactFormSection from '@/components/home/ContactFormSection';
import ProcessScrollSection from '@/components/home/ProcessScrollSection';
import TrendingVideo from '@/components/home/TrendingVideo';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <BannerTransition />
        <TrendingVideo />
        <CategoriesCarousel />
        <WhyChooseUs />
        <StatsCounter />
         <BestSellersCarousel />
        <ServicesSection />
        <ProcessScrollSection />
        <ProcessSection />
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
