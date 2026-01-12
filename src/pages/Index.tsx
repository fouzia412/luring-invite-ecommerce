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
import ButterflyScrollReveal from '@/components/home/ButterflyScrollReveal';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ButterflyScrollReveal
      imageSrc="https://assets-global.website-files.com/63ec206c5542613e2e5aa784/643312a6bc4ac122fc4e3afa_main%20home.webp"
        videoSrc="/videos/d.mp4"
        pinEnd="+=120%"
        markers={false}
    />
        {/* <BannerTransition /> */}
        <TrendingVideo />
        <CategoriesCarousel />
        <WhyChooseUs />
        <StatsCounter />
         <BestSellersCarousel />
        <ServicesSection />
        <ProcessScrollSection />
        {/* <ProcessSection /> */}
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
