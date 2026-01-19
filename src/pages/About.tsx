import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import PageHero from '@/components/shared/PageHero';
import { motion } from 'framer-motion';
import { Heart, Award, Users, Sparkles } from 'lucide-react';
import StatsCounter from '@/components/home/StatsCounter';
import { WorkProcessTimeline } from "@/components/about/work-process-timeline";
import ProcessScrollSection from '@/components/home/ProcessScrollSection';

const values = [
  {
    icon: Heart,
    title: 'Passion for Excellence',
    description: 'Every invitation is crafted with love and attention to detail, ensuring your special moments are truly unforgettable.',
  },
  {
    icon: Award,
    title: 'Creative Innovation',
    description: 'We blend traditional aesthetics with cutting-edge technology to create invitations that stand out.',
  },
  {
    icon: Users,
    title: 'Client-Centric Approach',
    description: 'Your vision is our priority. We work closely with you to bring your dream invitation to life.',
  },
  {
    icon: Sparkles,
    title: 'Quality Commitment',
    description: 'From design to delivery, we maintain the highest standards to ensure your complete satisfaction.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero 
          title="About Us" 
          subtitle="Where dreams meet innovation, and every occasion becomes a cherished memory"
          backgroundImage="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
        />
        
        {/* Story Section */}
        <section className="section-padding">
          <div className="container-custom max-w-4xl px-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">Our Story</h2>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="prose prose-lg mx-auto text-muted-foreground space-y-6"
            >
              <p className="text-lg md:text-xl leading-relaxed">
                Welcome to <span className="text-primary font-semibold">Outright's Luring Invite</span>, where dreams meet innovation, and every occasion becomes a cherished memory.
              </p>
              <p className="leading-relaxed text-base md:text-lg">
                Founded under the visionary leadership of our Director, <span className="text-foreground font-medium">Ms. Gurleen Kaur</span>, Outright's Luring Invite is more than just a digital invitation service — it's a reflection of passion, creativity, and a commitment to making your special moments truly unforgettable.
              </p>
              <p className="leading-relaxed text-base md:text-lg">
                Driven by Gurleen's personal dedication to infuse every event with warmth and personalized touch, Outright's Luring Invite embodies a mission to redefine the art of celebration. We believe that every invitation should tell a story, capture emotions, and set the perfect tone for your special day.
              </p>
              <p className="leading-relaxed text-base md:text-lg">
                From AI-powered video invitations to elegant digital designs, we combine cutting-edge technology with artistic excellence to deliver invitations that leave a lasting impression.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <StatsCounter />

        {/* Values */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom px-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary transition-colors"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-7 h-7 text-primary" />
                    </div>
                    <p className="font-semibold text-lg text-foreground mb-2">{value.title}</p>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
         <ProcessScrollSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
